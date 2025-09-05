// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { StatusIndicator } from "@/components/ui/status-indicator";
// import { 
//   AlertTriangle, 
//   CheckCircle, 
//   Clock, 
//   MapPin, 
//   Bell,
//   Filter,
//   Archive,
//   Mail,
//   MessageSquare
// } from "lucide-react";

// const Alerts = () => {
//   const [filter, setFilter] = useState("all");

//   const alerts = [
//     {
//       id: 1,
//       timestamp: "2024-01-15 14:32:15",
//       zone: "East Wall B",
//       severity: "High",
//       type: "Strain Threshold",
//       message: "Strain gauge readings exceeded critical threshold of 500 microstrains",
//       status: "active",
//       coordinates: "45.1°N, 112.6°W",
//       sensorId: "SG-EW-B-04",
//       recommendedAction: "Evacuate immediate area and halt operations within 100m radius",
//       acknowledged: false
//     },
//     {
//       id: 2,
//       timestamp: "2024-01-15 13:45:22",
//       zone: "South Bench C", 
//       severity: "Critical",
//       type: "Displacement Alert",
//       message: "Rapid displacement detected: 15mm movement in 2 hours",
//       status: "active",
//       coordinates: "45.0°N, 112.8°W", 
//       sensorId: "DM-SB-C-07",
//       recommendedAction: "IMMEDIATE EVACUATION - All personnel clear the area immediately",
//       acknowledged: false
//     },
//     {
//       id: 3,
//       timestamp: "2024-01-15 12:18:43",
//       zone: "North Slope A",
//       severity: "Medium",
//       type: "Vibration Anomaly", 
//       message: "Unusual vibration patterns detected during blasting operations",
//       status: "acknowledged",
//       coordinates: "45.2°N, 112.7°W",
//       sensorId: "VM-NS-A-02",
//       recommendedAction: "Monitor closely and review blasting procedures",
//       acknowledged: true
//     },
//     {
//       id: 4,
//       timestamp: "2024-01-15 11:30:12",
//       zone: "West Quarry D",
//       severity: "Low", 
//       type: "Weather Warning",
//       message: "Heavy rainfall forecast may affect slope stability",
//       status: "resolved",
//       coordinates: "45.3°N, 112.9°W",
//       sensorId: "WS-WQ-D-01",
//       recommendedAction: "Increase monitoring frequency during rainfall",
//       acknowledged: true
//     },
//     {
//       id: 5,
//       timestamp: "2024-01-15 10:15:33",
//       zone: "East Wall B",
//       severity: "Medium",
//       type: "Pore Pressure",
//       message: "Groundwater pressure increase detected in monitoring wells",
//       status: "investigating", 
//       coordinates: "45.1°N, 112.6°W",
//       sensorId: "PP-EW-B-05",
//       recommendedAction: "Investigate drainage systems and monitor trend",
//       acknowledged: true
//     }
//   ];

//   const filteredAlerts = filter === "all" ? alerts : alerts.filter(alert => {
//     if (filter === "active") return alert.status === "active";
//     if (filter === "acknowledged") return alert.acknowledged;
//     if (filter === "unacknowledged") return !alert.acknowledged;
//     return true;
//   });

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "Critical": return "status-critical";
//       case "High": return "status-danger";
//       case "Medium": return "status-warning";
//       case "Low": return "status-caution";
//       default: return "status-safe";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "active": return AlertTriangle;
//       case "acknowledged": return CheckCircle;
//       case "resolved": return CheckCircle;
//       case "investigating": return Clock;
//       default: return AlertTriangle;
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Alert Management</h1>
//           <p className="text-muted-foreground">Monitor and manage safety alerts and notifications</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm">
//             <Mail className="h-4 w-4 mr-2" />
//             Email Settings
//           </Button>
//           <Button variant="outline" size="sm">
//             <MessageSquare className="h-4 w-4 mr-2" />
//             SMS Config
//           </Button>
//         </div>
//       </div>

//       {/* Alert Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Active Alerts</p>
//                 <p className="text-2xl font-bold text-status-danger">2</p>
//               </div>
//               <AlertTriangle className="h-8 w-8 text-status-danger" />
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Acknowledged</p>
//                 <p className="text-2xl font-bold text-status-caution">3</p>
//               </div>
//               <CheckCircle className="h-8 w-8 text-status-caution" />
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Critical (24h)</p>
//                 <p className="text-2xl font-bold text-status-critical">1</p>
//               </div>
//               <Bell className="h-8 w-8 text-status-critical" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Resolved (7d)</p>
//                 <p className="text-2xl font-bold text-status-safe">23</p>
//               </div>
//               <Archive className="h-8 w-8 text-status-safe" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="gradient-surface border-border">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-foreground">
//             <Filter className="h-5 w-5" />
//             Filter Alerts
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-wrap gap-2">
//             {["all", "active", "acknowledged", "unacknowledged"].map((filterType) => (
//               <Button
//                 key={filterType}
//                 variant={filter === filterType ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setFilter(filterType)}
//                 className={filter === filterType ? "gradient-primary text-white" : ""}
//               >
//                 {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
//               </Button>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Alert List */}
//       <div className="space-y-4">
//         {filteredAlerts.map((alert) => {
//           const StatusIcon = getStatusIcon(alert.status);
          
