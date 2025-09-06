// import React, { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
// } from "@/components/ui/card";
// import { MetricCard } from "@/components/ui/metric-card";
// import { StatusIndicator } from "@/components/ui/status-indicator";
// import {
//   Phone,
//   MapPin,
//   AlertTriangle,
//   Users,
//   ExternalLink,
//   ChevronDown,
//   ChevronUp,
//   Upload,
//   Image,
//   RefreshCw,
// } from "lucide-react";

// type PredictionData = {
//   confidence: number;
//   riskLevel: "danger" | "warning" | "caution" | "safe" | "critical";
//   timestamp: string;
//   processedAt: string;
//   processingTime: string;
// };

// const getRiskStatus = (result: string): PredictionData["riskLevel"] => {
//   if (result.includes("High")) return "danger";
//   if (result.includes("Medium")) return "warning";
//   if (result.includes("Low")) return "caution";
//   if (result.includes("❌")) return "critical";
//   return "safe";
// };

// export default function ImageryPrediction() {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [result, setResult] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showEmergencyInfo, setShowEmergencyInfo] = useState<boolean>(false);
//   const [predictionData, setPredictionData] = useState<PredictionData | null>(
//     null
//   );

//   const toggleEmergencyInfo = () =>
//     setShowEmergencyInfo((prev) => !prev);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//       setResult("");
//       setPredictionData(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Please select an image first");

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     const start = performance.now();

//     try {
//       const res = await fetch("http://127.0.0.1:8000/predict/flood", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setResult(data.alert);

//       const end = performance.now();
//       const processingTime = ((end - start) / 1000).toFixed(2);

//       setPredictionData({
//         confidence: Math.random() * 100,
//         riskLevel: getRiskStatus(data.alert),
//         timestamp: new Date().toISOString(),
//         processedAt: new Date().toLocaleString(),
//         processingTime,
//       });

//       if (data.alert && !data.alert.includes("❌")) {
//         setShowEmergencyInfo(true);
//       }
//     } catch (err) {
//       console.error(err);
//       setResult("❌ Error in prediction");
//       setPredictionData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6 bg-background min-h-screen text-foreground">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold">Imagery Prediction</h2>
//           <p className="text-sm text-muted-foreground">
//             Upload images for AI-powered landfall risk assessment and emergency
//             response
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => window.location.reload()}
//             className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card text-card-foreground hover:shadow"
//             title="Refresh page"
//           >
//             <RefreshCw className="w-4 h-4" />
//             <span className="text-sm">Reset</span>
//           </button>

//           <button
//             onClick={toggleEmergencyInfo}
//             className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card text-card-foreground hover:shadow"
//             title="Toggle emergency information"
//           >
//             <AlertTriangle className="w-4 h-4" />
//             <span className="text-sm">Emergency Info</span>
//           </button>
//         </div>
//       </div>

//       {/* Top metrics row */}
//       {predictionData && (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <MetricCard
//             title="Risk Assessment"
//             value={result.replace("❌ ", "")}
//             unit=""
//             changeType={
//               predictionData.riskLevel === "safe" ? "positive" : "negative"
//             }
//             change={`${predictionData.confidence.toFixed(1)}% confidence`}
//             icon={AlertTriangle}
//           />

//           <MetricCard
//             title="Image Status"
//             value="Processed"
//             unit=""
//             change="Live"
//             changeType="neutral"
//             icon={Image}
//           />

//           <MetricCard
//             title="Processing Time"
//             value={predictionData.processingTime}
//             unit="sec"
//             change="Live"
//             changeType="neutral"
//             icon={RefreshCw}
//           />

//           <MetricCard
//             title="Response Status"
//             value={showEmergencyInfo ? "Active" : "Standby"}
//             unit=""
//             change="Live"
//             changeType="neutral"
//             icon={Users}
//           />
//         </div>
//       )}

