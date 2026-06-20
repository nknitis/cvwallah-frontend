import { BriefcaseBusiness, Code2, GraduationCap, UserRound } from "lucide-react";
import { useCV } from "../../context/CVContext.jsx";

const tabs = [
  { id: "personal", label: "Personal", icon: UserRound },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "skillsProjects", label: "Skills & Projects", icon: Code2 }
];

const SidebarTabs = () => {
  const { activeStep, setActiveStep } = useCV();

  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeStep === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveStep(tab.id)}
            className={`flex h-11 items-center justify-center gap-2 rounded border px-3 text-sm font-medium transition ${
              isActive
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Icon size={16} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SidebarTabs;
