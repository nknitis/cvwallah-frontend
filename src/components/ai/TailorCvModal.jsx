import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useCV } from "../../context/CVContext.jsx";
import { tailorCv } from "../../services/api.js";

const TailorCvModal = () => {
  const { cvData, replaceCvData } = useCV();
  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTailor = async () => {
    setLoading(true);
    setError("");
    try {
      const updatedCv = await tailorCv(cvData, jobDescription);
      replaceCvData(updatedCv);
      setIsOpen(false);
      setJobDescription("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 items-center justify-center gap-2 rounded bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        <Sparkles size={18} />
        <span>Tailor CV for JD</span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4">
          <div className="w-full max-w-2xl rounded bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">AI CV Tailor</h3>
                <p className="text-sm text-slate-500">
                  Paste a job description and let Gemini optimize the CV.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
                title="Close"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              className="min-h-56 w-full resize-y rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
              placeholder="Paste target job description here..."
            />

            {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-10 rounded border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleTailor}
                disabled={loading || !jobDescription.trim()}
                className="flex h-10 items-center gap-2 rounded bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Sparkles size={17} />
                <span>{loading ? "Tailoring" : "Tailor CV"}</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TailorCvModal;
