import { useEffect, useState, useCallback } from "react";

/**
 * Types returned by FastAPI /predict_live route
 */
export type PredictLiveResponse = {
  features: {
    temp_c?: number;
    humidity?: number;
    pressure_mb?: number;
    wind_kph?: number;
    precip_mm?: number;
    latitude?: number;
    longitude?: number;
    depth_km?: number;
    magnitude?: number;
    [k: string]: any;
  };
  predicted_risk_class?: number | string;
  timestamp?: string; // ISO string
  error?: string;
};

export function useFetchPrediction(endpoint: string, defaultInterval = 5000) {
  const [data, setData] = useState<PredictLiveResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [intervalMs, setIntervalMs] = useState<number>(defaultInterval);

  const fetchPrediction = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint);
      const json: PredictLiveResponse = await res.json();
      if (!res.ok || json.error) {
        const msg = json?.error ?? `Server returned ${res.status}`;
        setError(String(msg));
        setData(null);
      } else {
        setData(json);
      }
    } catch (err: any) {
      setError(err?.message ?? "Network error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Initial fetch + interval refresh
  useEffect(() => {
    fetchPrediction();
    if (!autoRefresh) return;
    const id = setInterval(fetchPrediction, intervalMs);
    return () => clearInterval(id);
  }, [autoRefresh, intervalMs, fetchPrediction]);

  return {
    data,
    loading,
    error,
    fetchPrediction,
    autoRefresh,
    setAutoRefresh,
    intervalMs,
    setIntervalMs,
  };
}