//           return (
//             <Card key={alert.id} className={`gradient-surface border-border ${
//               !alert.acknowledged && alert.status === "active" ? "ring-2 ring-status-danger/20" : ""
//             }`}>
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-start gap-3">
//                     <StatusIcon className={`h-5 w-5 mt-1 ${
//                       alert.status === "active" ? "text-status-danger" :
//                       alert.status === "resolved" ? "text-status-safe" :
//                       "text-status-caution"
//                     }`} />
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <h3 className="font-medium text-foreground">{alert.type}</h3>
//                         <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>
//                           {alert.severity}
//                         </Badge>
//                         {!alert.acknowledged && alert.status === "active" && (
//                           <Badge variant="destructive" className="text-xs">
//                             Unacknowledged
//                           </Badge>
//                         )}
//                       </div>
//                       <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
//                       <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-3 w-3" />
//                           <span>{alert.zone}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           <span>{alert.timestamp}</span>
//                         </div>
//                         <div>
//                           <span>Sensor: {alert.sensorId}</span>
//                         </div>
//                       </div>
//                       <div className="bg-background/50 p-3 rounded-lg">
//                         <p className="text-sm font-medium text-foreground mb-1">Recommended Action:</p>
//                         <p className="text-sm text-muted-foreground">{alert.recommendedAction}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between pt-4 border-t border-border">
//                   <StatusIndicator 
//                     status={alert.status === "active" ? "danger" : alert.status === "resolved" ? "safe" : "caution"} 
//                     label={alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
//                   />
                  
//                   <div className="flex items-center gap-2">
//                     {!alert.acknowledged && (
//                       <Button size="sm" variant="outline">
//                         Acknowledge
//                       </Button>
//                     )}
//                     <Button size="sm" variant="outline">
//                       View Details
//                     </Button>
//                     {alert.status === "active" && (
//                       <Button size="sm" className="gradient-primary text-white">
//                         Take Action
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Alerts;

// Second change , acknowledge functionility


// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { StatusIndicator } from "@/components/ui/status-indicator";
// import { 
//   AlertTriangle, 
//   CheckCircle, 
//   Clock, 
//   MapPin, 
//   Bell,
//   Filter,
//   Archive,
//   Mail,
//   MessageSquare
// } from "lucide-react";

// const Alerts = () => {
//   const [filter, setFilter] = useState("all");
  
//   const [alerts, setAlerts] = useState([
//     {
//       id: 1,
//       timestamp: "2024-01-15 14:32:15",
//       zone: "East Wall B",
//       severity: "High",
//       type: "Strain Threshold",
//       message: "Strain gauge readings exceeded critical threshold of 500 microstrains",
//       status: "active",
//       coordinates: "45.1°N, 112.6°W",
//       sensorId: "SG-EW-B-04",
//       recommendedAction: "Evacuate immediate area and halt operations within 100m radius",
//       acknowledged: false
//     },
//     {
//       id: 2,
//       timestamp: "2024-01-15 13:45:22",
//       zone: "South Bench C", 
//       severity: "Critical",
//       type: "Displacement Alert",
//       message: "Rapid displacement detected: 15mm movement in 2 hours",
//       status: "active",
//       coordinates: "45.0°N, 112.8°W", 
//       sensorId: "DM-SB-C-07",
//       recommendedAction: "IMMEDIATE EVACUATION - All personnel clear the area immediately",
//       acknowledged: false
//     },
//     {
//       id: 3,
//       timestamp: "2024-01-15 12:18:43",
//       zone: "North Slope A",
//       severity: "Medium",
//       type: "Vibration Anomaly", 
//       message: "Unusual vibration patterns detected during blasting operations",
//       status: "acknowledged",
//       coordinates: "45.2°N, 112.7°W",
//       sensorId: "VM-NS-A-02",
//       recommendedAction: "Monitor closely and review blasting procedures",
//       acknowledged: true
//     },
//     {
//       id: 4,
//       timestamp: "2024-01-15 11:30:12",
//       zone: "West Quarry D",
//       severity: "Low", 
//       type: "Weather Warning",
//       message: "Heavy rainfall forecast may affect slope stability",
//       status: "resolved",
//       coordinates: "45.3°N, 112.9°W",
//       sensorId: "WS-WQ-D-01",
//       recommendedAction: "Increase monitoring frequency during rainfall",
//       acknowledged: true
//     },
//     {
//       id: 5,
//       timestamp: "2024-01-15 10:15:33",
//       zone: "East Wall B",
//       severity: "Medium",
//       type: "Pore Pressure",
//       message: "Groundwater pressure increase detected in monitoring wells",
//       status: "investigating", 
//       coordinates: "45.1°N, 112.6°W",
//       sensorId: "PP-EW-B-05",
//       recommendedAction: "Investigate drainage systems and monitor trend",
//       acknowledged: true
//     }
//   ]);

//   const handleAcknowledge = (alertId: number) => {
//     setAlerts(prevAlerts => 
//       prevAlerts.map(alert => 
//         alert.id === alertId 
//           ? { ...alert, acknowledged: true, status: "acknowledged" }
//           : alert
//       )
//     );
//   };

//   const filteredAlerts = filter === "all" ? alerts : alerts.filter(alert => {
//     if (filter === "active") return alert.status === "active";
//     if (filter === "acknowledged") return alert.acknowledged;
//     if (filter === "unacknowledged") return !alert.acknowledged;
//     return true;
//   });

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "Critical": return "status-critical";
//       case "High": return "status-danger";
//       case "Medium": return "status-warning";
//       case "Low": return "status-caution";
//       default: return "status-safe";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "active": return AlertTriangle;
//       case "acknowledged": return CheckCircle;
//       case "resolved": return CheckCircle;
//       case "investigating": return Clock;
//       default: return AlertTriangle;
//     }
//   };

//   // Calculate dynamic counts
//   const activeCount = alerts.filter(alert => alert.status === "active").length;
//   const acknowledgedCount = alerts.filter(alert => alert.acknowledged).length;
//   const criticalCount = alerts.filter(alert => alert.severity === "Critical" && alert.status === "active").length;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Alert Management</h1>
//           <p className="text-muted-foreground">Monitor and manage safety alerts and notifications</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm">
//             <Mail className="h-4 w-4 mr-2" />
//             Email Settings
//           </Button>
//           <Button variant="outline" size="sm">
//             <MessageSquare className="h-4 w-4 mr-2" />
//             SMS Config
//           </Button>
//         </div>
//       </div>