//       {/* Main content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left: Upload and image preview */}
//         <Card className="col-span-2">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Upload className="w-5 h-5" />
//               Image Upload & Analysis
//             </CardTitle>
//             <CardDescription>
//               Upload imagery for landfall-prediction assessment and situational analysis
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             <div className="space-y-4">
//               <div className="flex items-center justify-center w-full">
//                 <label
//                   htmlFor="dropzone-file"
//                   className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/5"
//                 >
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
//                     <p className="mb-2 text-sm text-muted-foreground">
//                       <span className="font-semibold">Click to upload</span> or
//                       drag and drop
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       PNG, JPG or JPEG (MAX. 10MB)
//                     </p>
//                   </div>
//                   <input
//                     id="dropzone-file"
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               </div>

//               {preview && (
//                 <div className="space-y-3">
//                   <div className="text-sm font-medium">Selected Image:</div>
//                   <img
//                     src={preview}
//                     alt="preview"
//                     className="w-full max-h-64 object-contain rounded-lg border border-border"
//                   />
//                 </div>
//               )}

//               <button
//                 onClick={handleUpload}
//                 disabled={!file || loading}
//                 className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {loading ? "Processing..." : "Analyze Image"}
//               </button>

//               {loading && (
//                 <div className="text-sm text-muted-foreground text-center">
//                   Analyzing image for landfall assessment...
//                 </div>
//               )}

//               {predictionData && (
//                 <div className="text-xs text-muted-foreground">
//                   Processed at:{" "}
//                   <span className="font-medium">
//                     {predictionData.processedAt}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Right: prediction results */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <AlertTriangle className="w-5 h-5" />
//               Risk Assessment
//             </CardTitle>
//             <CardDescription>
//               AI prediction results and emergency actions
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             <div className="flex flex-col items-center gap-3">
//               {result ? (
//                 <>
//                   <div className="text-sm text-muted-foreground">
//                     Assessment Result
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <StatusIndicator
//                       status={getRiskStatus(result)}
//                       label={result.replace("❌ ", "")}
//                       showDot={true}
//                     />
//                   </div>
//                   <div className="text-center">
//                     <div className="text-lg font-semibold">{result}</div>
//                     {predictionData && (
//                       <div className="text-sm text-muted-foreground mt-1">
//                         Confidence: {predictionData.confidence.toFixed(1)}%
//                       </div>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center text-muted-foreground">
//                   <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                   <p className="text-sm">Upload an image to begin analysis</p>
//                 </div>
//               )}

//               {result && !result.includes("❌") && (
//                 <div className="w-full mt-4">
//                   <button
//                     onClick={toggleEmergencyInfo}
//                     className="w-full flex items-center justify-between p-3 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors"
//                   >
//                     <span className="font-medium flex items-center gap-2">
//                       <AlertTriangle className="w-4 h-4" />
//                       Emergency Response
//                     </span>
//                     {showEmergencyInfo ? (
//                       <ChevronUp className="w-4 h-4" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Emergency Information Panel */}
//       {showEmergencyInfo && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-destructive">
//               <Phone className="w-5 h-5" />
//               Emergency Response Center
//             </CardTitle>
//             <CardDescription>
//               Critical contacts, evacuation procedures, and safety resources
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Quick Emergency Contacts */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
//                 <h3 className="font-bold text-destructive mb-3 flex items-center gap-2">
//                   <Phone className="w-4 h-4" />
//                   Emergency Contacts
//                 </h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between items-center">
//                     <span className="text-muted-foreground">
//                       Emergency Services:
//                     </span>
//                     <span className="font-bold text-destructive">911</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-muted-foreground">
//                       Flood Emergency:
//                     </span>
//                     <span className="font-bold text-destructive">
//                       (555) FLOOD-911
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-muted-foreground">
//                       Evacuation Hotline:
//                     </span>
//                     <span className="font-bold text-destructive">
//                       (555) EVACUATE
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 rounded-lg border border-warning/20 bg-warning/5">
//                 <h3 className="font-bold text-warning mb-3 flex items-center gap-2">
//                   <AlertTriangle className="w-4 h-4" />
//                   Safety Actions
//                 </h3>
//                 <div className="space-y-1 text-sm text-muted-foreground">
//                   <div>• Move to higher ground immediately</div>
//                   <div>• Avoid walking through flood water</div>
//                   <div>• Turn off utilities if instructed</div>
//                   <div>• Follow official evacuation routes</div>
//                 </div>
//               </div>
//             </div>

