import React from "react";
import {
  Camera,
  Cloud,
  Database,
  Brain,
  LineChart,
  ShieldAlert,
  Bell,
  Settings,
  RefreshCcw,
  Workflow,
  Monitor,
  Users,
} from "lucide-react";

const HomePage: React.FC = () => {
  const features = [
    {
      category: "1. Data Collection",
      items: [
        {
          title: "Real-time Monitoring",
          desc: "Cameras and sensors continuously monitor slope conditions.",
          icon: Camera,
        },
        {
          title: "Environmental Data",
          desc: "Weather patterns, seismic activity, and other environmental factors are tracked.",
          icon: Cloud,
        },
        {
          title: "Historical Data",
          desc: "Past rockfall events are analyzed to identify patterns and trends.",
          icon: Database,
        },
      ],
    },
    {
      category: "2. AI Analysis",
      items: [
        {
          title: "Machine Learning Models",
          desc: "Sophisticated algorithms learn from data to identify potential rockfall triggers.",
          icon: Brain,
        },
        {
          title: "Pattern Recognition",
          desc: "The system recognizes subtle changes and patterns that may indicate an impending event.",
          icon: LineChart,
        },
        {
          title: "Risk Assessment",
          desc: "The likelihood and potential impact of rockfalls are assessed in real-time.",
          icon: ShieldAlert,
        },
      ],
    },
    {
      category: "3. Prediction & Alert Generation",
      items: [
        {
          title: "Early Warning System",
          desc: "Alerts are issued well in advance of potential rockfall events, allowing for timely action.",
          icon: Bell,
        },
        {
          title: "Customizable Alerts",
          desc: "Alerts can be tailored to specific needs and delivered through various channels.",
          icon: Settings,
        },
        {
          title: "Continuous Improvement",
          desc: "The system continuously learns and improves its accuracy with new data.",
          icon: RefreshCcw,
        },
      ],
    },
    {
      category: "4. System Integration",
      items: [
        {
          title: "Seamless Integration",
          desc: "Our algorithm integrates with existing mine management systems for a streamlined workflow.",
          icon: Workflow,
        },
        {
          title: "User-Friendly Interface",
          desc: "A clear and intuitive interface provides easy access to predictions and data.",
          icon: Monitor,
        },
        {
          title: "Expert Support",
          desc: "Our team of experts provides ongoing support and guidance.",
          icon: Users,
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: "url('/rock fall 1.jpg')", // ✅ rename image properly in public/
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Logo - top left */}
        <div className="absolute top-6 left-6 z-20 flex items-center space-x-3">
          <img
            src="/favicon.ico"
            alt="MineGuard Logo"
            className="w-20 h-20 opacity-80"
          />
          <span className="text-xl font-bold tracking-wide">TechTonic</span>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            AI-Based Rockfall Prediction <br /> & Alert System
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow">
            Monitoring and predicting rockfall hazards in open-pit mines with{" "}
            <span className="text-yellow-400 font-semibold">
              AI-powered safety solutions
            </span>
            . Real-time alerts, predictive insights, and enhanced worker safety.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/dashboard"
              className="flex items-center overflow-hidden rounded-lg shadow-lg transition transform hover:scale-105"
            >
              {/* Left white part with text */}
              <span className="bg-gray-800 text-white-900 px-6 py-3 font-semibold">
                Get Started
              </span>

              {/* Right orange part with arrow */}
              <span className="bg-white px-2 py-3.5 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </a>
            <a
              href="#features"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-gray-950 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          How Our AI Predicts Rockfalls
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-12 text-center">
          Our system uses advanced AI algorithms to analyze real-time data from
          various sources, predicting rockfall events with high accuracy.
        </p>

        {/* --- First Part: 4 Circle Steps --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {[
            "Data Collection",
            "AI Analysis",
            "Prediction & Alert",
            "System Integration",
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="bg-blue-500 text-black font-bold text-xl w-12 h-12 flex items-center justify-center rounded-full mb-4">
                {idx + 1}
              </div>
              <h3 className="font-semibold text-lg">{step}</h3>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {features.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-semibold text-white-400 mb-8">
                {section.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="bg-gray-800/60 p-6 rounded-2xl shadow-lg transition transform hover:scale-105 hover:bg-gray-700/80 hover:shadow-blue-500/30 duration-300"
                    >
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/20 mb-4 mx-auto">
                        <Icon className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2 text-center">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-center">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
