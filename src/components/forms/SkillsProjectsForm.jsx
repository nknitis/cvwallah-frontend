import { useEffect, useState } from "react";
import { useCV } from "../../context/CVContext.jsx";
import { AddButton, Field, RemoveButton, SectionTitle, TextArea } from "./FormControls.jsx";

const emptyProject = {
  title: "",
  description: "",
  techStack: [],
  link: ""
};

const emptyCustomSection = {
  title: "",
  content: ""
};

const SkillsProjectsForm = () => {
  const {
    cvData,
    cvVersion,
    updateSkills,
    updateArrayItem,
    updateProjectTechStack,
    addArrayItem,
    removeArrayItem
  } = useCV();
  const [skillsText, setSkillsText] = useState(cvData.skills.join(", "));
  const [projectTechText, setProjectTechText] = useState(() =>
    cvData.projects.map((project) => project.techStack.join(", "))
  );

  useEffect(() => {
    setSkillsText(cvData.skills.join(", "));
    setProjectTechText(cvData.projects.map((project) => project.techStack.join(", ")));
  }, [cvVersion]);

  const handleSkillsChange = (value) => {
    setSkillsText(value);
    updateSkills(value);
  };

  const handleProjectTechStackChange = (index, value) => {
    setProjectTechText((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
    updateProjectTechStack(index, value);
  };

  const handleAddProject = () => {
    addArrayItem("projects", emptyProject);
    setProjectTechText((current) => [...current, ""]);
  };

  const handleRemoveProject = (index) => {
    removeArrayItem("projects", index);
    setProjectTechText((current) =>
      current.length === 1 ? current : current.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SectionTitle title="Skills" description="Comma-separated skills for quick rearranging." />
        <TextArea
          label="Skills"
          value={skillsText}
          onChange={(event) => handleSkillsChange(event.target.value)}
          onBlur={() => setSkillsText(cvData.skills.join(", "))}
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
                <RemoveButton onClick={() => handleRemoveProject(index)} />
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
                  label="Project Link"
                  value={project.link || ""}
                  onChange={(event) =>
                    updateArrayItem("projects", index, "link", event.target.value)
                  }
                  placeholder="https://github.com/username/project"
                />
                <Field
                  label="Tech Stack"
                  value={projectTechText[index] ?? project.techStack.join(", ")}
                  onChange={(event) =>
                    handleProjectTechStackChange(index, event.target.value)
                  }
                  onBlur={() =>
                    setProjectTechText((current) => {
                      const next = [...current];
                      next[index] = cvData.projects[index]?.techStack.join(", ") || "";
                      return next;
                    })
                  }
                  placeholder="React, Express, Gemini API"
                />
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={handleAddProject}>
          Add Project
        </AddButton>
      </div>

      <div className="space-y-4">
        <SectionTitle
          title="Additional Sections"
          description="Add custom sections like Achievements, Certifications, or Interests."
        />
        <div className="space-y-4">
          {cvData.customSections.map((section, index) => (
            <div key={index} className="rounded border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-700">Section {index + 1}</p>
                <RemoveButton onClick={() => removeArrayItem("customSections", index)} />
              </div>
              <div className="grid gap-3">
                <Field
                  label="Section Title"
                  value={section.title}
                  onChange={(event) =>
                    updateArrayItem("customSections", index, "title", event.target.value)
                  }
                  placeholder="Achievements"
                />
                <TextArea
                  label="Details"
                  value={section.content}
                  onChange={(event) =>
                    updateArrayItem("customSections", index, "content", event.target.value)
                  }
                  placeholder="Won first prize in hackathon, completed Google Cloud certification..."
                />
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={() => addArrayItem("customSections", emptyCustomSection)}>
          Add Section
        </AddButton>
      </div>
    </div>
  );
};

export default SkillsProjectsForm;
