import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import cv from "@techstark/opencv-js";

const KYCScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null); // Hidden canvas for OpenCV
  const [capturedImage, setCapturedImage] = useState(null); // State for preview
  const [isReady, setIsReady] = useState(false);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("Loading AI...");
  const stabilityCounter = useRef(0);

  useEffect(() => {
    if (cv.onRuntimeInitialized) {
      // If already loaded, set state immediately
      setIsReady(true);
      setStatus("Align your RC inside the frame");
    } else {
      // Otherwise, wait for it
      cv.onRuntimeInitialized = () => {
        setIsReady(true);
        setStatus("Align your RC inside the frame");
      };
    }
    checkPermissions(); // Check permissions on component mount
    return () => {
      // 1. Get the stream from whichever source is available
      const stream =
        webcamRef.current?.video?.srcObject || webcamRef.current?.stream;

      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop(); // Shut down hardware
          track.enabled = false; // Disable logical track
        });
        console.log("Hardware tracks stopped.");
      }

      // 2. Clear the video element's source to free memory
      if (webcamRef.current?.video) {
        webcamRef.current.video.srcObject = null;
      }
    };
  }, []);
  // Add this useEffect to your component
  useEffect(() => {
    // If the image is cleared and the webcam is ready, restart the loop
    if (!capturedImage && isReady && webcamRef.current) {
      setTimeout(() => {
        requestAnimationFrame(processFrame);
      }, 1000);
    }
  }, [capturedImage, isReady]);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // 2. Capture GPS Location immediately
    if ("geolocation" in navigator) {
      setStatus("Fetching GPS...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toFixed(6),
            lng: position.coords.longitude.toFixed(6),
            time: new Date().toLocaleString(),
          });
          setCapturedImage(imageSrc);
          setStatus("Captured with Geo-tag");
        },
        (error) => {
          console.error("GPS Error:", error);
          // RBI rules usually require GPS; handle fallback or re-request here
          setStatus("GPS Required for KYC");
          alert("Please enable GPS to proceed with KYC.");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        },
      );
    }

    // setCapturedImage(imageSrc); // Store the Base64 string for preview
    // setStatus("Image Captured!");
  };

  const processFrame = () => {
    if (capturedImage || !isReady || !webcamRef.current) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;

    if (video && video.readyState === 4) {
      // 1. Draw video to hidden canvas
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        // 2. OpenCV read from canvas
        let src = cv.imread(canvas);
        let gray = new cv.Mat();
        let laplacian = new cv.Mat();

        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        cv.Laplacian(gray, laplacian, cv.CV_64F);

        let mean = new cv.Mat(),
          stdDev = new cv.Mat();
        cv.meanStdDev(laplacian, mean, stdDev);

        const score = stdDev.data64F[0] * stdDev.data64F[0];

        // 3. Auto-capture Logic
        if (score > 100) {
          stabilityCounter.current++;
          if (stabilityCounter.current >= 15) {
            capture();
            return; // Exit after capture to prevent multiple captures
          }
        } else {
          stabilityCounter.current = 0;
        }
        // console.log("Focus Score:", score, "Stability:", stabilityCounter.current);
        // Cleanup
        src.delete();
        gray.delete();
        laplacian.delete();
        mean.delete();
        stdDev.delete();
      } catch (err) {
        console.error(err);
      }
    }

    if (!capturedImage) requestAnimationFrame(processFrame);
  };

  const handleRetake = () => {
    stabilityCounter.current = 0; // Reset the stability counter
    setCapturedImage(null); // This triggers the useEffect above
    setStatus("Align RC Document");
  };
  const checkPermissions = async () => {
    const geoStatus = await navigator.permissions.query({
      name: "geolocation",
    });
    console.log("GPS Status:", geoStatus.state); // 'granted', 'denied', or 'prompt'

    geoStatus.onchange = () => {
      console.log("Permission changed to:", geoStatus.state);
    };
  };
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <h3>{status}</h3>

      {/* 1. WEBCAM VIEW (Hidden once captured) */}
      {!capturedImage ? (
        <div style={{ position: "relative" }}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            onUserMedia={() => requestAnimationFrame(processFrame)}
            videoConstraints={{ facingMode: "environment" }}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          {/* Visual Guide Overlay */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              right: "10%",
              bottom: "10%",
              border: "2px dashed #fff",
              borderRadius: "8px",
              pointerEvents: "none",
            }}
          ></div>
        </div>
      ) : (
        /* 2. PREVIEW VIEW (Shown after capture) */
        <div
          style={{
            border: "4px solid #4CAF50",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <h4>Preview of Captured RC</h4>
          {capturedImage && (
            <>
              <div style={{ position: "relative" }}>
                <img
                  src={capturedImage}
                  alt="Captured Document"
                  style={{ width: "100%", height: "100%", borderRadius: "4px" }}
                />
                {location && (
                  <div style={overlayStyle}>
                    <p style={{ margin: 0 }}>📍 Lat: {location.lat}</p>
                    <p style={{ margin: 0 }}>📍 Lng: {location.lng}</p>
                    <p style={{ margin: 0, fontSize: "10px" }}>
                      📅 {location.time}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          <div style={{ marginTop: "15px" }}>
            <button onClick={handleRetake} style={btnStyle}>
              Retake
            </button>
            <button
              onClick={() => alert("Uploading to server...")}
              style={{ ...btnStyle, backgroundColor: "#4CAF50" }}
            >
              Confirm & Upload
            </button>
          </div>
        </div>
      )}

      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} style={{ border: "2px solid blue" }} />
    </div>
  );
};

const btnStyle = {
  padding: "10px 20px",
  margin: "5px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "none",
};
const overlayStyle = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  background: "rgba(0,0,0,0.6)",
  color: "#fff",
  padding: "8px",
  fontSize: "12px",
  borderRadius: "4px",
  pointerEvents: "none",
};

export default KYCScanner;
