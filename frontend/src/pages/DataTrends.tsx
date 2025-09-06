import { useState, useMemo } from "react";
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
    { id: "1h", label: "1 Hour", points: 12 },
    { id: "24h", label: "24 Hours", points: 24 },
    { id: "7d", label: "7 Days", points: 168 },
    { id: "30d", label: "30 Days", points: 720 },
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
      icon: Activity,
      baseValue: 3.2,
      variance: 0.5,
      threshold: 5.0,
      pattern: "increasing"
    },
    {
      id: "strain",
      name: "Strain Measurements",
      unit: "µε", 
      current: "420",
      change: "+45",
      trend: "up", 
      status: "danger",
      icon: Zap,
      baseValue: 420,
      variance: 50,
      threshold: 500,
      pattern: "volatile"
    },
    {
      id: "temperature",
      name: "Ground Temperature",
      unit: "°C",
      current: "15.8",
      change: "-1.2",
      trend: "down",
      status: "safe", 
      icon: Thermometer,
      baseValue: 15.8,
      variance: 2.0,
      threshold: 25.0,
      pattern: "seasonal"
    },
    {
      id: "moisture",
      name: "Soil Moisture",
      unit: "%",
      current: "34.5", 
      change: "+8.3",
      trend: "up",
      status: "caution",
      icon: Droplets,
      baseValue: 34.5,
      variance: 5.0,
      threshold: 60.0,
      pattern: "cyclical"
    }
  ];

  const generateRealisticData = (sensor, timeRange) => {
    const timeConfig = timeRanges.find(t => t.id === timeRange);
    const points = Math.min(timeConfig.points, 50); // Limit for performance
    const currentTime = new Date();
    
    return Array.from({ length: points }, (_, i) => {
      const timeAgo = points - 1 - i;
      let timeLabel;
      let timestamp = new Date(currentTime);
      
      // Calculate time labels based on range
      switch (timeRange) {
        case "1h":
          timestamp.setMinutes(timestamp.getMinutes() - timeAgo * 5);
          timeLabel = timestamp.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          });
          break;
        case "24h":
          timestamp.setHours(timestamp.getHours() - timeAgo);
          timeLabel = timestamp.toLocaleTimeString('en-US', { 
            hour: '2-digit',
            hour12: false 
          });
          break;
        case "7d":
          timestamp.setHours(timestamp.getHours() - timeAgo);
          timeLabel = timestamp.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
          break;
        case "30d":
          timestamp.setHours(timestamp.getHours() - timeAgo);
          timeLabel = timestamp.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
          break;
        default:
          timeLabel = i.toString();
      }
      
      // Generate realistic values based on sensor pattern
      let value = sensor.baseValue;
      const progress = i / points;
      
      switch (sensor.pattern) {
        case "increasing":
          // Gradual increase with some noise
          value = sensor.baseValue * (0.7 + 0.3 * progress) + 
                  (Math.random() - 0.5) * sensor.variance;
          break;
        case "volatile":
          // High volatility with spikes
          value = sensor.baseValue + 
                  Math.sin(i * 0.3) * sensor.variance * 0.8 +
                  (Math.random() - 0.5) * sensor.variance * 1.5;
          if (Math.random() < 0.1) value += sensor.variance * 2; // Random spikes
          break;
        case "seasonal":
          // Sinusoidal pattern with daily/seasonal variation
          value = sensor.baseValue + 
                  Math.sin(i * 0.2) * sensor.variance +
                  (Math.random() - 0.5) * sensor.variance * 0.3;
          break;
        case "cyclical":
          // Regular cycles with some randomness
          value = sensor.baseValue + 
                  Math.sin(i * 0.4) * sensor.variance * 0.7 +
                  Math.cos(i * 0.1) * sensor.variance * 0.3 +
                  (Math.random() - 0.5) * sensor.variance * 0.5;
          break;
        default:
          value = sensor.baseValue + (Math.random() - 0.5) * sensor.variance;
      }
      
      // Ensure non-negative values for most sensors
      if (sensor.id !== "temperature") {
        value = Math.max(0, value);
      }
      
      return {
        time: timeLabel,
        value: parseFloat(value.toFixed(2)),
        threshold: sensor.threshold,
        timestamp: timestamp.getTime()
      };
    });
  };

  const selectedSensor = sensorData.find(s => s.id === selectedMetric);
  const chartData = useMemo(() => 
    generateRealisticData(selectedSensor, timeRange), 
    [selectedMetric, timeRange, selectedSensor]
  );

  // Calculate chart dimensions and scaling
  const chartWidth = 800;
  const chartHeight = 300;
  const padding = 40;
  const plotWidth = chartWidth - 2 * padding;
  const plotHeight = chartHeight - 2 * padding;
  
  const maxValue = Math.max(...chartData.map(d => Math.max(d.value, d.threshold))) * 1.1;
  const minValue = Math.min(0, Math.min(...chartData.map(d => d.value)) * 0.9);
  const valueRange = maxValue - minValue;
  
  const getY = (value) => chartHeight - padding - ((value - minValue) / valueRange) * plotHeight;
  const getX = (index) => padding + (index / (chartData.length - 1)) * plotWidth;

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
                {selectedSensor?.name} Trend
              </CardTitle>
              <CardDescription>
                Real-time sensor readings over the last {timeRange} 
                (Current: {selectedSensor?.current} {selectedSensor?.unit}, 
                Threshold: {selectedSensor?.threshold} {selectedSensor?.unit})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-lg p-2">
                  <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                    {/* Grid lines */}
                    {Array.from({ length: 6 }, (_, i) => (
                      <line
                        key={`hline-${i}`}
                        x1={padding}
                        y1={padding + (i * plotHeight / 5)}
                        x2={chartWidth - padding}
                        y2={padding + (i * plotHeight / 5)}
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    ))}
                    
                    {/* Y-axis labels */}
                    {Array.from({ length: 6 }, (_, i) => {
                      const value = maxValue - (i * valueRange / 5);
                      return (
                        <text
                          key={`ylabel-${i}`}
                          x={padding - 10}
                          y={padding + (i * plotHeight / 5) + 5}
                          textAnchor="end"
                          className="fill-current text-muted-foreground text-xs"
                        >
                          {value.toFixed(1)}
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
                      d={`M ${getX(0)} ${getY(chartData[0].value)} ${chartData.map((point, i) => 
                        `L ${getX(i)} ${getY(point.value)}`
                      ).join(' ')} L ${getX(chartData.length - 1)} ${chartHeight - padding} L ${getX(0)} ${chartHeight - padding} Z`}
                      fill="hsl(var(--primary))"
                      fillOpacity="0.1"
                    />
                    
                    {/* Data line */}
                    <polyline
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      points={chartData.map((point, i) => `${getX(i)},${getY(point.value)}`).join(' ')}
                    />
                    
                    {/* Data points */}
                    {chartData.map((point, i) => (
                      <circle
                        key={`point-${i}`}
                        cx={getX(i)}
                        cy={getY(point.value)}
                        r="4"
                        fill="hsl(var(--primary))"
                        className="hover:r-6 transition-all"
                      >
                        <title>{`${point.time}: ${point.value} ${selectedSensor.unit}`}</title>
                      </circle>
                    ))}
                    
                    {/* X-axis labels (sample a few points to avoid crowding) */}
                    {chartData.filter((_, i) => i % Math.ceil(chartData.length / 6) === 0).map((point, i, arr) => (
                      <text
                        key={`xlabel-${i}`}
                        x={getX(chartData.indexOf(point))}
                        y={chartHeight - padding + 15}
                        textAnchor="middle"
                        className="fill-current text-muted-foreground text-xs"
                      >
                        {point.time}
                      </text>
                    ))}
                  </svg>
                  
                  {/* Chart labels */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                    Time ({timeRange})
                  </div>
                  <div className="absolute top-4 right-4 text-xs text-destructive">
                    ⚠️ Threshold: {selectedSensor.threshold} {selectedSensor.unit}
                  </div>
                  <div className="absolute top-4 left-4 text-xs text-muted-foreground">
                    {selectedSensor.unit}
                  </div>
                </div>
              </div>
              
              {/* Chart Statistics */}
              <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Current</div>
                  <div className="font-medium">{chartData[chartData.length - 1]?.value} {selectedSensor.unit}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Average</div>
                  <div className="font-medium">
                    {(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length).toFixed(2)} {selectedSensor.unit}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Maximum</div>
                  <div className="font-medium">{Math.max(...chartData.map(d => d.value)).toFixed(2)} {selectedSensor.unit}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Minimum</div>
                  <div className="font-medium">{Math.min(...chartData.map(d => d.value)).toFixed(2)} {selectedSensor.unit}</div>
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