import { Gauge } from "lucide-react";
import { useState } from "react";
import { useCV } from "../../context/CVContext.jsx";
import { getAtsScore } from "../../services/api.js";

const AtsScorePanel = () => {
  const { cvData } = useCV();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAtsScore(cvData);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const score = result?.score || 0;

  return (
    <div className="rounded border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">ATS Score Checker</h3>
          <p className="text-sm text-slate-500">Structure and keyword readiness.</p>
        </div>
        <button
          type="button"
          onClick={handleCheck}
          disabled={loading}
          className="flex h-10 items-center gap-2 rounded bg-emerald-600 px-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Gauge size={17} />
          <span>{loading ? "Checking" : "Check"}</span>
        </button>
      </div>

      {result ? (
        <div className="mt-4 flex gap-4">
          <div
            className="grid h-20 w-20 shrink-0 place-items-center rounded-full"
            style={{
              background: `conic-gradient(#059669 ${score * 3.6}deg, #e2e8f0 0deg)`
            }}
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-bold text-slate-950">
              {score}
            </div>
          </div>
          <ul className="list-disc space-y-1 pl-4 text-sm text-slate-600">
            {result.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
    </div>
  );
};

export default AtsScorePanel;
