import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { MetricCard } from "@/components/ui/metric-card";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Thermometer,
  Droplets,
  Mountain,
  Users,
  MapPin
} from "lucide-react";

const Dashboard = () => {
  const riskAreas = [
    { name: "North Slope A", risk: "safe", probability: "2.1%" },
    { name: "East Wall B", risk: "caution", probability: "15.3%" },
    { name: "South Bench C", risk: "warning", probability: "34.7%" },
    { name: "West Quarry D", risk: "danger", probability: "67.2%" },
  ];

  const recentAlerts = [
    { time: "14:32", zone: "East Wall B", severity: "Medium", message: "Increased displacement detected" },
    { time: "13:45", zone: "South Bench C", severity: "High", message: "Strain gauge threshold exceeded" },
    { time: "12:18", zone: "North Slope A", severity: "Low", message: "Minor vibration anomaly" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mining Safety Dashboard</h1>
          <p className="text-muted-foreground">Real-time rockfall prediction and monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="safe" label="System Operational" />
          <div className="text-sm text-muted-foreground">Last updated: 2 min ago</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Sensors"
          value="47"
          unit="/52"
          change="+2 since yesterday"
          changeType="positive"
          icon={Activity}
        />
        <MetricCard
          title="Risk Zones"
          value="4"
          unit="areas"
          change="1 elevated today"
          changeType="negative"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Temperature"
          value="23.4"
          unit="°C"
          change="Normal range"
          changeType="neutral"
          icon={Thermometer}
        />
        <MetricCard
          title="Rainfall (24h)"
          value="12.3"
          unit="mm"
          change="Above average"
          changeType="negative"
          icon={Droplets}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Status Overview */}
        <Card className="gradient-surface border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Mountain className="h-5 w-5" />
              Risk Zone Status
            </CardTitle>
            <CardDescription>
              Current risk assessment for all monitored slopes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{area.name}</div>
                    <div className="text-sm text-muted-foreground">Risk Probability: {area.probability}</div>
                  </div>
                </div>
                <StatusIndicator 
                  status={area.risk as any} 
                  label={area.risk.charAt(0).toUpperCase() + area.risk.slice(1)}
                  showDot={true}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="gradient-surface border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              Latest notifications and system warnings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'High' ? 'bg-status-danger' :
                  alert.severity === 'Medium' ? 'bg-status-warning' : 
                  'bg-status-caution'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-foreground text-sm">{alert.zone}</div>
                    <div className="text-xs text-muted-foreground">{alert.time}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{alert.message}</div>
                  <div className={`text-xs mt-1 ${
                    alert.severity === 'High' ? 'text-status-danger' :
                    alert.severity === 'Medium' ? 'text-status-warning' :
                    'text-status-caution'
                  }`}>
                    {alert.severity} Priority
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="gradient-surface border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <Users className="h-8 w-8 mx-auto text-status-safe mb-2" />
              <div className="font-medium text-foreground">Personnel on Site</div>
              <div className="text-2xl font-bold text-status-safe">23</div>
              <div className="text-sm text-muted-foreground">All accounted for</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-background/50">
              <Activity className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="font-medium text-foreground">AI Model Accuracy</div>
              <div className="text-2xl font-bold text-primary">94.7%</div>
              <div className="text-sm text-muted-foreground">Last 30 days</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-background/50">
              <Shield className="h-8 w-8 mx-auto text-status-safe mb-2" />
              <div className="font-medium text-foreground">Days Since Incident</div>
              <div className="text-2xl font-bold text-status-safe">147</div>
              <div className="text-sm text-muted-foreground">Safety record</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;