import { FileText, RotateCcw } from "lucide-react";
import { useCV } from "../../context/CVContext.jsx";
import AtsScorePanel from "../ai/AtsScorePanel.jsx";
import RoastCvBox from "../ai/RoastCvBox.jsx";
import TailorCvModal from "../ai/TailorCvModal.jsx";
import EducationForm from "../forms/EducationForm.jsx";
import ExperienceForm from "../forms/ExperienceForm.jsx";
import PersonalForm from "../forms/PersonalForm.jsx";
import SkillsProjectsForm from "../forms/SkillsProjectsForm.jsx";
import CVPreview from "../preview/CVPreview.jsx";
import SidebarTabs from "./SidebarTabs.jsx";

const forms = {
  personal: <PersonalForm />,
  education: <EducationForm />,
  experience: <ExperienceForm />,
  skillsProjects: <SkillsProjectsForm />
};

const SplitScreenLayout = () => {
  const { activeStep, resetCvData } = useCV();

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[520px_1fr]">
        <section className="border-r border-slate-200 bg-white">
          <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded bg-slate-950 text-white">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <h1 className="truncate text-xl font-semibold text-slate-950">
                    CV Wallah
                  </h1>
                  <p className="text-sm text-slate-500">Pro CV Builder</p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetCvData}
                className="grid h-10 w-10 place-items-center rounded border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                title="Reset CV"
                aria-label="Reset CV"
              >
                <RotateCcw size={18} />
              </button>
            </div>
            <SidebarTabs />
          </div>

          <div className="space-y-5 px-5 py-5">
            {forms[activeStep]}
            <div className="grid gap-4">
              <AtsScorePanel />
              <TailorCvModal />
              <RoastCvBox />
            </div>
          </div>
        </section>

        <section className="min-h-screen bg-slate-100 px-4 py-6 sm:px-8">
          <CVPreview />
        </section>
      </div>
    </main>
  );
};

export default SplitScreenLayout;
