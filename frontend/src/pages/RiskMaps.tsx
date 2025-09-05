import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { 
  MapPin, 
  Layers, 
  ZoomIn, 
  ZoomOut,
  RotateCcw,
  Satellite,
  Map as MapIcon,
  Camera,
  Activity
} from "lucide-react";

const RiskMaps = () => {
  const [activeLayer, setActiveLayer] = useState("risk");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const layers = [
    { id: "risk", name: "Risk Zones", icon: MapIcon, active: true },
    { id: "elevation", name: "Elevation (DEM)", icon: MapIcon, active: false },
    { id: "drone", name: "Drone Imagery", icon: Camera, active: false },
    { id: "sensors", name: "Sensor Data", icon: Activity, active: true },
  ];

  const riskZones = [
    {
      id: "north-a",
      name: "North Slope A", 
      risk: "safe", 
      probability: "2.1%",
      coordinates: "45.2°N, 112.7°W",
      sensors: 8,
      lastUpdate: "2 min ago"
    },
    {
      id: "east-b", 
      name: "East Wall B", 
      risk: "caution", 
      probability: "15.3%",
      coordinates: "45.1°N, 112.6°W", 
      sensors: 12,
      lastUpdate: "1 min ago"
    },
    {
      id: "south-c",
      name: "South Bench C", 
      risk: "warning", 
      probability: "34.7%",
      coordinates: "45.0°N, 112.8°W",
      sensors: 15,
      lastUpdate: "30 sec ago"
    },
    {
      id: "west-d",
      name: "West Quarry D", 
      risk: "danger", 
      probability: "67.2%",
      coordinates: "45.3°N, 112.9°W",
      sensors: 10,
      lastUpdate: "45 sec ago"
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Interactive Risk Maps</h1>
          <p className="text-muted-foreground">Geospatial visualization of mine slope stability</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Satellite className="h-4 w-4 mr-2" />
            Switch to Satellite
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <Card className="gradient-surface border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Layers className="h-5 w-5" />
              Map Layers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                  activeLayer === layer.id 
                    ? "bg-primary/20 border border-primary" 
                    : "bg-background/50 hover:bg-background/70"
                }`}
                onClick={() => setActiveLayer(layer.id)}
              >
                <div className="flex items-center gap-2">
                  <layer.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{layer.name}</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  layer.active ? "bg-status-safe" : "bg-muted"
                }`} />
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <div className="text-sm font-medium text-foreground mb-3">Map Controls</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card className="gradient-surface border-border h-[600px]">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-green-900 via-yellow-900 to-red-900" />
                </div>
                
                {/* Risk Zone Markers */}
                <div className="absolute inset-0 p-4">
                  {riskZones.map((zone, index) => (
                    <div
                      key={zone.id}
                      className={`absolute cursor-pointer transform transition-all hover:scale-110 ${
                        index === 0 ? "top-20 left-16" :
                        index === 1 ? "top-32 right-20" :
                        index === 2 ? "bottom-32 left-24" :
                        "bottom-20 right-16"
                      }`}
                      onClick={() => setSelectedZone(zone.id)}
                    >
                      <div className={`relative p-2 rounded-full shadow-lg ${
                        zone.risk === "safe" ? "bg-status-safe" :
                        zone.risk === "caution" ? "bg-status-caution" :
                        zone.risk === "warning" ? "bg-status-warning" :
                        "bg-status-danger"
                      }`}>
                        <MapPin className="h-4 w-4 text-white" />
                        {selectedZone === zone.id && (
                          <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full animate-ping ${
                            zone.risk === "safe" ? "bg-status-safe" :
                            zone.risk === "caution" ? "bg-status-caution" :
                            zone.risk === "warning" ? "bg-status-warning" :
                            "bg-status-danger"
                          } opacity-30`} />
                        )}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-center">
                        <div className="bg-card text-card-foreground px-2 py-1 rounded shadow-lg whitespace-nowrap">
                          {zone.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <div className="text-xs font-medium text-foreground mb-2">Risk Levels</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-safe" />
                      <span className="text-xs text-muted-foreground">Safe (0-10%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-caution" />
                      <span className="text-xs text-muted-foreground">Caution (10-25%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-warning" />
                      <span className="text-xs text-muted-foreground">Warning (25-50%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-danger" />
                      <span className="text-xs text-muted-foreground">Danger (&gt;50%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone Details */}
        <Card className="gradient-surface border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Zone Details</CardTitle>
            <CardDescription>
              {selectedZone ? "Selected zone information" : "Click a zone on the map"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedZone ? (
              <div className="space-y-4">
                {(() => {
                  const zone = riskZones.find(z => z.id === selectedZone);
                  if (!zone) return null;
                  
                  return (
                    <>
                      <div>
                        <h3 className="font-medium text-foreground">{zone.name}</h3>
                        <p className="text-sm text-muted-foreground">{zone.coordinates}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <StatusIndicator 
                          status={zone.risk as any} 
                          label={`${zone.probability} Risk`}
                        />
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Active Sensors:</span>
                          <span className="text-foreground font-medium">{zone.sensors}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Update:</span>
                          <span className="text-foreground font-medium">{zone.lastUpdate}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border">
                        <Button className="w-full" variant="outline">
                          View Detailed Analysis
                        </Button>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Select a zone marker on the map to view detailed information
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskMaps;