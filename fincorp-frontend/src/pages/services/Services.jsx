import DocumentUpload from "../../components/docpload/DocumentUpload";
import DocUploader from "../../components/docpload/DocUploader";
import PhotoCanvas from "../../components/canvas/PhotoCanvas";
import DocumentProcessor from "../../components/docpload/DocumentProcessor";
import KYCScanner from "../../components/canvas/KYCScanner";
import "./services.css";
import { useRef,useState,useEffect,useCallback } from "react";
useRef
const Services = () => {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   const img = new Image();
  //   img.src = "fincorpbrand.png"; // Replace with your path
  //   img.onload = () => {
  //     imgRef.current = img;
  //     console.log("Image successfully loaded");
  //     setLoaded(true); // This triggers a re-render so the canvas knows to start
  //   };
  //   img.onerror = (e) => {
  //     console.error("Failed to load image at:", img.src, e);
  //   };
    
  // }, []);
  // const img = new Image();
  // img.src = 'fincorpbrand.png';

  // function draw(canvas, ctx, counter) {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillStyle="grey"
  //   let delta = counter % 800
  //   ctx.fillRect(0+delta,0,10,100,100)
    
  //       // ctx.stroke();
    
  // }
//  const draw1 = useCallback((canvas, ctx, counter) => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     if (imgRef.current) {
//       // Draw the image to fill the canvas or at its natural size
//       ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
//     } else {
//       // Temporary placeholder so you know the canvas is working
//       ctx.fillStyle = "#ccc";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = "black";
//       ctx.fillText("Loading Image...", 20, 20);
//     }
//   }, []);
  return (
    <div className="service-container">
      {/* <PhotoCanvas draw={draw1}/> */}
      {/* <DocumentProcessor/> */}
      {/* <PhotoCanvas draw={draw}/> */}

      {/* <DocUploader /> */}
      <KYCScanner/>
      {/* <DocumentUpload/> */}
    </div>
  );
};

export default Services;
