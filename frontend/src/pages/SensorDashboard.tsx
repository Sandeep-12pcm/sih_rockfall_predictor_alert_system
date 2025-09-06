import React, { useEffect, useState } from "react";

interface SensorReading {
  id: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  predicted_risk_class?: number;
}

const SensorDashboard: React.FC = () => {
  const [readings, setReadings] = useState<SensorReading[]>([]);

  // Fetch data every 2 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/sensors/readings");
        console.log("Fetching sensor data...");
        const data = await res.json();
        console.log("Fetched sensor data:", data[0]);
        setReadings(data);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
      }
    };

    fetchData(); // initial load
    const interval = setInterval(fetchData, 2000); // repeat every 2s
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk?: number) => {
    switch (risk) {
      case 0:
        return "text-status-critical font-bold"; // highest risk
      case 1:
        return "text-status-danger font-bold";
      case 2:
        return "text-status-warning font-bold";
      case 3:
        return "text-status-caution font-bold";
      case 4:
        return "text-status-safe font-bold"; // safe
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Rockfall Sensor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {readings.map((sensor) => (
          <div
            key={`${sensor.id}-${sensor.timestamp}`}
            className="bg-card text-card-foreground shadow-lg rounded-2xl p-6 border border-border hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold text-primary">
              {sensor.type}
            </h2>
            <div className="mt-3 space-y-1">
              <p>
                <span className="font-bold text-muted-foreground">ID:</span>{" "}
                {sensor.id}
              </p>
              <p>
                <span className="font-bold text-muted-foreground">Value:</span>{" "}
                {sensor.value} {sensor.unit}
              </p>
              <p>
                <span className="font-bold text-muted-foreground">Timestamp:</span>{" "}
                {new Date(sensor.timestamp).toLocaleTimeString()}
              </p>
              <p className="mt-3">
                <span className="font-bold text-muted-foreground">
                  Predicted Risk:
                </span>{" "}
                <span className={getRiskColor(sensor.predicted_risk_class)}>
                  {sensor.predicted_risk_class !== undefined &&
                  sensor.predicted_risk_class !== null
                    ? sensor.predicted_risk_class
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorDashboard;
