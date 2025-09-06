import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Cpu, 
  BarChart3, 
  AlertTriangle, 
  Settings,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Zap,
  Gauge,
  Move3D,
  Vibrate,
  Wifi,
  Server,
  Smartphone
} from 'lucide-react';

interface FlowNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  details: string[];
  icon: React.ReactNode;
  color: string;
  strokeColor: string;
}

const DataFlowDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);

  // Define the flow nodes based on your ASCII structure
  const nodes: FlowNode[] = [
    {
      id: 'sensors',
      x: 400,
      y: 50,
      width: 280,
      height: 180,
      title: 'Sensors',
      subtitle: 'Physical Monitoring',
      details: ['D-01: Displacement', 'S-01: Strain', 'P-01: Pore Pressure', 'T-01: Tilt', 'V-01: Vibration'],
      icon: <Activity className="w-6 h-6" />,
      color: '#3b82f6',
      strokeColor: '#2563eb'
    },
    {
      id: 'datalogger',
      x: 450,
      y: 300,
      width: 180,
      height: 100,
      title: 'Data Logger',
      subtitle: 'Signal Processing',
      details: ['ADC Conversion', 'Time Stamping', 'Data Buffering'],
      icon: <Database className="w-6 h-6" />,
      color: '#10b981',
      strokeColor: '#059669'
    },
    {
      id: 'iotgateway',
      x: 450,
      y: 460,
      width: 180,
      height: 120,
      title: 'IoT Gateway',
      subtitle: 'Communication Hub',
      details: ['LoRa', '4G/LTE', 'WiFi', 'RS485'],
      icon: <Wifi className="w-6 h-6" />,
      color: '#f59e0b',
      strokeColor: '#d97706'
    },
    {
      id: 'serverdb',
      x: 450,
      y: 640,
      width: 180,
      height: 120,
      title: 'Server / Database',
      subtitle: 'Data Storage',
      details: ['Time-series DB', 'InfluxDB', 'TimescaleDB', 'Historical Data'],
      icon: <Server className="w-6 h-6" />,
      color: '#8b5cf6',
      strokeColor: '#7c3aed'
    },
    {
      id: 'mlmodel',
      x: 450,
      y: 820,
      width: 180,
      height: 120,
      title: 'ML Model',
      subtitle: 'Risk Prediction',
      details: ['Risk Prediction', 'Rockfall Analysis', 'Stability Assessment', 'Pattern Recognition'],
      icon: <Cpu className="w-6 h-6" />,
      color: '#ef4444',
      strokeColor: '#dc2626'
    },
    {
      id: 'dashboard',
      x: 450,
      y: 1000,
      width: 180,
      height: 120,
      title: 'Dashboard / Alerts',
      subtitle: 'User Interface',
      details: ['Web Dashboard', 'Mobile App', 'SMS Alerts', 'Email Notifications'],
      icon: <Smartphone className="w-6 h-6" />,
      color: '#06b6d4',
      strokeColor: '#0891b2'
    }
  ];

  // Define flow connections with labels
  const connections = [
    { from: 'sensors', to: 'datalogger', label: 'Analog Signals' },
    { from: 'datalogger', to: 'iotgateway', label: 'Digital Data' },
    { from: 'iotgateway', to: 'serverdb', label: 'JSON/CSV Packets' },
    { from: 'serverdb', to: 'mlmodel', label: 'API Query / Streaming' },
    { from: 'mlmodel', to: 'dashboard', label: 'Prediction Results' }
  ];

  // Animation logic
  useEffect(() => {
    if (isAnimated) {
      const interval = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % (connections.length + 1));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAnimated, connections.length]);

  const getNodeByPosition = (nodeId: string) => {
    return nodes.find(node => node.id === nodeId);
  };

  const getConnectionPath = (fromId: string, toId: string) => {
    const fromNode = getNodeByPosition(fromId);
    const toNode = getNodeByPosition(toId);
    
    if (!fromNode || !toNode) return '';
    
    const startX = fromNode.x + fromNode.width / 2;
    const startY = fromNode.y + fromNode.height;
    const endX = toNode.x + toNode.width / 2;
    const endY = toNode.y;
    
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  };

  const getSensorIcon = (detail: string) => {
    if (detail.includes('Displacement')) return <Activity className="w-4 h-4 text-blue-300" />;
    if (detail.includes('Strain')) return <Zap className="w-4 h-4 text-yellow-300" />;
    if (detail.includes('Pressure')) return <Gauge className="w-4 h-4 text-green-300" />;
    if (detail.includes('Tilt')) return <Move3D className="w-4 h-4 text-purple-300" />;
    if (detail.includes('Vibration')) return <Vibrate className="w-4 h-4 text-red-300" />;
    return null;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-auto relative">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAnimated(!isAnimated)}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          {isAnimated ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isAnimated ? 'Pause' : 'Play'} Flow
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedNode(null)}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-2xl font-bold text-white mb-2">
          Slope Monitoring System Architecture
        </h1>
        <p className="text-gray-300 text-sm">
          End-to-end data flow from sensors to dashboard
        </p>
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <Card className="absolute top-4 right-4 z-10 p-4 bg-white/95 backdrop-blur-sm max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            {nodes.find(n => n.id === selectedNode)?.icon}
            <h3 className="font-bold text-lg">
              {nodes.find(n => n.id === selectedNode)?.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            {nodes.find(n => n.id === selectedNode)?.subtitle}
          </p>
          <div className="space-y-1">
            {nodes.find(n => n.id === selectedNode)?.details.map((detail, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {selectedNode === 'sensors' && getSensorIcon(detail)}
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Main SVG Canvas */}
      <svg className="w-full h-full min-h-[1200px]" viewBox="0 0 1080 1200">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.7)" />
          </marker>
        </defs>

        {/* Connection Lines */}
        {connections.map((conn, index) => {
          const isActive = animationStep > index;
          const isCurrent = animationStep === index + 1;
          
          return (
            <g key={`connection-${index}`}>
              {/* Connection line */}
              <path
                d={getConnectionPath(conn.from, conn.to)}
                stroke={isCurrent ? '#00ff88' : isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isCurrent ? '4' : '2'}
                fill="none"
                markerEnd="url(#arrowhead)"
                className="transition-all duration-500"
                filter={isCurrent ? "url(#glow)" : "none"}
              />
              
              {/* Connection label */}
              <text
                x={(nodes.find(n => n.id === conn.from)!.x + nodes.find(n => n.id === conn.from)!.width / 2 +
                    nodes.find(n => n.id === conn.to)!.x + nodes.find(n => n.id === conn.to)!.width / 2) / 2}
                y={(nodes.find(n => n.id === conn.from)!.y + nodes.find(n => n.id === conn.from)!.height +
                    nodes.find(n => n.id === conn.to)!.y) / 2}
                textAnchor="middle"
                fill={isCurrent ? '#00ff88' : 'rgba(255,255,255,0.7)'}
                fontSize="12"
                fontWeight={isCurrent ? 'bold' : 'normal'}
                className="transition-all duration-500"
              >
                ({conn.label})
              </text>
            </g>
          );
        })}

        {/* Animated data flow dots */}
        {isAnimated && connections.map((conn, index) => {
          if (animationStep <= index) return null;
          
          return (
            <circle
              key={`flow-${index}`}
              r="4"
              fill="#00ff88"
              className="animate-pulse"
              filter="url(#glow)"
            >
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                begin={`${index * 2}s`}
              >
                <mpath href={`#flow-path-${index}`} />
              </animateMotion>
            </circle>
          );
        })}

        {/* Hidden paths for animation */}
        <defs>
          {connections.map((conn, index) => (
            <path
              key={`flow-path-${index}`}
              id={`flow-path-${index}`}
              d={getConnectionPath(conn.from, conn.to)}
              fill="none"
              stroke="none"
            />
          ))}
        </defs>

        {/* Nodes */}
        {nodes.map(node => {
          const isSelected = selectedNode === node.id;
          const isActive = animationStep >= connections.findIndex(c => c.from === node.id) + 1;
          
          return (
            <g key={node.id}>
              {/* Node background */}
              <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                rx="12"
                fill={`${node.color}20`}
                stroke={node.strokeColor}
                strokeWidth={isSelected ? "3" : "2"}
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={() => setSelectedNode(isSelected ? null : node.id)}
                filter={isSelected ? "url(#glow)" : isActive ? "url(#glow)" : "none"}
                opacity={isActive || isSelected ? 1 : 0.6}
              />
              
              {/* Node header */}
              <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height="40"
                rx="12"
                fill={node.color}
                className="cursor-pointer"
                onClick={() => setSelectedNode(isSelected ? null : node.id)}
              />
              
              {/* Node icon */}
              <foreignObject
                x={node.x + 12}
                y={node.y + 7}
                width="26"
                height="26"
                className="pointer-events-none"
              >
                <div className="text-white">
                  {node.icon}
                </div>
              </foreignObject>
              
              {/* Node title */}
              <text
                x={node.x + 45}
                y={node.y + 25}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                className="pointer-events-none select-none"
              >
                {node.title}
              </text>
              
              {/* Node subtitle */}
              <text
                x={node.x + 12}
                y={node.y + 60}
                fill="white"
                fontSize="12"
                fontWeight="600"
                className="pointer-events-none select-none"
              >
                {node.subtitle}
              </text>
              
              {/* Node details */}
              {node.details.map((detail, index) => (
                <g key={`detail-${index}`}>
                  {node.id === 'sensors' && getSensorIcon(detail) && (
                    <foreignObject
                      x={node.x + 12}
                      y={node.y + 80 + index * 20}
                      width="16"
                      height="16"
                      className="pointer-events-none"
                    >
                      {getSensorIcon(detail)}
                    </foreignObject>
                  )}
                  <text
                    x={node.x + (node.id === 'sensors' ? 32 : 12)}
                    y={node.y + 92 + index * 20}
                    fill="rgba(255,255,255,0.9)"
                    fontSize="11"
                    className="pointer-events-none select-none"
                  >
                    {detail}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <h4 className="font-bold mb-2">System Flow</h4>
        <div className="space-y-1 text-xs">
          <div>• Physical sensors collect analog signals</div>
          <div>• Data logger converts and timestamps data</div>
          <div>• IoT gateway transmits data via multiple protocols</div>
          <div>• Server stores time-series data</div>
          <div>• ML model analyzes and predicts risks</div>
          <div>• Dashboard displays results and alerts</div>
        </div>
      </div>
    </div>
  );
};

export default DataFlowDiagram;