//       {/* Alert Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Active Alerts</p>
//                 <p className="text-2xl font-bold text-status-danger">{activeCount}</p>
//               </div>
//               <AlertTriangle className="h-8 w-8 text-status-danger" />
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Acknowledged</p>
//                 <p className="text-2xl font-bold text-status-caution">{acknowledgedCount}</p>
//               </div>
//               <CheckCircle className="h-8 w-8 text-status-caution" />
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Critical (24h)</p>
//                 <p className="text-2xl font-bold text-status-critical">{criticalCount}</p>
//               </div>
//               <Bell className="h-8 w-8 text-status-critical" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Resolved (7d)</p>
//                 <p className="text-2xl font-bold text-status-safe">23</p>
//               </div>
//               <Archive className="h-8 w-8 text-status-safe" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="gradient-surface border-border">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-foreground">
//             <Filter className="h-5 w-5" />
//             Filter Alerts
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-wrap gap-2">
//             {["all", "active", "acknowledged", "unacknowledged"].map((filterType) => (
//               <Button
//                 key={filterType}
//                 variant={filter === filterType ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setFilter(filterType)}
//                 className={filter === filterType ? "gradient-primary text-white" : ""}
//               >
//                 {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
//               </Button>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Alert List */}
//       <div className="space-y-4">
//         {filteredAlerts.map((alert) => {
//           const StatusIcon = getStatusIcon(alert.status);
          
//           return (
//             <Card key={alert.id} className={`gradient-surface border-border ${
//               !alert.acknowledged && alert.status === "active" ? "ring-2 ring-status-danger/20" : ""
//             }`}>
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-start gap-3">
//                     <StatusIcon className={`h-5 w-5 mt-1 ${
//                       alert.status === "active" ? "text-status-danger" :
//                       alert.status === "resolved" ? "text-status-safe" :
//                       "text-status-caution"
//                     }`} />
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <h3 className="font-medium text-foreground">{alert.type}</h3>
//                         <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>
//                           {alert.severity}
//                         </Badge>
//                         {!alert.acknowledged && alert.status === "active" && (
//                           <Badge variant="destructive" className="text-xs">
//                             Unacknowledged
//                           </Badge>
//                         )}
//                       </div>
//                       <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
//                       <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-3 w-3" />
//                           <span>{alert.zone}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           <span>{alert.timestamp}</span>
//                         </div>
//                         <div>
//                           <span>Sensor: {alert.sensorId}</span>
//                         </div>
//                       </div>
//                       <div className="bg-background/50 p-3 rounded-lg">
//                         <p className="text-sm font-medium text-foreground mb-1">Recommended Action:</p>
//                         <p className="text-sm text-muted-foreground">{alert.recommendedAction}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between pt-4 border-t border-border">
//                   <StatusIndicator 
//                     status={alert.status === "active" ? "danger" : alert.status === "resolved" ? "safe" : "caution"} 
//                     label={alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
//                   />
                  
//                   <div className="flex items-center gap-2">
//                     {!alert.acknowledged && (
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleAcknowledge(alert.id)}
//                       >
//                         Acknowledge
//                       </Button>
//                     )}
//                     <Button size="sm" variant="outline">
//                       View Details
//                     </Button>
//                     {alert.status === "active" && (
//                       <Button size="sm" className="gradient-primary text-white">
//                         Take Action
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Alerts;



// third change 

// import { useState } from "react";
// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle 
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { StatusIndicator } from "@/components/ui/status-indicator";
// import { 
//   AlertTriangle, 
//   CheckCircle, 
//   Clock, 
//   MapPin, 
//   Bell,
//   Filter,
//   Archive,
//   Mail,
//   MessageSquare,
//   Calendar,
//   Activity,
//   Target
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";

// const Alerts = () => {
//   const [filter, setFilter] = useState("all");
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false);
//   const [selectedAlert, setSelectedAlert] = useState<any>(null);

//   const [alerts, setAlerts] = useState([
//     {
//       id: 1,
//       timestamp: "2024-01-15 14:32:15",
//       zone: "East Wall B",
//       severity: "High",
//       type: "Strain Threshold",
//       message: "Strain gauge readings exceeded critical threshold of 500 microstrains",
//       status: "active",
//       coordinates: "45.1°N, 112.6°W",
//       sensorId: "SG-EW-B-04",
//       recommendedAction: "Evacuate immediate area and halt operations within 100m radius",
//       acknowledged: false
//     },
//     {
//       id: 2,
//       timestamp: "2024-01-15 13:45:22",
//       zone: "South Bench C", 
//       severity: "Critical",
//       type: "Displacement Alert",
//       message: "Rapid displacement detected: 15mm movement in 2 hours",
//       status: "active",
//       coordinates: "45.0°N, 112.8°W", 
//       sensorId: "DM-SB-C-07",
//       recommendedAction: "IMMEDIATE EVACUATION - All personnel clear the area immediately",
//       acknowledged: false
//     },
//     {
//       id: 3,
//       timestamp: "2024-01-15 12:18:43",
//       zone: "North Slope A",
//       severity: "Medium",
//       type: "Vibration Anomaly", 
//       message: "Unusual vibration patterns detected during blasting operations",
//       status: "acknowledged",
//       coordinates: "45.2°N, 112.7°W",
//       sensorId: "VM-NS-A-02",
//       recommendedAction: "Monitor closely and review blasting procedures",
//       acknowledged: true
//     },
//     {
//       id: 4,
//       timestamp: "2024-01-15 11:30:12",
//       zone: "West Quarry D",
//       severity: "Low", 
//       type: "Weather Warning",
//       message: "Heavy rainfall forecast may affect slope stability",
//       status: "resolved",
//       coordinates: "45.3°N, 112.9°W",
//       sensorId: "WS-WQ-D-01",
//       recommendedAction: "Increase monitoring frequency during rainfall",
//       acknowledged: true
//     },
//     {
//       id: 5,
//       timestamp: "2024-01-15 10:15:33",
//       zone: "East Wall B",
//       severity: "Medium",
//       type: "Pore Pressure",
//       message: "Groundwater pressure increase detected in monitoring wells",
//       status: "investigating", 
//       coordinates: "45.1°N, 112.6°W",
//       sensorId: "PP-EW-B-05",
//       recommendedAction: "Investigate drainage systems and monitor trend",
//       acknowledged: true
//     }
//   ]);

