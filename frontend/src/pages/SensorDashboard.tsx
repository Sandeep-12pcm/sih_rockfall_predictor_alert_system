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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Rockfall Sensor Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {readings.map((sensor) => (
          <div
            key={`${sensor.id}-${sensor.timestamp}`}
            className="bg-white shadow-lg rounded-2xl p-4 border"
          >
            <h2 className="text-lg font-semibold">{sensor.type}</h2>
            <p>
              <span className="font-bold">ID:</span> {sensor.id}
            </p>
            <p>
              <span className="font-bold">Value:</span> {sensor.value}{" "}
              {sensor.unit}
            </p>
            <p>
              <span className="font-bold">Timestamp:</span>{" "}
              {new Date(sensor.timestamp).toLocaleTimeString()}
            </p>
            <p className="mt-2">
              <span className="font-bold">Predicted Risk:</span>{" "}
              <span
                className={
                    // sensor.predicted_risk_class === "high"
                    // ? "text-red-600 font-bold"
                    // : 
                    "text-green-600 font-bold"
                }
              >
                {sensor.predicted_risk_class !== undefined && sensor.predicted_risk_class !== null
  ? sensor.predicted_risk_class
  : "N/A"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorDashboard;
