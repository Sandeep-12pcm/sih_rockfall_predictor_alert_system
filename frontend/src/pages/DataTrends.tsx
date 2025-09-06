import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Thermometer,
  Droplets,
  Zap,
  Calendar,
  Download,
  Gauge,
  Move3D,
  Vibrate,
  RefreshCw,
} from "lucide-react";
import { useSensorReadings } from "../hooks/useSensorReadings";

const DataTrends = () => {
  // Thresholds for each sensor
  const getThreshold = (type: string) => {
    switch (type) {
      case "strain":
        return 150; // με
      case "displacement":
        return 20; // mm
      case "vibration":
        return 5; // m/s²
      case "temperature":
        return 60; // °C
      default:
        return 0;
    }
  };

  // Time range options
  const timeRanges = [
    { id: "24h", label: "Last 24h" },
    { id: "7d", label: "Last 7d" },
    { id: "30d", label: "Last 30d" },
  ];
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedMetric, setSelectedMetric] = useState("displacement");
  const { readings, loading, error } = useSensorReadings();

  if (error) {
    console.log("Sensor Reading error:", error);
  }

  // ✅ Group readings by type and prepare data
  const sensorData = useMemo(() => {
    if (!readings.length) return [];

    const grouped: Record<string, any[]> = {};
    readings.forEach((r) => {
      if (!grouped[r.type]) grouped[r.type] = [];
      grouped[r.type].push(r);
    });

    return Object.keys(grouped).map((type) => {
      const latest = grouped[type][grouped[type].length - 1];
      const prev =
        grouped[type].length > 1
          ? grouped[type][grouped[type].length - 2]
          : null;

      const iconMap: Record<string, any> = {
        displacement: Activity,
        strain: Zap,
        pore_pressure: Gauge,
        tilt: Move3D,
        vibration: Vibrate,
        temperature: Thermometer,
        moisture: Droplets,
      };

      return {
        id: type,
        name:
          type.charAt(0).toUpperCase() +
          type.slice(1).replace("_", " "),
        unit: latest.unit,
        current: latest.value,
        change: prev ? (latest.value - prev.value).toFixed(2) : "0",
        trend: prev ? (latest.value >= prev.value ? "up" : "down") : "up",
        status:
          latest.predicted_risk_class === 2
            ? "danger"
            : latest.predicted_risk_class === 1
              ? "warning"
              : "safe",
        values: grouped[type],
        threshold: getThreshold(type),
        icon: iconMap[type] || Activity,
      };
    });
  }, [readings]);

  const selectedSensor = sensorData.find((s) => s.id === selectedMetric);

  const chartData = useMemo(() => {
    if (!selectedSensor) return [];
    return selectedSensor.values.map((r: any) => ({
      time: new Date(r.timestamp),
      value: r.value,
      threshold: getThreshold(r.type),
    }));
  }, [selectedSensor]);

  // Chart scaling
  const chartWidth = 800;
  const chartHeight = 300;
  const padding = 40;
  const plotWidth = chartWidth - 2 * padding;
  const plotHeight = chartHeight - 2 * padding;

  // ✅ Use actual min/max from dataset
  const values = chartData.map((d) => d.value).concat(chartData.map((d) => d.threshold));

  const maxValue = values.length ? Math.max(...values) * 1.05 : 1;
  const minValue = values.length ? Math.min(...values) * 0.95 : 0;
  const valueRange = maxValue - minValue || 1;

  const getY = (value: number) =>
    chartHeight - padding - ((value - minValue) / valueRange) * plotHeight;

  const getX = (index: number) =>
    padding + (index / (chartData.length - 1 || 1)) * plotWidth;

  // ✅ Format values for Y-axis
  const formatValue = (val: number, unit?: string) => {
    if (Math.abs(val) >= 1_000_000)
      return (val / 1_000_000).toFixed(1) + "M" + (unit ? ` ${unit}` : "");
    if (Math.abs(val) >= 1_000)
      return (val / 1_000).toFixed(1) + "k" + (unit ? ` ${unit}` : "");
    if (Math.abs(val) < 1 && Math.abs(val) > 0)
      return val.toExponential(1) + (unit ? ` ${unit}` : "");
    return val.toFixed(1) + (unit ? ` ${unit}` : "");
  };

  // ✅ Format time for X-axis depending on range
  const formatTime = (date: Date) => {
    if (timeRange === "24h") return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (timeRange === "7d") return date.toLocaleDateString([], { month: "short", day: "numeric" });
    if (timeRange === "30d") return date.toLocaleDateString([], { month: "short", day: "numeric" });
    return date.toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Data Trends & Analytics</h1>
          <p className="text-muted-foreground">Historical sensor data and predictive insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card className="gradient-surface border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Time Range</span>
            </div>
          </div>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range.id}
                variant={timeRange === range.id ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range.id)}
                className={timeRange === range.id ? "gradient-primary text-white" : ""}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sensor Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensorData.map((sensor) => {
          const Icon = sensor.icon;
          return (
            <Card
              key={sensor.id}
              className={`gradient-surface border-border cursor-pointer transition-all hover:ring-2 hover:ring-primary/20 ${selectedMetric === sensor.id ? "ring-2 ring-primary" : ""
                }`}
              onClick={() => setSelectedMetric(sensor.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                  {sensor.trend === "up" ? (
                    <TrendingUp
                      className={`h-5 w-5 ${sensor.status === "danger"
                          ? "text-status-danger"
                          : sensor.status === "warning"
                            ? "text-status-warning"
                            : "text-status-safe"
                        }`}
                    />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-status-safe" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{sensor.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {sensor.current}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {sensor.unit}
                    </span>
                  </div>
                  <div
                    className={`text-sm ${sensor.trend === "up" && sensor.status !== "safe"
                        ? "text-status-danger"
                        : "text-status-safe"
                      }`}
                  >
                    {sensor.change} vs previous period
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="charts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">Time Series Charts</TabsTrigger>
          <TabsTrigger value="correlation">Correlation Analysis</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                {selectedSensor ? `${selectedSensor.name} Trend` : "No Data"}
              </CardTitle>
              <CardDescription>
                {selectedSensor
                  ? `Real-time sensor readings over the last ${timeRange}
                     (Current: ${selectedSensor.current} ${selectedSensor.unit},
                     Threshold: ${selectedSensor.threshold} ${selectedSensor.unit})`
                  : "No sensor data available"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <div className="h-80 relative">
                  <svg
                    className="w-full h-full"
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  >
                    {/* Grid lines */}
                    {Array.from({ length: 6 }, (_, i) => (
                      <line
                        key={`hline-${i}`}
                        x1={padding}
                        y1={padding + (i * plotHeight) / 5}
                        x2={chartWidth - padding}
                        y2={padding + (i * plotHeight) / 5}
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    ))}

                    {/* Y-axis labels */}
                    {Array.from({ length: 6 }, (_, i) => {
                      const value = maxValue - (i * valueRange) / 5;
                      return (
                        <text
                          key={`ylabel-${i}`}
                          x={padding - 10}
                          y={padding + (i * plotHeight) / 5 + 5}
                          textAnchor="end"
                          className="fill-current text-muted-foreground text-xs"
                        >
                          {formatValue(value, selectedSensor?.unit)}
                        </text>
                      );
                    })}

                    {/* Threshold line */}
                    <line
                      x1={padding}
                      y1={getY(selectedSensor.threshold)}
                      x2={chartWidth - padding}
                      y2={getY(selectedSensor.threshold)}
                      stroke="hsl(var(--destructive))"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />

                    {/* Data area fill */}
                    <path
                      d={`M ${getX(0)} ${getY(chartData[0].value)} ${chartData
                        .map((point, i) => `L ${getX(i)} ${getY(point.value)}`)
                        .join(" ")} L ${getX(chartData.length - 1)} ${chartHeight - padding
                        } L ${getX(0)} ${chartHeight - padding} Z`}
                      fill="hsl(var(--primary))"
                      fillOpacity="0.1"
                    />

                    {/* Data line */}
                    <polyline
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      points={chartData
                        .map((point, i) => `${getX(i)},${getY(point.value)}`)
                        .join(" ")}
                    />

                    {/* Data points */}
                    {chartData.map((point, i) => (
                      <circle
                        key={`point-${i}`}
                        cx={getX(i)}
                        cy={getY(point.value)}
                        r="4"
                        fill="hsl(var(--primary))"
                      >
                        <title>{`${formatTime(point.time)}: ${point.value} ${selectedSensor.unit
                          }`}</title>
                      </circle>
                    ))}

                    {/* X-axis labels (reduced crowding) */}
                    {chartData
                      .filter((_, i) => i % Math.ceil(chartData.length / 8) === 0)
                      .map((point, i) => (
                        <text
                          key={`xlabel-${i}`}
                          x={getX(i)}
                          y={chartHeight - padding + 15}
                          textAnchor="middle"
                          className="fill-current text-muted-foreground text-xs"
                        >
                          {formatTime(point.time)}
                        </text>
                      ))}
                  </svg>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  No data available to display chart
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Correlation & Predictions tabs remain unchanged */}
        {/* ... keep your existing correlation and predictions code here ... */}
        <TabsContent value="correlation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="gradient-surface border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Weather vs Displacement</CardTitle>
                <CardDescription>Correlation between rainfall and slope movement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto mb-3" />
                    <p>Correlation coefficient: 0.78</p>
                    <p className="text-sm mt-1">Strong positive correlation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-surface border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Strain vs Temperature</CardTitle>
                <CardDescription>Thermal effects on rock stress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Thermometer className="h-12 w-12 mx-auto mb-3" />
                    <p>Correlation coefficient: -0.45</p>
                    <p className="text-sm mt-1">Moderate negative correlation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="text-foreground">AI Risk Predictions</CardTitle>
              <CardDescription>Machine learning-based forecasts for the next 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-status-safe mb-2">Low Risk</div>
                  <div className="text-sm text-muted-foreground">Next 8 hours</div>
                  <div className="text-xs text-muted-foreground mt-1">Confidence: 94%</div>
                </div>

                <div className="text-center p-4 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-status-warning mb-2">Elevated</div>
                  <div className="text-sm text-muted-foreground">8-16 hours</div>
                  <div className="text-xs text-muted-foreground mt-1">Confidence: 78%</div>
                </div>

                <div className="text-center p-4 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-status-danger mb-2">High Risk</div>
                  <div className="text-sm text-muted-foreground">16-24 hours</div>
                  <div className="text-xs text-muted-foreground mt-1">Confidence: 65%</div>
                </div>
              </div>

              <div className="bg-background/50 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Key Factors Driving Predictions:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Recent increase in displacement rate (+40% over 6 hours)</li>
                  <li>• Heavy rainfall forecast (25mm expected in next 12 hours)</li>
                  <li>• Strain gauge readings approaching historical failure patterns</li>
                  <li>• Ground temperature dropping below seasonal average</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataTrends;
