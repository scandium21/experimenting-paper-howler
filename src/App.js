import React, { useEffect } from "react";
import p, { Path, Tool, Point } from "paper";
import keyData from "./data";

function App() {
  useEffect(() => {
    // Get a reference to the canvas object
    var canvas = document.getElementById("myCanvas");
    // Create an empty project and a view for the canvas:
    p.setup(canvas);
    var tool = new Tool();
    var circles = [];

    tool.onKeyDown = function onKeyDown(event) {
      if (keyData[event.key]) {
        var mpt = new Point(p.view.size.width, p.view.size.height);
        var newCircle = new Path.Circle(mpt.multiply(Point.random()), 500);
        keyData[event.key].sound.play();
        newCircle.fillColor = keyData[event.key].color;
        circles.push(newCircle);
      }
    };

    p.view.onFrame = function onFrame(event) {
      for (var i = 0; i < circles.length; i++) {
        circles[i].fillColor.hue += 1;
        circles[i].scale(0.9);
        if (circles[i].area < 1) {
          circles[i].remove(); // remove the circle from the canvas
          circles.splice(i, 1); // remove the circle from the array
          console.log(circles);
        }
      }
    };
  }, []);
  return <canvas id="myCanvas" width="100%" height="100%" resize></canvas>;
}

export default App;
