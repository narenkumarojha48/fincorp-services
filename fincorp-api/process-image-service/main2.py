from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
# import easyocr
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



# Initialize reader (loads model once at startup)
# Supports English by default; add more language codes as needed
# reader = easyocr.Reader(['en'], gpu=False)

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/bmp", "image/tiff"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

if __name__ == "__main__":
    uvicorn.run("main2:app", host="0.0.0.0", port=8000, reload=True)