//   const handleAcknowledge = (alertId: number) => {
//     setAlerts(prevAlerts => 
//       prevAlerts.map(alert => 
//         alert.id === alertId 
//           ? { ...alert, acknowledged: true, status: "acknowledged" }
//           : alert
//       )
//     );
//   };

//   const handleTakeAction = (alertId: number) => {
//     setAlerts(prevAlerts =>
//       prevAlerts.map(alert =>
//         alert.id === alertId
//           ? { ...alert, status: "resolved", acknowledged: true }
//           : alert
//       )
//     );
//   };

//   const filteredAlerts = filter === "all" ? alerts : alerts.filter(alert => {
//     if (filter === "active") return alert.status === "active";
//     if (filter === "acknowledged") return alert.acknowledged;
//     if (filter === "unacknowledged") return !alert.acknowledged;
//     return true;
//   });

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "Critical": return "status-critical";
//       case "High": return "status-danger";
//       case "Medium": return "status-warning";
//       case "Low": return "status-caution";
//       default: return "status-safe";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "active": return AlertTriangle;
//       case "acknowledged": return CheckCircle;
//       case "resolved": return CheckCircle;
//       case "investigating": return Clock;
//       default: return AlertTriangle;
//     }
//   };

//   // Dynamic counts
//   const activeCount = alerts.filter(alert => alert.status === "active").length;
//   const acknowledgedCount = alerts.filter(alert => alert.acknowledged).length;
//   const criticalCount = alerts.filter(alert => alert.severity === "Critical" && alert.status === "active").length;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Alert Management</h1>
//           <p className="text-muted-foreground">Monitor and manage safety alerts and notifications</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm">
//             <Mail className="h-4 w-4 mr-2" />
//             Email Settings
//           </Button>
//           <Button variant="outline" size="sm">
//             <MessageSquare className="h-4 w-4 mr-2" />
//             SMS Config
//           </Button>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Active Alerts</p>
//                 <p className="text-2xl font-bold text-status-danger">{activeCount}</p>
//               </div>
//               <AlertTriangle className="h-8 w-8 text-status-danger" />
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Acknowledged</p>
//                 <p className="text-2xl font-bold text-status-caution">{acknowledgedCount}</p>
//               </div>
//               <CheckCircle className="h-8 w-8 text-status-caution" />
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Critical (24h)</p>
//                 <p className="text-2xl font-bold text-status-critical">{criticalCount}</p>
//               </div>
//               <Bell className="h-8 w-8 text-status-critical" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Resolved (7d)</p>
//                 <p className="text-2xl font-bold text-status-safe">23</p>
//               </div>
//               <Archive className="h-8 w-8 text-status-safe" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="gradient-surface border-border">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-foreground">
//             <Filter className="h-5 w-5" />
//             Filter Alerts
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-wrap gap-2">
//             {["all", "active", "acknowledged", "unacknowledged"].map((filterType) => (
//               <Button
//                 key={filterType}
//                 variant={filter === filterType ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setFilter(filterType)}
//                 className={filter === filterType ? "gradient-primary text-white" : ""}
//               >
//                 {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
//               </Button>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Alert List */}
//       <div className="space-y-4">
//         {filteredAlerts.map((alert) => {
//           const StatusIcon = getStatusIcon(alert.status);
          
//           return (
//             <Card key={alert.id} className={`gradient-surface border-border ${
//               !alert.acknowledged && alert.status === "active" ? "ring-2 ring-status-danger/20" : ""
//             }`}>
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-start gap-3">
//                     <StatusIcon className={`h-5 w-5 mt-1 ${
//                       alert.status === "active" ? "text-status-danger" :
//                       alert.status === "resolved" ? "text-status-safe" :
//                       "text-status-caution"
//                     }`} />
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <h3 className="font-medium text-foreground">{alert.type}</h3>
//                         <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>
//                           {alert.severity}
//                         </Badge>
//                         {!alert.acknowledged && alert.status === "active" && (
//                           <Badge variant="destructive" className="text-xs">
//                             Unacknowledged
//                           </Badge>
//                         )}
//                       </div>
//                       <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
//                       <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-3 w-3" />
//                           <span>{alert.zone}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           <span>{alert.timestamp}</span>
//                         </div>
//                         <div>
//                           <span>Sensor: {alert.sensorId}</span>
//                         </div>
//                       </div>
//                       <div className="bg-background/50 p-3 rounded-lg">
//                         <p className="text-sm font-medium text-foreground mb-1">Recommended Action:</p>
//                         <p className="text-sm text-muted-foreground">{alert.recommendedAction}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between pt-4 border-t border-border">
//                   <StatusIndicator 
//                     status={alert.status === "active" ? "danger" : alert.status === "resolved" ? "safe" : "caution"} 
//                     label={alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
//                   />
                  
//                   <div className="flex items-center gap-2">
//                     {!alert.acknowledged && (
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleAcknowledge(alert.id)}
//                       >
//                         Acknowledge
//                       </Button>
//                     )}
//                     <Button 
//                       size="sm" 
//                       variant="outline"
//                       onClick={() => {
//                         setSelectedAlert(alert);
//                         setIsDetailsOpen(true);
//                       }}
//                     >
//                       View Details
//                     </Button>
//                     {alert.status === "active" && (
//                       <Button 
//                         size="sm" 
//                         className="gradient-primary text-white"
//                         onClick={() => handleTakeAction(alert.id)}
//                       >
//                         Take Action
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Alert Details Modal */}
//       <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5" />
//               Alert Details - {selectedAlert?.type}
//             </DialogTitle>
//             <DialogDescription>
//               Comprehensive information about this safety alert
//             </DialogDescription>
//           </DialogHeader>
          
