import { useCV } from "../../context/CVContext.jsx";
import { AddButton, Field, RemoveButton, SectionTitle, TextArea } from "./FormControls.jsx";

const emptyProject = {
  title: "",
  description: "",
  techStack: []
};

const SkillsProjectsForm = () => {
  const {
    cvData,
    updateSkills,
    updateArrayItem,
    updateProjectTechStack,
    addArrayItem,
    removeArrayItem
  } = useCV();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SectionTitle title="Skills" description="Comma-separated skills for quick rearranging." />
        <TextArea
          label="Skills"
          value={cvData.skills.join(", ")}
          onChange={(event) => updateSkills(event.target.value)}
          placeholder="React, Node.js, MongoDB, Tailwind CSS"
        />
      </div>

      <div className="space-y-4">
        <SectionTitle title="Projects" description="Portfolio projects with focused tech stacks." />
        <div className="space-y-4">
          {cvData.projects.map((project, index) => (
            <div key={index} className="rounded border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-700">Project {index + 1}</p>
                <RemoveButton onClick={() => removeArrayItem("projects", index)} />
              </div>
              <div className="grid gap-3">
                <Field
                  label="Title"
                  value={project.title}
                  onChange={(event) =>
                    updateArrayItem("projects", index, "title", event.target.value)
                  }
                  placeholder="CV Wallah"
                />
                <TextArea
                  label="Description"
                  value={project.description}
                  onChange={(event) =>
                    updateArrayItem("projects", index, "description", event.target.value)
                  }
                  placeholder="Built a live CV builder with AI-based tailoring and ATS scoring."
                />
                <Field
                  label="Tech Stack"
                  value={project.techStack.join(", ")}
                  onChange={(event) => updateProjectTechStack(index, event.target.value)}
                  placeholder="React, Express, Gemini API"
                />
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={() => addArrayItem("projects", emptyProject)}>
          Add Project
        </AddButton>
      </div>
    </div>
  );
};

export default SkillsProjectsForm;
