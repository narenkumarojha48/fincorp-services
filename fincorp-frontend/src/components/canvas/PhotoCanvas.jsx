import { useState, useRef, useEffect } from "react";
import useCanvas from "./useCanvas";

export const PhotoCanvas = ({ draw, ...rest }) => {
  const canvasRef = useCanvas(draw);

  return (
    <div className="photo_canvas-container">
      <canvas
        id="service-canvas"
        width="400"
        height="300"
        ref={canvasRef}
        {...rest}
      />
    </div>
  );
};
