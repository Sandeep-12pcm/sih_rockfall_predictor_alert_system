"use client";
import { useState } from "react";
import { getPrediction } from "../actions/predict";

export default function PredictionForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const inputData = {
      sensor_id: 12,
      displacement: 0.43,
      strain: 0.12,
      pore_pressure: 1.04,
      rainfall: 10.5,
      temperature: 27.3,
    };

    const prediction = await getPrediction(inputData);
    setResult(prediction);
    setLoading(false);
  }

  return (
    <div className="p-4">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Predicting..." : "Get Prediction"}
      </button>

      {result && (
        <div className="mt-4 p-2 border rounded">
          <p><strong>Prediction:</strong> {result.prediction}</p>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
