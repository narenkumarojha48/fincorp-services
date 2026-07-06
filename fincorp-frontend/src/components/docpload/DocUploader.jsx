import { useEffect, useState } from "react";
import "./docUploader.css";
import { DOCUMENT_TYPES } from "./documetTypes";
import FilePreview from "./FilePriview";
import axios from "axios";
// File Format: PDF, JPEG, PNG, Max Size: 5MB, Max Count: 3 per document type
const DocUploader = () => {
  const [docFiles, setDocFiles] = useState({});
  const [progress, setProgress] = useState({});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    console.log("docFiles", docFiles);
  }, [docFiles]);
  const removeFile = (docName, index) => {
    setDocFiles((prev) => {
      const newState = {
        ...prev,
        [docName]: prev[docName].filter((_, i) => i !== index),
      };

      return newState;
    });
    setProgress((prev) => ({ ...prev, [docName]: 0 }));
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    const doctype = DOCUMENT_TYPES.find((doc) => doc.id === name);
    // 1. Get current files already in state for this category
    const existingFiles = docFiles[name] || [];
    // 2. Calculate total if we were to add these new files
    const totalPotentialFiles = existingFiles.length + files.length;
    // const docFilesLength = docFiles[name] ? docFiles[name].length : 0;
    console.log("e.target.files length", e.target.files);
    if (totalPotentialFiles > doctype.limit) {
      // setErrors(prev => ({...prev, [name]: `You can only upload ${doctype.limit} files for ${doctype.label}`}));

      alert(`You can only upload ${doctype.limit} files for ${doctype.label}`);
      e.target.value = "";
      return;
    }
    // const selectedFiles = Array.from(files).slice(0, doctype.limit);
    // 4. Update State (Appending new files to existing ones)
    const newSelection = Array.from(files);
    setDocFiles((prev) => ({
      ...prev,
      [name]: [...existingFiles, ...newSelection],
    }));
    e.target.value = "";
    setProgress((prev) => ({ ...prev, [name]: 0 }));
    // setDocFiles(prev => ({...prev, [name]: [...(prev[name] || []), ...selectedFiles]}));
  };
  function validateFiles(files) {
    const validationErrors = {};

    Object.keys(files).forEach((docName) => {
      if (!files[docName]) {
        validationErrors[files[docName]] = "PAN applicant information is required";          
      } else if (!files[docName]) {
        validationErrors[files[docName]] = "Aadhar applicant information is required";
          
      } else if (!files[docName]) {
        validationErrors[files[docName]] = "Photo applicant information is required";          
      }
      files[docName].forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          validationErrors[file.name] = "File size exceeds 5MB";
        } else if (
          !["application/pdf", "image/jpeg", "image/png"].includes(file.type)
        ) {
          validationErrors[file.name] = "Invalid file type";
        }
      });
    });
    setErrors(validationErrors);
    return {
      isValid: Object.keys(validationErrors).length === 0,
      validationErrors,
    };
  }
  async function handleUpload(e) {
    e.preventDefault();
    console.log("Uploading files:", docFiles);
    console.log("Object.keys(docFiles)", Object.keys(docFiles));
    const uploadPromises = Object.keys(docFiles).map((key) => {
      const formdata = new FormData();
      formdata.append("leadid", "LEAD123");
      // Replace with actual lead ID
      docFiles[key].forEach((file) => {
        formdata.append(key, file);
      });
      return axios.post("/api/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          setProgress((prev) => ({
            ...prev,
            [key]: Math.round((event.loaded * 100) / event.total),
          }));
          console.log(
            "Upload progress for",
            key,
            ":",
            Math.round((event.loaded * 100) / event.total),
            "%",
          );
        },
      });

      console.log("formdata[key]", formdata.getAll(key));
    });
    const results = await Promise.allSettled(uploadPromises);
    console.log("Upload results:", results);
    // validateFiles(docFiles);
  }
  return (
    <div className="">
      <form onSubmit={handleUpload}>
        <div className="upload-container">
          {DOCUMENT_TYPES.map((doc) => (
            <div key={doc.id} className="doc-card">
              <label for={doc.id} className="doc-label">
                {doc.label} count: {docFiles[doc.id]?.length || 0}/{doc.limit}
                {/* This is progress bar component part */}
                {progress[doc.id] !== undefined && (
                  <div style={{ marginTop: "5px" }}>
                    <div
                      style={{
                        height: "6px",
                        width: "50px",
                        background: "#ddd",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        style={{
                          width: `${progress[doc.id]}%`,
                          height: "100%",
                          background: "green",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <small>{progress[doc.id]}%</small>
                  </div>
                )}
              </label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id={doc.id}
                  onChange={handleChange}
                  name={doc.id}
                  multiple={doc.limit > 1}
                />
              </div>
              {/* this is file prieview part */}
              {docFiles[doc.id] &&
                docFiles[doc.id].map((file, index) => (
                  <FilePreview
                    file={file}
                    onRemove={() => removeFile(doc.id, index)}
                  />
                ))}
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">
          Upload
        </button>
      </form>
    </div>
  );
};

export default DocUploader;
