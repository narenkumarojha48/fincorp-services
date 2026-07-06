import { useState, useRef, useEffect } from "react";

const useCanvas = (draw) => {
    const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas.current) return;
    const ctx = canvas.getContext("2d");
    let counter = 0;
    // drawImageOnCanvas(canvas, ctx);
     const renderer = () => {
      counter++;
      
      draw(canvas, ctx, counter);
      // animationFrameId = requestAnimationFrame(renderer);
    };
    
    // let animationFrameId;
    // let counter = 0;
   
    renderer();
    return () => {    
      // img.removeEventListener('load',renderer)  
      // cancelAnimationFrame(animationFrameId);
    }
  
  }, []);
  return canvasRef
}

export default useCanvas