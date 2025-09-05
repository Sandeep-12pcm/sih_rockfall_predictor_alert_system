from fastapi import APIRouter
from app.schemas.sensor import Sensor, SensorReading
from datetime import datetime
import joblib
import os
from fastapi.encoders import jsonable_encoder

router = APIRouter()

# Sensors definition
SENSORS: list[Sensor] = [
    Sensor(id="D-01", type="displacement",  unit="mm",   location="Slope-A"),
    Sensor(id="S-01", type="strain",        unit="με",   location="Slope-A"),
    Sensor(id="P-01", type="pore_pressure", unit="kPa",  location="Slope-A"),
    Sensor(id="T-01", type="tilt",          unit="deg",  location="Slope-A"),
    Sensor(id="V-01", type="vibration",     unit="mm/s", location="Slope-A"),
]

# Store readings in memory (later: DB)
READINGS: list[SensorReading] = []

# Load Random Forest model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "models", "rockfall_rf_model.pkl")
rf_model = joblib.load(MODEL_PATH)

# Sensor order for model input
MODEL_FEATURE_ORDER = ["D-01", "S-01", "P-01", "T-01", "V-01"]

@router.get("/sensors", response_model=list[Sensor])
def list_sensors():
    return SENSORS

@router.post("/ingest", response_model=dict)
def ingest_reading(reading: SensorReading):
    # Append new reading
    READINGS.append(reading)

    # Build latest values dict by sensor_id
    latest_values = {}
    for s in reversed(READINGS):  # iterate from latest
        if s.id not in latest_values:
            latest_values[s.id] = s.value
        if len(latest_values) == len(MODEL_FEATURE_ORDER):
            break  # got all required sensors

    # Ensure all sensors are present (fill missing with 0)
    X_input = [[latest_values.get(sid, 0) for sid in MODEL_FEATURE_ORDER]]

    # Predict risk
    predicted_risk = int(rf_model.predict(X_input)[0])

    return {
        "reading": jsonable_encoder(reading),   # 👈 convert Pydantic model to JSON-safe dict
        "predicted_risk_class": predicted_risk
    }

@router.get("/readings", response_model=list[SensorReading])
def get_readings():
    return READINGS
