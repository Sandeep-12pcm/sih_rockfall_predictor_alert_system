# synthetic_data_generation.py
import numpy as np
import pandas as pd

# ----------------------------
# Configuration
# ----------------------------
NUM_SAMPLES = 10000  # total rows
RANDOM_SEED = 42
np.random.seed(RANDOM_SEED)

# Features and baseline normal ranges
features = {
    "displacement": {"mean": 10, "std": 1},      # mm
    "strain": {"mean": 100, "std": 5},           # με
    "pore_pressure": {"mean": 200, "std": 10},   # kPa
    "tilt": {"mean": 2, "std": 0.2},             # degrees
    "vibration": {"mean": 1, "std": 0.1},        # mm/s
}

# Risk thresholds (heuristic, can tweak)
RISK_THRESHOLDS = {
    "displacement": [12, 15],   # medium, high
    "strain": [120, 140],
    "pore_pressure": [230, 260],
    "tilt": [3, 5],
    "vibration": [1.5, 2.5],
}

# ----------------------------
# Helper function to generate sensor reading
# ----------------------------
def generate_reading():
    row = {}
    anomaly_factor = np.random.rand()
    
    for f, params in features.items():
        value = np.random.normal(params["mean"], params["std"])
        
        # Introduce anomaly with probability
        if anomaly_factor > 0.95:  # 5% chance high anomaly
            value *= np.random.uniform(1.5, 2.0)
        elif anomaly_factor > 0.85:  # 10% chance medium anomaly
            value *= np.random.uniform(1.2, 1.5)
        row[f] = value
    return row

# ----------------------------
# Assign class based on thresholds
# ----------------------------
def assign_risk(row):
    risk_score = 0
    for f, thresholds in RISK_THRESHOLDS.items():
        if row[f] > thresholds[1]:
            risk_score += 2  # high contribution
        elif row[f] > thresholds[0]:
            risk_score += 1  # medium contribution
    # Map cumulative score to 3 classes
    if risk_score <= 2:
        return 0  # Low
    elif risk_score <= 5:
        return 1  # Medium
    else:
        return 2  # High

# ----------------------------
# Generate dataset
# ----------------------------
data = []
for _ in range(NUM_SAMPLES):
    reading = generate_reading()
    reading["risk_class"] = assign_risk(reading)
    data.append(reading)

df = pd.DataFrame(data)
df.to_csv("data/synthetic_rockfall_data.csv", index=False)
print("Synthetic dataset saved: synthetic_rockfall_data.csv")
print(df.head())
