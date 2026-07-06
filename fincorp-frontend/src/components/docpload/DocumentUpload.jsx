import React, { useState } from "react";
import axios from "axios";

export default function DocumentUpload() {
  const [docfiles, setFiles] = useState({});
  const [prevfiles, setPrevFiles] = useState("");
  const [progress, setProgress] = useState({});

  const handleFileChange = (e) => {
    const {name,files} = e.target
    const currentFiles = Array.from(files)
    const existingFiles = {...docfiles}
    setFiles(prev=>({...prev,[name]:[...currentFiles]}))
    // setPrevFiles(URL.createObjectURL(file))

    console.log(name,file)
  };
  console.log("docfiles",docfiles)

  const handleUpload = async () => {
    const formData = new FormData();
  };

  return (
    <>
      <div className="upload-container">
        <label>Documents</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          name="docs"
          multiple
        />
        <img src={prevfiles} width={50} height={50}/>
        <label>Adhar</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          name="adhar"
          multiple
        />
        <label>Pan card</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          name="pan"
          multiple
        />
        <button onClick={handleUpload}>Upload</button>
        {progress > 0 && <p>Uploading: {progress}%</p>}
      </div>
    </>
  );
}
