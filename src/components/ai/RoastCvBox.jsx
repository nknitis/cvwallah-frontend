import { Flame } from "lucide-react";
import { useState } from "react";
import { useCV } from "../../context/CVContext.jsx";
import { roastCv } from "../../services/api.js";

const RoastCvBox = () => {
  const { cvData } = useCV();
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoast = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await roastCv(cvData);
      setRoast(data.roast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded border border-orange-200 bg-orange-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">Savage Mode</h3>
          <p className="text-sm text-slate-600">Recruiter roast, Hinglish edition.</p>
        </div>
        <button
          type="button"
          onClick={handleRoast}
          disabled={loading}
          className="flex h-10 items-center gap-2 rounded bg-orange-600 px-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Flame className={loading ? "animate-pulse" : ""} size={17} />
          <span>{loading ? "Roasting" : "Roast"}</span>
        </button>
      </div>

      {roast ? (
        <div className="mt-4 whitespace-pre-line rounded border border-orange-200 bg-white p-3 text-sm leading-6 text-slate-800">
          {roast}
        </div>
      ) : null}

      {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
    </div>
  );
};

export default RoastCvBox;
