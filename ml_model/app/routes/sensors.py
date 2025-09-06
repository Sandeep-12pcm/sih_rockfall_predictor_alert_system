import pandas as pd  # ✅ needed for DataFrame
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
READINGS: list[dict] = []  # 👈 store dicts including predictions

# Load Random Forest model
MODEL_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "models", "rockfall_rf_model.pkl"
)
rf_model = joblib.load(MODEL_PATH)

# Mapping: sensor_id → model feature name
FEATURE_MAP = {
    "D-01": "displacement",
    "S-01": "strain",
    "P-01": "pore_pressure",
    "T-01": "tilt",
    "V-01": "vibration",
}


@router.get("/sensors", response_model=list[Sensor])
def list_sensors():
    return SENSORS


@router.post("/ingest", response_model=dict)
def ingest_reading(reading: SensorReading):
    # Build latest values dict by sensor_id
    latest_values = {}
    for s in reversed(READINGS):  # iterate from latest stored
        if s["id"] not in latest_values:
            latest_values[s["id"]] = s["value"]
        if len(latest_values) == len(FEATURE_MAP):
            break  # got all required sensors

    # Add the current one
    latest_values[reading.id] = reading.value

    # ✅ Map sensor IDs -> model feature names
    model_input = {FEATURE_MAP[sid]: latest_values.get(sid, 0) for sid in FEATURE_MAP}

    # ✅ Build DataFrame with proper feature names
    X_input = pd.DataFrame([model_input])

    # Predict risk
    predicted_risk = int(rf_model.predict(X_input)[0])

    # Store reading + prediction together
    reading_with_pred = {
        **jsonable_encoder(reading),
        "predicted_risk_class": predicted_risk,
    }
    READINGS.append(reading_with_pred)

    return {
        "reading": reading_with_pred,
        "predicted_risk_class": predicted_risk,
    }


@router.get("/readings")
def get_readings():
    return READINGS
