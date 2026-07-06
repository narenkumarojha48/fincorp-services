# EasyOCR Text Extraction API

A FastAPI-based REST API that extracts text from images using [EasyOCR](https://github.com/JaidedAI/EasyOCR).

---

## Features

- **`POST /extract`** – Returns plain extracted text
- **`POST /extract/detailed`** – Returns text + bounding boxes + confidence scores
- **`GET /languages`** – Lists supported languages
- **`GET /health`** – Health check
- Supports JPEG, PNG, WebP, BMP, TIFF (up to 10 MB)
- Auto-generated Swagger UI at `/docs`

---

## Quick Start

### 1. Run locally

```bash
# Install dependencies
pip install -r requirements.txt

# Start the server
python main.py
# or
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

API available at `http://localhost:8000`  
Swagger docs at `http://localhost:8000/docs`

---

### 2. Run with Docker

```bash
# Build
docker build -t easyocr-api .

# Run
docker run -p 8000:8000 easyocr-api
```

---

## Usage Examples

### Extract plain text

```bash
curl -X POST http://localhost:8000/extract \
  -F "file=@your_image.jpg"
```

**Response:**
```json
{
  "filename": "your_image.jpg",
  "text": "Hello World\nThis is extracted text",
  "line_count": 2,
  "processing_time_seconds": 1.234
}
```

---

### Extract with bounding boxes & confidence

```bash
curl -X POST http://localhost:8000/extract/detailed \
  -F "file=@your_image.jpg"
```

**Response:**
```json
{
  "filename": "your_image.jpg",
  "full_text": "Hello World",
  "detections": [
    {
      "bbox": [[10, 5], [120, 5], [120, 30], [10, 30]],
      "text": "Hello World",
      "confidence": 0.9821
    }
  ],
  "total_detections": 1,
  "processing_time_seconds": 1.102
}
```

---

### Python client example

```python
import requests

url = "http://localhost:8000/extract"

with open("image.jpg", "rb") as f:
    response = requests.post(url, files={"file": f})

data = response.json()
print(data["text"])
```

---

## Adding More Languages

Open `main.py` and update the reader initialization:

```python
# Example: English + Hindi + French
reader = easyocr.Reader(['en', 'hi', 'fr'], gpu=False)
```

> See `GET /languages` for available language codes.  
> Enable GPU by setting `gpu=True` if CUDA is available.

---

## Project Structure

```
ocr_api/
├── main.py          # FastAPI application
├── requirements.txt # Python dependencies
├── Dockerfile       # Docker image definition
└── README.md        # This file
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 400  | Invalid or corrupt image |
| 413  | File exceeds 10 MB limit |
| 415  | Unsupported file type |
| 500  | Internal server error |
