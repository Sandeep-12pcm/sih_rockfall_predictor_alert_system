# app/routes/predict_live.py

from fastapi import APIRouter
import requests
import joblib
import os
import pandas as pd
from datetime import datetime, timedelta

router = APIRouter()

# 🔑 Weather API config
WEATHER_KEY = "d35e3848f8d44a83ac8211927250509"   # TODO: replace with actual key
CITY = "Ahmedabad"

# 📂 Load trained model + feature names
MODEL_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "models", "env_rockfall_model_final.pkl"
)
model = joblib.load(MODEL_PATH)

# Explicit feature order (must match training)
FEATURE_NAMES = [
    "temp_c",
    "humidity",
    "pressure_mb",
    "wind_kph",
    "precip_mm",
    "latitude",
    "longitude",
    "depth_km",
    "magnitude",
]

# 🌀 Fetch weather data
def get_weather():
    try:
        url = f"http://api.weatherapi.com/v1/current.json?key={WEATHER_KEY}&q={CITY}&aqi=no"
        r = requests.get(url, timeout=5).json()
        return {
            "temp_c": r["current"]["temp_c"],
            "humidity": r["current"]["humidity"],
            "pressure_mb": r["current"]["pressure_mb"],
            "wind_kph": r["current"]["wind_kph"],
            "precip_mm": r["current"].get("precip_mm", 0.0),
        }
    except Exception as e:
        print("Weather API error:", e)
        return None

# 🌍 Fetch latest quake (fallback if too old)
def get_quake():
    try:
        url = "https://earthquake.usgs.gov/fdsnws/event/1/query"
        params = {
            "format": "geojson",
            "orderby": "time",
            "limit": 1,
            "minmagnitude": 2.5,
        }
        r = requests.get(url, params=params, timeout=5).json()
        feat = r["features"][0]["properties"]
        geom = r["features"][0]["geometry"]

        # Check if quake is recent (last 24h)
        quake_time = datetime.utcfromtimestamp(feat["time"] / 1000)
        if datetime.utcnow() - quake_time > timedelta(hours=24):
            print("No recent quake in last 24h, fallback to None")
            return None

        return {
            "latitude": geom["coordinates"][1],
            "longitude": geom["coordinates"][0],
            "depth_km": geom["coordinates"][2],
            "magnitude": feat["mag"],
        }
    except Exception as e:
        print("USGS API error:", e)
        return None


@router.get("/predict_live")
def predict_live():
    weather = get_weather()
    quake = get_quake()

    if not weather:
        return {"error": "Weather data unavailable"}
    if not quake:
        return {"error": "No recent quake data available"}

    # Merge features
    row = {**weather, **quake}

    # Build DataFrame with correct column order
    df = pd.DataFrame([[row.get(f, 0) for f in FEATURE_NAMES]], columns=FEATURE_NAMES)

    # Predict
    try:
        pred = int(model.predict(df)[0])
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}

    return {
        "features": row,
        "predicted_risk_class": pred,
        "timestamp": datetime.utcnow().isoformat()
    }
