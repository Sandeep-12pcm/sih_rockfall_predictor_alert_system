// src/hooks/useSensorReadings.ts
import { useEffect, useState } from "react";

export interface SensorReading {
  id: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  predicted_risk_class?: number;
}

export const useSensorReadings = () => {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/sensors/readings");
        const data = await res.json();
        setReadings(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching sensor data:", err);
        setError("Failed to fetch sensor data");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // initial load
    const interval = setInterval(fetchData, 2000); // repeat every 2s
    return () => clearInterval(interval);
  }, []);

  return { readings, loading, error };
};
