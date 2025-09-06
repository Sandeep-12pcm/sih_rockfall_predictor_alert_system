// src/components/PredictLiveDashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { RefreshCw, Play, Pause, MapPin, CloudRain, Thermometer, Wind, AlertTriangle } from "lucide-react";

/**
 * Types returned by your FastAPI /predict_live route
 */
type PredictLiveResponse = {
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
  timestamp?: string; // ISO
  error?: string;
};

const RISK_MAP: Record<number | string, { label: string; status: string }> = {
  0: { label: "Safe", status: "safe" },
  1: { label: "Caution", status: "caution" },
  2: { label: "Warning", status: "warning" },
  3: { label: "Danger", status: "danger" },
  4: { label: "Critical", status: "critical" },
};

const endpoint = "http://127.0.0.1:8000/live/predict_live";

export default function PredictLiveDashboard() {
  const [data, setData] = useState<PredictLiveResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [intervalMs, setIntervalMs] = useState<number>(5000);

  const fetchPrediction = async () => {
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
  };

  // initial + interval
  useEffect(() => {
    fetchPrediction();
    if (!autoRefresh) return;
    const id = setInterval(fetchPrediction, intervalMs);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh, intervalMs]);

  // derived values for easy display
  const predicted = data?.predicted_risk_class;
  const riskInfo = predicted !== undefined && predicted !== null && RISK_MAP[predicted as any]
    ? RISK_MAP[predicted as any]
    : { label: String(predicted ?? "N/A"), status: "unknown" };

  const featuresList = useMemo(() => {
    if (!data?.features) return [];
    // only show the main ordered features (keeps UI stable)
    const order = [
      "temp_c",
      "humidity",
      "pressure_mb",
      "wind_kph",
      "precip_mm",
      "latitude",
      "longitude",
      "depth_km",
      "magnitude",
    ];
    return order.map((k) => ({ key: k, value: data.features[k] ?? "N/A" }));
  }, [data]);

  return (
    <div className="p-6 space-y-6 bg-background min-h-[60vh] text-foreground">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Live Prediction</h2>
          <p className="text-sm text-muted-foreground">Merged weather + quake features → model prediction</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { fetchPrediction(); }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card text-card-foreground hover:shadow"
            title="Refresh now"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>

          <button
            onClick={() => setAutoRefresh(a => !a)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card text-card-foreground hover:shadow"
            title={autoRefresh ? "Pause auto-refresh" : "Start auto-refresh"}
          >
            {autoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm">{autoRefresh ? "Auto" : "Manual"}</span>
          </button>
        </div>
      </div>

      {/* Top metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Predicted Risk"
          value={riskInfo.label}
          unit={predicted !== undefined && predicted !== null ? `#${predicted}` : ""}
          changeType={predicted === 0 ? "positive" : "negative"}
          change=""
          icon={AlertTriangle}
        />

        <MetricCard
          title="Temperature"
          value={String(data?.features?.temp_c ?? "N/A")}
          unit="°C"
          change="Live"
          changeType="neutral"
          icon={Thermometer}
        />

        <MetricCard
          title="Wind"
          value={String(data?.features?.wind_kph ?? "N/A")}
          unit="kph"
          change="Live"
          changeType="neutral"
          icon={Wind}
        />

        <MetricCard
          title="Precipitation"
          value={String(data?.features?.precip_mm ?? "N/A")}
          unit="mm"
          change="Live"
          changeType="neutral"
          icon={CloudRain}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: features */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Features (input to model)
            </CardTitle>
            <CardDescription>
              Weather + latest quake features used for prediction
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {loading && <div className="text-sm text-muted-foreground">Loading latest prediction…</div>}
            {error && <div className="text-sm text-destructive">Error: {error}</div>}
            {!data && !loading && !error && <div className="text-sm text-muted-foreground">No data yet</div>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {featuresList.map((f) => (
                <div key={f.key} className="p-3 rounded-lg border border-border bg-card text-card-foreground">
                  <div className="text-xs text-muted-foreground mb-1">{f.key}</div>
                  <div className="text-lg font-semibold">{String(f.value)}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-muted-foreground">
              Raw timestamp: <span className="font-medium">{data?.timestamp ?? "—"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Right: prediction + map/status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Prediction
            </CardTitle>
            <CardDescription>
              Model output and quick actions
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <div className="text-sm text-muted-foreground">Predicted class</div>
              <div className="flex items-center gap-3">
                <StatusIndicator status={riskInfo.status as any} label={riskInfo.label} showDot={true} />
                <div className="text-2xl font-bold">{riskInfo.label}</div>
              </div>

              <div className="w-full grid grid-cols-1 gap-2 mt-2">
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="p-3 rounded-lg border border-border bg-card text-card-foreground">
                  <div className="text-sm">
                    Lat: <span className="font-medium">{data?.features?.latitude ?? "N/A"}</span>
                  </div>
                  <div className="text-sm">
                    Lon: <span className="font-medium">{data?.features?.longitude ?? "N/A"}</span>
                  </div>
                  <div className="text-sm">
                    Depth (km): <span className="font-medium">{data?.features?.depth_km ?? "N/A"}</span>
                  </div>
                  <div className="text-sm">
                    Mag: <span className="font-medium">{data?.features?.magnitude ?? "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between gap-2 mt-2">
                <div className="text-xs text-muted-foreground">Last fetched:</div>
                <div className="text-xs text-muted-foreground">{data?.timestamp ? new Date(data.timestamp).toLocaleString() : "—"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            id="autorefresh"
            type="checkbox"
            className="accent-primary"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
          <label htmlFor="autorefresh">Auto-refresh</label>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <label className="text-xs">Interval (ms):</label>
          <input
            type="number"
            min={1000}
            step={500}
            value={intervalMs}
            onChange={(e) => setIntervalMs(Number(e.target.value))}
            className="w-24 px-2 py-1 rounded border border-border bg-card text-card-foreground"
          />
        </div>
      </div>
    </div>
  );
}