//           {selectedAlert && (
//             <div className="space-y-6">
//               {/* Alert Header */}
//               <div className="flex items-start justify-between p-4 bg-background/50 rounded-lg">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Badge className={`${getSeverityColor(selectedAlert.severity)} text-xs`}>
//                       {selectedAlert.severity}
//                     </Badge>
//                     <Badge variant={selectedAlert.status === "active" ? "destructive" : "secondary"} className="text-xs">
//                       {selectedAlert.status.charAt(0).toUpperCase() + selectedAlert.status.slice(1)}
//                     </Badge>
//                     {selectedAlert.acknowledged && (
//                       <Badge variant="outline" className="text-xs">
//                         Acknowledged
//                       </Badge>
//                     )}
//                   </div>
//                   <h3 className="font-semibold text-lg">{selectedAlert.type}</h3>
//                   <p className="text-muted-foreground mt-1">{selectedAlert.message}</p>
//                 </div>
//               </div>

//               {/* Info Grid */}
//               <div className="grid grid-cols-2 gap-4">
//                 <Card className="gradient-surface border-border">
//                   <CardContent className="p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Calendar className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Timestamp</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{selectedAlert.timestamp}</p>
//                   </CardContent>
//                 </Card>

//                 <Card className="gradient-surface border-border">
//                   <CardContent className="p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <MapPin className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Location</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{selectedAlert.zone}</p>
//                     <p className="text-xs text-muted-foreground/70">{selectedAlert.coordinates}</p>
//                   </CardContent>
//                 </Card>

//                 <Card className="gradient-surface border-border">
//                   <CardContent className="p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Activity className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Sensor ID</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{selectedAlert.sensorId}</p>
//                   </CardContent>
//                 </Card>

//                 <Card className="gradient-surface border-border">
//                   <CardContent className="p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Target className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Alert ID</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">#{selectedAlert.id.toString().padStart(6, '0')}</p>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Recommended Action */}
//               <Card className="gradient-surface border-border">
//                 <CardHeader>
//                   <CardTitle className="text-base">Recommended Action</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground">{selectedAlert.recommendedAction}</p>
//                 </CardContent>
//               </Card>

//               {/* Action Buttons */}
//               <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
//                 {!selectedAlert.acknowledged && selectedAlert.status === "active" && (
//                   <Button 
//                     variant="outline" 
//                     onClick={() => {
//                       handleAcknowledge(selectedAlert.id);
//                       setIsDetailsOpen(false);
//                     }}
//                   >
//                     Acknowledge
//                   </Button>
//                 )}
//                 {selectedAlert.status === "active" && (
//                   <Button 
//                     className="gradient-primary text-white"
//                     onClick={() => {
//                       handleTakeAction(selectedAlert.id);
//                       setIsDetailsOpen(false);
//                     }}
//                   >
//                     Take Action & Resolve
//                   </Button>
//                 )}
//                 <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
//                   Close
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Alerts;


// fourth change
// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { StatusIndicator } from "@/components/ui/status-indicator";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { 
//   AlertTriangle, 
//   CheckCircle, 
//   Clock, 
//   MapPin, 
//   Bell,
//   Filter,
//   Archive,
//   Mail,
//   MessageSquare,
//   Calendar,
//   Activity,
//   Target
// } from "lucide-react";

// const Alerts = () => {
//   const [filter, setFilter] = useState("all");
//   const [selectedAlert, setSelectedAlert] = useState<any>(null);
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
//   const [alerts, setAlerts] = useState([
//     {
//       id: 1,
//       timestamp: "2024-01-15 14:32:15",
//       zone: "East Wall B",
//       severity: "High",
//       type: "Strain Threshold",
//       message: "Strain gauge readings exceeded critical threshold of 500 microstrains",
//       status: "active",
//       coordinates: "45.1°N, 112.6°W",
//       sensorId: "SG-EW-B-04",
//       recommendedAction: "Evacuate immediate area and halt operations within 100m radius",
//       acknowledged: false
//     },
//     {
//       id: 2,
//       timestamp: "2024-01-15 13:45:22",
//       zone: "South Bench C", 
//       severity: "Critical",
//       type: "Displacement Alert",
//       message: "Rapid displacement detected: 15mm movement in 2 hours",
//       status: "active",
//       coordinates: "45.0°N, 112.8°W", 
//       sensorId: "DM-SB-C-07",
//       recommendedAction: "IMMEDIATE EVACUATION - All personnel clear the area immediately",
//       acknowledged: false
//     },
//     {
//       id: 3,
//       timestamp: "2024-01-15 12:18:43",
//       zone: "North Slope A",
//       severity: "Medium",
//       type: "Vibration Anomaly", 
//       message: "Unusual vibration patterns detected during blasting operations",
//       status: "acknowledged",
//       coordinates: "45.2°N, 112.7°W",
//       sensorId: "VM-NS-A-02",
//       recommendedAction: "Monitor closely and review blasting procedures",
//       acknowledged: true
//     },
//     {
//       id: 4,
//       timestamp: "2024-01-15 11:30:12",
//       zone: "West Quarry D",
//       severity: "Low", 
//       type: "Weather Warning",
//       message: "Heavy rainfall forecast may affect slope stability",
//       status: "resolved",
//       coordinates: "45.3°N, 112.9°W",
//       sensorId: "WS-WQ-D-01",
//       recommendedAction: "Increase monitoring frequency during rainfall",
//       acknowledged: true
//     },
//     {
//       id: 5,
//       timestamp: "2024-01-15 10:15:33",
//       zone: "East Wall B",
//       severity: "Medium",
//       type: "Pore Pressure",
//       message: "Groundwater pressure increase detected in monitoring wells",
//       status: "investigating", 
//       coordinates: "45.1°N, 112.6°W",
//       sensorId: "PP-EW-B-05",
//       recommendedAction: "Investigate drainage systems and monitor trend",
//       acknowledged: true
//     }
//   ]);

