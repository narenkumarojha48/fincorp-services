import React, { useEffect, useState } from "react";
import "./filePreview.css";

const FilePreview = ({ file, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPdf, setShowPdf] = useState(false); // Toggle state for PDF embed
  
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";

  useEffect(() => {
    let url;
    if (isImage || isPdf) {
      url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [file, isImage, isPdf]);

  return (
    <div className={`file-preview-container ${isPdf && showPdf ? "is-pdf-expanded" : ""}`}>
      <div className="preview-media-wrapper">
        {isImage && previewUrl ? (
          <img src={previewUrl} alt="Preview" className="preview-img" loading="lazy" />
        ) : isPdf ? (
          /* Conditional Rendering: Show Embed only if showPdf is true */
          showPdf && previewUrl ? (
            <embed
              src={`${previewUrl}#toolbar=0&navpanes=0`}
              type="application/pdf"
              className="preview-pdf-embed"
            />
          ) : (
            <div className="preview-pdf-placeholder">
              <span className="pdf-icon" title="PDF Document">📄</span>
              <p>PDF</p>
            </div>
          )
        ) : (
          <div className="file-icon">📁</div>
        )}
      </div>

      <div className="file-info-block">
        <p className="file-info-name" title={file.name}>{file.name}</p>
        <p className="file-info-size">
          {file.size > 1048576
            ? `${(file.size / 1048576).toFixed(2)} MB`
            : `${(file.size / 1024).toFixed(1)} KB`}
        </p>
      </div>

      <div className="action-buttons">
        {isPdf && (
          <button 
            type="button" 
            className="view-button" 
            onClick={() => setShowPdf(!showPdf)}
          >
            {showPdf ? "Hide" : "View"}
          </button>
        )}
        <button type="button" className="remove-file-button" onClick={onRemove}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default FilePreview;