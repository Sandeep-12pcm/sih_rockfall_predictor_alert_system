import { useState } from "react";
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
  RefreshCw
} from "lucide-react";

const DataTrends = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedMetric, setSelectedMetric] = useState("displacement");

  const timeRanges = [
    { id: "1h", label: "1 Hour" },
    { id: "24h", label: "24 Hours" },
    { id: "7d", label: "7 Days" },
    { id: "30d", label: "30 Days" },
  ];

  const sensorData = [
    {
      id: "displacement",
      name: "Slope Displacement", 
      unit: "mm",
      current: "3.2",
      change: "+0.8",
      trend: "up",
      status: "warning",
      icon: Activity
    },
    {
      id: "strain",
      name: "Strain Measurements",
      unit: "µε", 
      current: "420",
      change: "+45",
      trend: "up", 
      status: "danger",
      icon: Zap
    },
    {
      id: "temperature",
      name: "Ground Temperature",
      unit: "°C",
      current: "15.8",
      change: "-1.2",
      trend: "down",
      status: "safe", 
      icon: Thermometer
    },
    {
      id: "moisture",
      name: "Soil Moisture",
      unit: "%",
      current: "34.5", 
      change: "+8.3",
      trend: "up",
      status: "caution",
      icon: Droplets
    }
  ];

  const generateChartData = (hours: number) => {
    return Array.from({ length: hours }, (_, i) => ({
      time: `${(23 - i).toString().padStart(2, '0')}:00`,
      value: Math.random() * 100 + 50 + Math.sin(i * 0.1) * 20,
      threshold: 80
    })).reverse();
  };

  const chartData = generateChartData(24);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Data Trends & Analytics</h1>
          <p className="text-muted-foreground">Historical sensor data and predictive insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
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
              className={`gradient-surface border-border cursor-pointer transition-all hover:ring-2 hover:ring-primary/20 ${
                selectedMetric === sensor.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedMetric(sensor.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                  {sensor.trend === "up" ? (
                    <TrendingUp className={`h-5 w-5 ${
                      sensor.status === "danger" ? "text-status-danger" :
                      sensor.status === "warning" ? "text-status-warning" :
                      "text-status-safe"
                    }`} />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-status-safe" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{sensor.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{sensor.current}</span>
                    <span className="text-sm text-muted-foreground">{sensor.unit}</span>
                  </div>
                  <div className={`text-sm ${
                    sensor.trend === "up" && sensor.status !== "safe" ? "text-status-danger" : "text-status-safe"
                  }`}>
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
          {/* Main Chart */}
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                {sensorData.find(s => s.id === selectedMetric)?.name} Trend
              </CardTitle>
              <CardDescription>
                Real-time sensor readings over the last {timeRange}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 relative">
                {/* Simulated Chart */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-lg p-4">
                  <svg className="w-full h-full" viewBox="0 0 800 300">
                    {/* Grid lines */}
                    {Array.from({ length: 6 }, (_, i) => (
                      <line
                        key={`hline-${i}`}
                        x1="0"
                        y1={i * 50 + 25}
                        x2="800"
                        y2={i * 50 + 25}
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    ))}
                    
                    {/* Threshold line */}
                    <line
                      x1="0"
                      y1="150"
                      x2="800"
                      y2="150"
                      stroke="hsl(var(--status-warning))"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    
                    {/* Data line */}
                    <polyline
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      points={chartData.map((point, i) => `${i * 33.33},${250 - point.value * 2}`).join(' ')}
                    />
                    
                    {/* Data points */}
                    {chartData.map((point, i) => (
                      <circle
                        key={`point-${i}`}
                        cx={i * 33.33}
                        cy={250 - point.value * 2}
                        r="4"
                        fill="hsl(var(--primary))"
                        className="hover:r-6 transition-all"
                      />
                    ))}
                  </svg>
                  
                  {/* Chart labels */}
                  <div className="absolute bottom-2 left-4 text-xs text-muted-foreground">
                    Time ({timeRange})
                  </div>
                  <div className="absolute top-4 right-4 text-xs text-status-warning">
                    ⚠️ Threshold Line
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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