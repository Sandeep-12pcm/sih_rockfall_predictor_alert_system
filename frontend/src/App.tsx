import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RiskMaps from "./pages/RiskMaps";
import Alerts from "./pages/Alerts";
import DataTrends from "./pages/DataTrends";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import SensorDashboard from "./pages/SensorDashboard";
import HomePage from "./pages/HomePage";
import PredictLiveDashboard from "./pages/PredictLiveDashboard";
import DataFlowDiagram from "./components/DataFlowDiagram";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/sensor-dashboard" element={<SensorDashboard />} />
          <Route path="/predict-live" element={<PredictLiveDashboard />} />
          <Route path="/data-flow" element={<DataFlowDiagram />} />
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/risk-maps"
            element={
              <AppLayout>
                <RiskMaps />
              </AppLayout>
            }
          />
          <Route
            path="/alerts"
            element={
              <AppLayout>
                <Alerts />
              </AppLayout>
            }
          />
          <Route
            path="/trends"
            element={
              <AppLayout>
                <DataTrends />
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout>
                <Settings />
              </AppLayout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