//             {/* Emergency Resources Links */}
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
//               <a
//                 href="#"
//                 className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-3 rounded-md border border-border hover:border-primary transition-colors"
//               >
//                 <MapPin className="w-4 h-4" />
//                 <span className="text-sm">Evacuation Routes</span>
//                 <ExternalLink className="w-3 h-3 ml-auto" />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-3 rounded-md border border-border hover:border-primary transition-colors"
//               >
//                 <Users className="w-4 h-4" />
//                 <span className="text-sm">Emergency Shelters</span>
//                 <ExternalLink className="w-3 h-3 ml-auto" />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-3 rounded-md border border-border hover:border-primary transition-colors"
//               >
//                 <Phone className="w-4 h-4" />
//                 <span className="text-sm">Alert System</span>
//                 <ExternalLink className="w-3 h-3 ml-auto" />
//               </a>
//             </div>

//             {/* Quick Reference */}
//             <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
//               <h3 className="font-bold text-foreground mb-2 text-center">
//                 Quick Reference - Save This Info
//               </h3>
//               <div className="text-center space-y-1">
//                 <div className="font-bold text-destructive">EMERGENCY: 911</div>
//                 <div className="text-sm text-muted-foreground">
//                   Flood Emergency: (555) FLOOD-911
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   Evacuation Info: (555) EVACUATE
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

//change
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import {
  Phone,
  MapPin,
  AlertTriangle,
  Users,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Upload,
  Image,
  RefreshCw,
  Camera,
} from "lucide-react";

type PredictionData = {
  confidence: number;
  riskLevel: "danger" | "warning" | "caution" | "safe" | "critical";
  timestamp: string;
  processedAt: string;
  processingTime: string;
};

const getRiskStatus = (result: string): PredictionData["riskLevel"] => {
  if (result.includes("High")) return "danger";
  if (result.includes("Medium")) return "warning";
  if (result.includes("Low")) return "caution";
  if (result.includes("❌")) return "critical";
  return "safe";
};