//   const handleAcknowledge = (alertId: number) => {
//     setAlerts(prevAlerts => 
//       prevAlerts.map(alert => 
//         alert.id === alertId 
//           ? { ...alert, acknowledged: true, status: "acknowledged" }
//           : alert
//       )
//     );
//   };

//   const handleTakeAction = (alertId: number) => {
//     setAlerts(prevAlerts =>
//       prevAlerts.map(alert =>
//         alert.id === alertId
//           ? { ...alert, status: "resolved", acknowledged: true }
//           : alert
//       )
//     );
//   };

//   const handleViewDetails = (alert: any) => {
//     setSelectedAlert(alert);
//     setIsDetailsOpen(true);
//   };

//   const filteredAlerts = filter === "all" ? alerts : alerts.filter(alert => {
//     if (filter === "active") return alert.status === "active";
//     if (filter === "acknowledged") return alert.acknowledged;
//     if (filter === "unacknowledged") return !alert.acknowledged;
//     return true;
//   });

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "Critical": return "status-critical";
//       case "High": return "status-danger";
//       case "Medium": return "status-warning";
//       case "Low": return "status-caution";
//       default: return "status-safe";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "active": return AlertTriangle;
//       case "acknowledged": return CheckCircle;
//       case "resolved": return CheckCircle;
//       case "investigating": return Clock;
//       default: return AlertTriangle;
//     }
//   };

//   // Calculate dynamic counts
//   const activeCount = alerts.filter(alert => alert.status === "active").length;
//   const acknowledgedCount = alerts.filter(alert => alert.acknowledged).length;
//   const criticalCount = alerts.filter(alert => alert.severity === "Critical" && alert.status === "active").length;
//   const resolvedCount = alerts.filter(alert => alert.status === "resolved").length;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Alert Management</h1>
//           <p className="text-muted-foreground">Monitor and manage safety alerts and notifications</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm">
//             <Mail className="h-4 w-4 mr-2" />
//             Email Settings
//           </Button>
//           <Button variant="outline" size="sm">
//             <MessageSquare className="h-4 w-4 mr-2" />
//             SMS Config
//           </Button>
//         </div>
//       </div>

//       {/* Alert Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Active Alerts</p>
//                 <p className="text-2xl font-bold text-status-danger">{activeCount}</p>
//               </div>
//               <AlertTriangle className="h-8 w-8 text-status-danger" />
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Acknowledged</p>
//                 <p className="text-2xl font-bold text-status-caution">{acknowledgedCount}</p>
//               </div>
//               <CheckCircle className="h-8 w-8 text-status-caution" />
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Critical (24h)</p>
//                 <p className="text-2xl font-bold text-status-critical">{criticalCount}</p>
//               </div>
//               <Bell className="h-8 w-8 text-status-critical" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="gradient-surface border-border">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Resolved (7d)</p>
//                 <p className="text-2xl font-bold text-status-safe">{resolvedCount}</p>
//               </div>
//               <Archive className="h-8 w-8 text-status-safe" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="gradient-surface border-border">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-foreground">
//             <Filter className="h-5 w-5" />
//             Filter Alerts
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-wrap gap-2">
//             {["all", "active", "acknowledged", "unacknowledged"].map((filterType) => (
//               <Button
//                 key={filterType}
//                 variant={filter === filterType ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setFilter(filterType)}
//                 className={filter === filterType ? "gradient-primary text-white" : ""}
//               >
//                 {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
//               </Button>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Alert List */}
//       <div className="space-y-4">
//         {filteredAlerts.map((alert) => {
//           const StatusIcon = getStatusIcon(alert.status);
          
//           return (
//             <Card key={alert.id} className={`gradient-surface border-border ${
//               !alert.acknowledged && alert.status === "active" ? "ring-2 ring-status-danger/20" : ""
//             }`}>
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-start gap-3">
//                     <StatusIcon className={`h-5 w-5 mt-1 ${
//                       alert.status === "active" ? "text-status-danger" :
//                       alert.status === "resolved" ? "text-status-safe" :
//                       "text-status-caution"
//                     }`} />
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <h3 className="font-medium text-foreground">{alert.type}</h3>
//                         <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>
//                           {alert.severity}
//                         </Badge>
//                         {!alert.acknowledged && alert.status === "active" && (
//                           <Badge variant="destructive" className="text-xs">
//                             Unacknowledged
//                           </Badge>
//                         )}
//                       </div>
//                       <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
//                       <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-3 w-3" />
//                           <span>{alert.zone}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           <span>{alert.timestamp}</span>
//                         </div>
//                         <div>
//                           <span>Sensor: {alert.sensorId}</span>
//                         </div>
//                       </div>
//                       <div className="bg-background/50 p-3 rounded-lg">
//                         <p className="text-sm font-medium text-foreground mb-1">Recommended Action:</p>
//                         <p className="text-sm text-muted-foreground">{alert.recommendedAction}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between pt-4 border-t border-border">
//                   <StatusIndicator 
//                     status={alert.status === "active" ? "danger" : alert.status === "resolved" ? "safe" : "caution"} 
//                     label={alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
//                   />
                  
//                   <div className="flex items-center gap-2">
//                     {!alert.acknowledged && (
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => handleAcknowledge(alert.id)}
//                       >
//                         Acknowledge
//                       </Button>
//                     )}
//                     <Button 
//                       size="sm" 
//                       variant="outline"
//                       onClick={() => handleViewDetails(alert)}
//                     >
//                       View Details
//                     </Button>
//                     {(alert.status === "active" || alert.status === "acknowledged") && (
//                       <Button 
//                         size="sm" 
//                         className="gradient-primary text-white"
//                         onClick={() => handleTakeAction(alert.id)}
//                       >
//                         Take Action
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Alert Details Modal */}
//       <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5" />
//               Alert Details - {selectedAlert?.type}
//             </DialogTitle>
//             <DialogDescription>
//               Comprehensive information about this safety alert
//             </DialogDescription>
//           </DialogHeader>
          
