from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import health, sensors, test  # ✅ only import sensors once

app = FastAPI(title="Rockfall ML API", version="0.1.0")
# ✅ Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:5173", "*"],  # allow React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Routers
app.include_router(health.router, tags=["health"])
# app.include_router(sensors.router, tags=["sensors"])  # ✅ sensors.py already has /sensors, /ingest, /readings
app.include_router(sensors.router, prefix="/sensors", tags=["sensors"])

app.include_router(test.router, tags=["test"])

# For local dev: `python -m app.main`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