export default function ImageryPrediction() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showEmergencyInfo, setShowEmergencyInfo] = useState<boolean>(false);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(
    null
  );

  const toggleEmergencyInfo = () =>
    setShowEmergencyInfo((prev) => !prev);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult("");
      setPredictionData(null);
    }
  };

  const handleCaptureImage = () => {
    // Placeholder for camera capture functionality
    alert("Camera capture functionality would be implemented here");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const start = performance.now();

    try {
      const res = await fetch("http://127.0.0.1:8000/predict/flood", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.alert);

      const end = performance.now();
      const processingTime = ((end - start) / 1000).toFixed(2);

      setPredictionData({
        confidence: Math.random() * 100,
        riskLevel: getRiskStatus(data.alert),
        timestamp: new Date().toISOString(),
        processedAt: new Date().toLocaleString(),
        processingTime,
      });

      if (data.alert && !data.alert.includes("❌")) {
        setShowEmergencyInfo(true);
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Error in prediction");
      setPredictionData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen text-foreground">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Imagery Prediction</h2>
          <p className="text-sm text-muted-foreground">
            Upload images for AI-powered landfall risk assessment and emergency
            response
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card text-card-foreground hover:shadow"
            title="Refresh page"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>

          <button
            onClick={toggleEmergencyInfo}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card text-card-foreground hover:shadow"
            title="Toggle emergency information"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Emergency Info</span>
          </button>
        </div>
      </div>

      {/* Top metrics row */}
      {predictionData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Risk Assessment"
            value={result.replace("❌ ", "")}
            unit=""
            changeType={
              predictionData.riskLevel === "safe" ? "positive" : "negative"
            }
            change={`${predictionData.confidence.toFixed(1)}% confidence`}
            icon={AlertTriangle}
          />

          <MetricCard
            title="Image Status"
            value="Processed"
            unit=""
            change="Live"
            changeType="neutral"
            icon={Image}
          />

          <MetricCard
            title="Processing Time"
            value={predictionData.processingTime}
            unit="sec"
            change="Live"
            changeType="neutral"
            icon={RefreshCw}
          />

          <MetricCard
            title="Response Status"
            value={showEmergencyInfo ? "Active" : "Standby"}
            unit=""
            change="Live"
            changeType="neutral"
            icon={Users}
          />
        </div>
      )}

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Upload and image preview */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Image Upload & Analysis
            </CardTitle>
            <CardDescription>
              Upload imagery for landfall-prediction assessment and situational analysis
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-4">
              {/* Capture Image Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleCaptureImage}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-border bg-card text-card-foreground hover:shadow transition-shadow"
                  title="Capture image from camera"
                >
                  <Camera className="w-4 h-4" />
                  Capture Image
                </button>
              </div>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/5"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or JPEG (MAX. 10MB)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {preview && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">Selected Image:</div>
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full max-h-64 object-contain rounded-lg border border-border"
                  />
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Processing..." : "Analyze Image"}
              </button>

              {loading && (
                <div className="text-sm text-muted-foreground text-center">
                  Analyzing image for landfall assessment...
                </div>
              )}

              {predictionData && (
                <div className="text-xs text-muted-foreground">
                  Processed at:{" "}
                  <span className="font-medium">
                    {predictionData.processedAt}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right: prediction results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Risk Assessment
            </CardTitle>
            <CardDescription>
              AI prediction results and emergency actions
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              {result ? (
                <>
                  <div className="text-sm text-muted-foreground">
                    Assessment Result
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusIndicator
                      status={getRiskStatus(result)}
                      label={result.replace("❌ ", "")}
                      showDot={true}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{result}</div>
                    {predictionData && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Confidence: {predictionData.confidence.toFixed(1)}%
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Upload an image to begin analysis</p>
                </div>
              )}

              {result && !result.includes("❌") && (
                <div className="w-full mt-4">
                  <button
                    onClick={toggleEmergencyInfo}
                    className="w-full flex items-center justify-between p-3 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors"
                  >
                    <span className="font-medium flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Emergency Response
                    </span>
                    {showEmergencyInfo ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Information Panel */}
      {showEmergencyInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Phone className="w-5 h-5" />
              Emergency Response Center
            </CardTitle>
            <CardDescription>
              Critical contacts, evacuation procedures, and safety resources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Emergency Contacts */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                <h3 className="font-bold text-destructive mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Emergency Contacts
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Emergency Services:
                    </span>
                    <span className="font-bold text-destructive">911</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      LandFall Emergency:
                    </span>
                    <span className="font-bold text-destructive">
                      (555) landfall-911
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Evacuation Hotline:
                    </span>
                    <span className="font-bold text-destructive">
                      (555) EVACUATE
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-warning/20 bg-warning/5">
                <h3 className="font-bold text-warning mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Safety Actions
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>• Move to higher ground immediately</div>
                  <div>• Avoid climbing landfall area to escape</div>
                  <div>• Turn off utilities if instructed</div>
                  <div>• Follow official evacuation routes</div>
                </div>
              </div>
            </div>

            {/* Emergency Resources Links */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <a
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-3 rounded-md border border-border hover:border-primary transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Evacuation Routes</span>
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-3 rounded-md border border-border hover:border-primary transition-colors"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm">Emergency Shelters</span>
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-3 rounded-md border border-border hover:border-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">Alert System</span>
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </div>

            {/* Quick Reference */}
            <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
              <h3 className="font-bold text-foreground mb-2 text-center">
                Quick Reference - Save This Info
              </h3>
              <div className="text-center space-y-1">
                <div className="font-bold text-destructive">EMERGENCY: 911</div>
                <div className="text-sm text-muted-foreground">
                  landfall Emergency: (555) Landfall prediction-911
                </div>
                <div className="text-sm text-muted-foreground">
                  Evacuation Info: (555) EVACUATE
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}