import time, random, requests
from datetime import datetime, timezone

API_URL = "http://127.0.0.1:8000/sensors/ingest"

# Example sensors
SENSORS = [
    {"id": "D-01", "type": "displacement", "unit": "mm"},
    {"id": "S-01", "type": "strain", "unit": "με"},
    {"id": "P-01", "type": "pore_pressure", "unit": "kPa"},
    {"id": "T-01", "type": "tilt", "unit": "deg"},
    {"id": "V-01", "type": "vibration", "unit": "mm/s"},
]

def generate_value(sensor_type: str) -> float:
    """Simple baseline + noise (can add anomalies later)."""
    base = {
        "displacement": 10,
        "strain": 100,
        "pore_pressure": 200,
        "tilt": 2,
        "vibration": 1,
    }
    return base[sensor_type] + random.uniform(-1, 1)

while True:
    for s in SENSORS:
        reading = {
            "id": s["id"],
            "type": s["type"],
            "value": generate_value(s["type"]),
            "unit": s["unit"],
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        try:
            # r = requests.post(API_URL, json=reading)
            # print(f"Sent: {reading} -> {r.status_code}")
            r = requests.post(API_URL, json=reading)
            if r.status_code == 200:
                
                data = r.json()
                print(f"Sent: {reading} -> Predicted risk: {data['predicted_risk_class']}")
            else:
                print(f"Error sending data: {r.status_code}")
            
        except Exception as e:
            print("Error:", e)
    time.sleep(2)  # send every 2s
