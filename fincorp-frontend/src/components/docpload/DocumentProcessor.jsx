import React, { useRef } from 'react';

const DocumentProcessor = ({ onProcessed }) => {
  const canvasRef = useRef(null);

  const processImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 1. Set Dimensions (Maintaining Aspect Ratio)
        const scale = 1200 / img.width;
        canvas.width = 1200;
        canvas.height = img.height * scale;

        // 2. Draw Original Image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 3. Pixel Manipulation (Grayscale)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i+1] = data[i+2] = avg; // Set R, G, and B to the average
        }

        ctx.putImageData(imageData, 0, 0);

        // 4. Convert to Blob for your Multer-based API
        canvas.toBlob((blob) => {
          onProcessed(blob);
        }, 'image/jpeg', 0.85);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={processImage} accept="image/*" />
      <canvas ref={canvasRef}  />
    </div>
  );
};

export default DocumentProcessor;