//           {selectedAlert && (
//             <div className="space-y-6">
//               {/* Alert Header */}
//               <div className="flex items-start justify-between p-4 bg-background/50 rounded-lg">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Badge className={`${getSeverityColor(selectedAlert.severity)} text-xs`}>
//                       {selectedAlert.severity}
//                     </Badge>
//                     <Badge variant={selectedAlert.status === "active" ? "destructive" : "secondary"} className="text-xs">
//                       {selectedAlert.status.charAt(0).toUpperCase() + selectedAlert.status.slice(1)}
//                     </Badge>
//                     {selectedAlert.acknowledged && (
//                       <Badge variant="outline" className="text-xs">
//                         Acknowledged
//                       </Badge>
//                     )}
//                   </div>
//                   <h3 className="font-semibold text-lg">{selectedAlert.type}</h3>
//                   <p className="text-muted-foreground mt-1">{selectedAlert.message}</p>
//                 </div>
//               </div>

//               {/* Alert Information Grid */}
//               <div className="grid grid-cols-2 gap-4">
//                 <Card className="gradient-surface border-border">
//                   <CardContent className="p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Calendar className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Timestamp</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{selectedAlert.timestamp}</p>
//                   </CardContent>
//                 </Card>

//                 <Card className="gradient-surface border-border">
//                   <CardContent className="p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <MapPin className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Location</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{selectedAlert.zone}</p>
//                     <p className="text-xs text-muted-foreground/70">{selectedAlert.coordinates}</p>
//                   </CardContent>
//                 </Card>

//                 <Card className="gradient-surface border-border">
//                   <CardContent className="p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Activity className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Sensor ID</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{selectedAlert.sensorId}</p>
//                   </CardContent>
//                 </Card>

//                 <Card className="gradient-surface border-border">
//                   <CardContent className="p-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Target className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm font-medium">Alert ID</span>
//                     </div>
//                     <p className="text-sm text-muted-foreground">#{selectedAlert.id.toString().padStart(6, '0')}</p>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Recommended Action */}
//               <Card className="gradient-surface border-border">
//                 <CardHeader>
//                   <CardTitle className="text-base text-foreground">Recommended Action</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-foreground/80">{selectedAlert.recommendedAction}</p>
//                 </CardContent>
//               </Card>

//               {/* Action Buttons */}
//               <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
//                 {!selectedAlert.acknowledged && selectedAlert.status === "active" && (
//                   <Button 
//                     variant="outline" 
//                     onClick={() => {
//                       handleAcknowledge(selectedAlert.id);
//                       setIsDetailsOpen(false);
//                     }}
//                   >
//                     Acknowledge
//                   </Button>
//                 )}
//                 {(selectedAlert.status === "active" || selectedAlert.status === "acknowledged") && (
//                   <Button 
//                     className="gradient-primary text-white"
//                     onClick={() => {
//                       handleTakeAction(selectedAlert.id);
//                       setIsDetailsOpen(false);
//                     }}
//                   >
//                     Take Action & Resolve
//                   </Button>
//                 )}
//                 <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
//                   Close
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Alerts;


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Bell,
  Filter,
  Archive,
  Calendar,
  Activity,
  Target
} from "lucide-react";

