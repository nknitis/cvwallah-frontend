import { useState } from "react";
import { useCV } from "../../context/CVContext.jsx";
import { extractPdfText, importResumeText } from "../../services/api.js";

const MAX_PDF_SIZE_MB = 8;

const ResumeImportPanel = () => {
  const { replaceCvData } = useCV();
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [links, setLinks] = useState([]);

  const copyLinks = async () => {
    if (!links.length) return;

    try {
      await navigator.clipboard.writeText(links.join("\n"));
      setStatus("Links copied.");
    } catch {
      setError("Copy failed.");
    }
  };

  const importStructuredResume = async (resumeText, successMessage) => {
    if (!resumeText.trim()) {
      setError("No readable resume text found.");
      return;
    }

    setProgress(85);
    setStatus("Structuring resume with AI...");
    const parsed = await importResumeText(resumeText);
    replaceCvData(parsed);
    setProgress(100);
    setStatus(successMessage);
  };

  const handleImport = async () => {
    setIsLoading(true);
    setProgress(20);
    setError("");
    setStatus("Preparing pasted resume text...");

    try {
      await importStructuredResume(text, "Resume text imported into the CV builder.");
    } catch (err) {
      setError(err.message);
      setStatus("");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_PDF_SIZE_MB * 1024 * 1024) {
      setError(`PDF is too large. Please upload a file under ${MAX_PDF_SIZE_MB} MB.`);
      event.target.value = "";
      return;
    }

    setIsLoading(true);
    setProgress(10);
    setStatus("Reading PDF file...");
    setError("");
    setLinks([]);

    try {
      setProgress(35);
      setStatus("Uploading PDF to server...");
      const result = await extractPdfText(file);

      setProgress(85);
      setStatus("Putting extracted text in the editor...");
      setText(result.text);
      setLinks(result.links || []);
      setProgress(100);
      setStatus(
        result.totalPages > result.pagesRead
          ? `First ${result.pagesRead} of ${result.totalPages} pages extracted. Click Import text with AI.`
          : "PDF text extracted. Click Import text with AI to fill the CV."
      );
    } catch (error) {
      console.error(error);
      setError(error.message || "Unable to read the selected PDF. Please try another file.");
      setStatus("");
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="rounded border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-900">Import from resume</h3>
      <p className="mt-1 text-sm text-slate-500">
        Paste resume text or upload a PDF and we will fill the matching CV sections.
      </p>
      {isLoading ? (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600">
            <span>{status || "Importing resume..."}</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded bg-slate-200">
            <div
              className="h-full rounded bg-slate-950 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : null}
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="mt-3 min-h-40 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
        placeholder="Paste resume text here..."
      />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleImport}
          disabled={!text.trim() || isLoading}
          className="rounded bg-slate-950 px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Working..." : "Import text with AI"}
        </button>
        <label
          className={`rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 ${
            isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          }`}
        >
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handlePdfUpload}
            disabled={isLoading}
          />
          Extract PDF text
        </label>
      </div>
      {links.length ? (
        <div className="mt-3 rounded border border-slate-200 bg-white p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-800">Links found</p>
            <button
              type="button"
              onClick={copyLinks}
              className="rounded border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
            >
              Copy links
            </button>
          </div>
          <div className="mt-2 space-y-1">
            {links.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="block break-all text-sm text-slate-600 underline"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      ) : null}
      {status ? <p className="mt-2 text-sm text-emerald-600">{status}</p> : null}
      {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
    </div>
  );
};

export default ResumeImportPanel;
