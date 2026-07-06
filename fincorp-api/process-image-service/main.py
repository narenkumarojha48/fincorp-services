from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import easyocr
import numpy as np
from PIL import Image
import io
import time
import uvicorn

app = FastAPI(
    title="EasyOCR Text Extraction API",
    description="Extract text from images using EasyOCR",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize reader (loads model once at startup)
# Supports English by default; add more language codes as needed
reader = easyocr.Reader(['en'], gpu=False)

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/bmp", "image/tiff"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


@app.get("/")
def root():
    return {
        "message": "EasyOCR Text Extraction API",
        "version": "1.0.0",
        "endpoints": {
            "POST /extract": "Extract text from an uploaded image",
            "POST /extract/detailed": "Extract text with bounding boxes and confidence scores",
            "GET /languages": "List supported languages",
            "GET /health": "Health check"
        }
    }


@app.get("/health")
def health():
    return {"status": "ok", "model": "easyocr", "gpu": False}


@app.get("/languages")
def languages():
    return {
        "supported_languages": [
            {"code": "en", "name": "English"},
            {"code": "ch_sim", "name": "Chinese (Simplified)"},
            {"code": "fr", "name": "French"},
            {"code": "de", "name": "German"},
            {"code": "hi", "name": "Hindi"},
            {"code": "ja", "name": "Japanese"},
            {"code": "ko", "name": "Korean"},
            {"code": "es", "name": "Spanish"},
            {"code": "ar", "name": "Arabic"},
            {"code": "ru", "name": "Russian"},
        ],
        "note": "Restart the server with desired language codes to add support. Default: ['en']"
    }


def load_image(file_bytes: bytes) -> np.ndarray:
    """Convert uploaded bytes to a numpy array for EasyOCR."""
    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    return np.array(image)


@app.post("/extract")
async def extract_text(file: UploadFile = File(...)):
    """
    Extract plain text from an uploaded image.

    Returns a single string with all detected text joined by newlines.
    """
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{file.content_type}'. Allowed: {sorted(ALLOWED_TYPES)}"
        )

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 10 MB.")

    try:
        img_array = load_image(contents)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not open image: {e}")

    start = time.perf_counter()
    results = reader.readtext(img_array, detail=0)  # detail=0 → plain text list
    elapsed = round(time.perf_counter() - start, 3)

    return JSONResponse({
        "filename": file.filename,
        "text": "\n".join(results),
        "line_count": len(results),
        "processing_time_seconds": elapsed
    })


@app.post("/extract/detailed")
async def extract_text_detailed(file: UploadFile = File(...)):
    """
    Extract text with bounding boxes and confidence scores.

    Each result contains:
    - `bbox`: [[x1,y1],[x2,y2],[x3,y3],[x4,y4]] (top-left clockwise)
    - `text`: detected string
    - `confidence`: float 0–1
    """
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{file.content_type}'. Allowed: {sorted(ALLOWED_TYPES)}"
        )

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 10 MB.")

    try:
        img_array = load_image(contents)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not open image: {e}")

    start = time.perf_counter()
    results = reader.readtext(img_array, detail=1)  # detail=1 → (bbox, text, conf)
    elapsed = round(time.perf_counter() - start, 3)

    detections = [
        {
            "bbox": [[int(p[0]), int(p[1])] for p in bbox],
            "text": text,
            "confidence": round(float(conf), 4)
        }
        for bbox, text, conf in results
    ]

    full_text = " ".join(d["text"] for d in detections)

    return JSONResponse({
        "filename": file.filename,
        "full_text": full_text,
        "detections": detections,
        "total_detections": len(detections),
        "processing_time_seconds": elapsed
    })


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
