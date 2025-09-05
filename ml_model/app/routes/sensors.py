from fastapi import APIRouter
from app.schemas.sensor import Sensor

router = APIRouter()

# Temporary in-memory registry. Later we can move to DB or config file.
SENSORS: list[Sensor] = [
    Sensor(id="D-01", type="displacement",  unit="mm",   location="Slope-A"),
    Sensor(id="S-01", type="strain",        unit="με",   location="Slope-A"),
    Sensor(id="P-01", type="pore_pressure", unit="kPa",  location="Slope-A"),
    Sensor(id="T-01", type="tilt",          unit="deg",  location="Slope-A"),
    Sensor(id="V-01", type="vibration",     unit="mm/s", location="Slope-A"),
]

@router.get("/sensors", response_model=list[Sensor])
def list_sensors():
    return SENSORS
