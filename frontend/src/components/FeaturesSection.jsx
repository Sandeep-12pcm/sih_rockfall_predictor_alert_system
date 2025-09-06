import React from "react";
import {
  Eye,
  Cloud,
  BookOpen,
  Brain,
  Activity,
  Shield,
  Bell,
  Settings,
  Layers,
  Monitor,
  Users,
} from "lucide-react"; // using lucide-react icons

const FeaturesSection = () => {
  const sections = [
    {
      id: 1,
      title: "1. Data Collection",
      features: [
        {
          icon: <Eye className="w-6 h-6" />,
          title: "Real-time Monitoring",
          desc: "Cameras and sensors continuously monitor slope conditions.",
        },
        {
          icon: <Cloud className="w-6 h-6" />,
          title: "Environmental Data",
          desc: "Weather, seismic activity, and environmental factors are tracked.",
        },
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: "Historical Data",
          desc: "Past rockfall events are analyzed to identify patterns and trends.",
        },
      ],
    },
    {
      id: 2,
      title: "2. AI Analysis",
      features: [
        {
          icon: <Brain className="w-6 h-6" />,
          title: "Machine Learning Models",
          desc: "Sophisticated algorithms learn from data to identify rockfall triggers.",
        },
        {
          icon: <Activity className="w-6 h-6" />,
          title: "Pattern Recognition",
          desc: "The system recognizes subtle changes that indicate risk.",
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Risk Assessment",
          desc: "The likelihood and potential impact of rockfalls are assessed in real-time.",
        },
      ],
    },
    {
      id: 3,
      title: "3. Prediction & Alert Generation",
      features: [
        {
          icon: <Bell className="w-6 h-6" />,
          title: "Early Warning System",
          desc: "Alerts are issued well in advance of potential rockfall events.",
        },
        {
          icon: <Settings className="w-6 h-6" />,
          title: "Customizable Alerts",
          desc: "Alerts can be tailored to specific needs and delivered through channels.",
        },
        {
          icon: <Activity className="w-6 h-6" />,
          title: "Continuous Improvement",
          desc: "The system improves accuracy with new data over time.",
        },
      ],
    },
    {
      id: 4,
      title: "4. System Integration",
      features: [
        {
          icon: <Layers className="w-6 h-6" />,
          title: "Seamless Integration",
          desc: "Works with existing mine management systems for a smooth workflow.",
        },
        {
          icon: <Monitor className="w-6 h-6" />,
          title: "User-Friendly Interface",
          desc: "A clear and intuitive interface makes data and alerts easy to access.",
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Expert Support",
          desc: "Our team provides ongoing support and guidance.",
        },
      ],
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          How Our AI Predicts Rockfalls
        </h2>
        <p className="text-lg text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          Our system uses advanced AI algorithms to analyze real-time data,
          predict rockfall events with high accuracy, and provide actionable insights.
        </p>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.id}>
              <h3 className="text-2xl font-bold mb-8">{section.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:bg-gray-700/80 transition"
                  >
                    <div className="flex items-center gap-3 mb-4 text-yellow-400">
                      {feature.icon}
                      <h4 className="font-semibold text-lg text-white">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
