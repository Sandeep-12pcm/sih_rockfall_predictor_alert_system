from pydantic import BaseModel

class Sensor(BaseModel):
    id: str
    type: str             # "displacement" | "strain" | "pore_pressure" | "tilt" | "vibration"
    unit: str
    location: str         # e.g., "Slope-A", "Bench-3"
