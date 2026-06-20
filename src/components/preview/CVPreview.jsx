import { Download, Printer } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableCV from "./PrintableCV.jsx";

const CVPreview = () => {
  const printRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "CV-Wallah-Resume"
  });

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        backgroundColor: "#ffffff"
      });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imageData, "PNG", 0, 0, pageWidth, Math.min(imageHeight, pageHeight));
      pdf.save("cv-wallah-resume.pdf");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Live Preview</h2>
          <p className="text-sm text-slate-500">Updates instantly as you type.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="grid h-10 w-10 place-items-center rounded bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            title="Print"
            aria-label="Print"
          >
            <Printer size={18} />
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex h-10 items-center gap-2 rounded bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={18} />
            <span>{isExporting ? "Exporting" : "PDF"}</span>
          </button>
        </div>
      </div>
      <div className="overflow-auto pb-8">
        <PrintableCV ref={printRef} />
      </div>
    </div>
  );
};

export default CVPreview;
