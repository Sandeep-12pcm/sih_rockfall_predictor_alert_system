from fastapi import FastAPI
from app.routes import health, sensors, test  # ✅ only import sensors once

app = FastAPI(title="Rockfall ML API", version="0.1.0")

# Routers
app.include_router(health.router, tags=["health"])
# app.include_router(sensors.router, tags=["sensors"])  # ✅ sensors.py already has /sensors, /ingest, /readings
app.include_router(sensors.router, prefix="/sensors", tags=["sensors"])

app.include_router(test.router, tags=["test"])

# For local dev: `python -m app.main`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