const Alerts = () => {
  const [filter, setFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      timestamp: "2024-01-15 14:32:15",
      zone: "East Wall B",
      severity: "High",
      type: "Strain Threshold",
      message: "Strain gauge readings exceeded critical threshold of 500 microstrains",
      status: "active",
      coordinates: "45.1°N, 112.6°W",
      sensorId: "SG-EW-B-04",
      recommendedAction: "Evacuate immediate area and halt operations within 100m radius",
      acknowledged: false
    },
    {
      id: 2,
      timestamp: "2024-01-15 13:45:22",
      zone: "South Bench C", 
      severity: "Critical",
      type: "Displacement Alert",
      message: "Rapid displacement detected: 15mm movement in 2 hours",
      status: "active",
      coordinates: "45.0°N, 112.8°W", 
      sensorId: "DM-SB-C-07",
      recommendedAction: "IMMEDIATE EVACUATION - All personnel clear the area immediately",
      acknowledged: false
    },
    {
      id: 3,
      timestamp: "2024-01-15 12:18:43",
      zone: "North Slope A",
      severity: "Medium",
      type: "Vibration Anomaly", 
      message: "Unusual vibration patterns detected during blasting operations",
      status: "acknowledged",
      coordinates: "45.2°N, 112.7°W",
      sensorId: "VM-NS-A-02",
      recommendedAction: "Monitor closely and review blasting procedures",
      acknowledged: true
    },
    {
      id: 4,
      timestamp: "2024-01-15 11:30:12",
      zone: "West Quarry D",
      severity: "Low", 
      type: "Weather Warning",
      message: "Heavy rainfall forecast may affect slope stability",
      status: "resolved",
      coordinates: "45.3°N, 112.9°W",
      sensorId: "WS-WQ-D-01",
      recommendedAction: "Increase monitoring frequency during rainfall",
      acknowledged: true
    },
    {
      id: 5,
      timestamp: "2024-01-15 10:15:33",
      zone: "East Wall B",
      severity: "Medium",
      type: "Pore Pressure",
      message: "Groundwater pressure increase detected in monitoring wells",
      status: "investigating", 
      coordinates: "45.1°N, 112.6°W",
      sensorId: "PP-EW-B-05",
      recommendedAction: "Investigate drainage systems and monitor trend",
      acknowledged: true
    }
  ]);

  const handleAcknowledge = (alertId: number) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true, status: "acknowledged" }
          : alert
      )
    );
  };

  const handleTakeAction = (alertId: number) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: "resolved", acknowledged: true }
          : alert
      )
    );
  };

  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert);
    setIsDetailsOpen(true);
  };

  const filteredAlerts = filter === "all" ? alerts : alerts.filter(alert => {
    if (filter === "active") return alert.status === "active";
    if (filter === "acknowledged") return alert.acknowledged;
    if (filter === "unacknowledged") return !alert.acknowledged;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "status-critical";
      case "High": return "status-danger";
      case "Medium": return "status-warning";
      case "Low": return "status-caution";
      default: return "status-safe";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return AlertTriangle;
      case "acknowledged": return CheckCircle;
      case "resolved": return CheckCircle;
      case "investigating": return Clock;
      default: return AlertTriangle;
    }
  };

  // Calculate dynamic counts
  const activeCount = alerts.filter(alert => alert.status === "active").length;
  const acknowledgedCount = alerts.filter(alert => alert.acknowledged).length;
  const criticalCount = alerts.filter(alert => alert.severity === "Critical" && alert.status === "active").length;
  const resolvedCount = alerts.filter(alert => alert.status === "resolved").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alert Management</h1>
          <p className="text-muted-foreground">Monitor and manage safety alerts and notifications</p>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-surface border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-status-danger">{activeCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-status-danger" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-surface border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Acknowledged</p>
                <p className="text-2xl font-bold text-status-caution">{acknowledgedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-status-caution" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-surface border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical (24h)</p>
                <p className="text-2xl font-bold text-status-critical">{criticalCount}</p>
              </div>
              <Bell className="h-8 w-8 text-status-critical" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-surface border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved (7d)</p>
                <p className="text-2xl font-bold text-status-safe">{resolvedCount}</p>
              </div>
              <Archive className="h-8 w-8 text-status-safe" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="gradient-surface border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Filter className="h-5 w-5" />
            Filter Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["all", "active", "acknowledged", "unacknowledged"].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? "gradient-primary text-white" : ""}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const StatusIcon = getStatusIcon(alert.status);
          
          return (
            <Card key={alert.id} className={`gradient-surface border-border ${
              !alert.acknowledged && alert.status === "active" ? "ring-2 ring-status-danger/20" : ""
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <StatusIcon className={`h-5 w-5 mt-1 ${
                      alert.status === "active" ? "text-status-danger" :
                      alert.status === "resolved" ? "text-status-safe" :
                      "text-status-caution"
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{alert.type}</h3>
                        <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>
                          {alert.severity}
                        </Badge>
                        {!alert.acknowledged && alert.status === "active" && (
                          <Badge variant="destructive" className="text-xs">
                            Unacknowledged
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.zone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{alert.timestamp}</span>
                        </div>
                        <div>
                          <span>Sensor: {alert.sensorId}</span>
                        </div>
                      </div>
                      <div className="bg-background/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-foreground mb-1">Recommended Action:</p>
                        <p className="text-sm text-muted-foreground">{alert.recommendedAction}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <StatusIndicator 
                    status={alert.status === "active" ? "danger" : alert.status === "resolved" ? "safe" : "caution"} 
                    label={alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  />
                  
                  <div className="flex items-center gap-2">
                    {!alert.acknowledged && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAcknowledge(alert.id)}
                      >
                        Acknowledge
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(alert)}
                    >
                      View Details
                    </Button>
                    {(alert.status === "active" || alert.status === "acknowledged") && (
                      <Button 
                        size="sm" 
                        className="gradient-primary text-white"
                        onClick={() => handleTakeAction(alert.id)}
                      >
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alert Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alert Details - {selectedAlert?.type}
            </DialogTitle>
            <DialogDescription>
              Comprehensive information about this safety alert
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="space-y-6">
              {/* Alert Header */}
              <div className="flex items-start justify-between p-4 bg-background/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${getSeverityColor(selectedAlert.severity)} text-xs`}>
                      {selectedAlert.severity}
                    </Badge>
                    <Badge variant={selectedAlert.status === "active" ? "destructive" : "secondary"} className="text-xs">
                      {selectedAlert.status.charAt(0).toUpperCase() + selectedAlert.status.slice(1)}
                    </Badge>
                    {selectedAlert.acknowledged && (
                      <Badge variant="outline" className="text-xs">
                        Acknowledged
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">{selectedAlert.type}</h3>
                  <p className="text-muted-foreground mt-1">{selectedAlert.message}</p>
                </div>
              </div>

              {/* Alert Information Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="gradient-surface border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Timestamp</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedAlert.timestamp}</p>
                  </CardContent>
                </Card>

                <Card className="gradient-surface border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedAlert.zone}</p>
                    <p className="text-xs text-muted-foreground/70">{selectedAlert.coordinates}</p>
                  </CardContent>
                </Card>

                <Card className="gradient-surface border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Sensor ID</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedAlert.sensorId}</p>
                  </CardContent>
                </Card>

                <Card className="gradient-surface border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Alert ID</span>
                    </div>
                    <p className="text-sm text-muted-foreground">#{selectedAlert.id.toString().padStart(6, '0')}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recommended Action */}
              <Card className="gradient-surface border-border">
                <CardHeader>
                  <CardTitle className="text-base text-foreground">Recommended Action</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">{selectedAlert.recommendedAction}</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
                {!selectedAlert.acknowledged && selectedAlert.status === "active" && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleAcknowledge(selectedAlert.id);
                      setIsDetailsOpen(false);
                    }}
                  >
                    Acknowledge
                  </Button>
                )}
                {(selectedAlert.status === "active" || selectedAlert.status === "acknowledged") && (
                  <Button 
                    className="gradient-primary text-white"
                    onClick={() => {
                      handleTakeAction(selectedAlert.id);
                      setIsDetailsOpen(false);
                    }}
                  >
                    Take Action & Resolve
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Alerts;
