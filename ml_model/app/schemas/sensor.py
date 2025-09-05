from pydantic import BaseModel
from datetime import datetime

class Sensor(BaseModel):
    id: str
    type: str             # displacement | strain | pore_pressure | tilt | vibration
    unit: str
    location: str

class SensorReading(BaseModel):
    id: str
    type: str
    value: float
    unit: str
    timestamp: datetime
