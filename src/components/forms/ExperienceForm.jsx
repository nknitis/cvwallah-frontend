import { useCV } from "../../context/CVContext.jsx";
import { AddButton, Field, RemoveButton, SectionTitle, TextArea } from "./FormControls.jsx";

const emptyExperience = {
  role: "",
  company: "",
  duration: "",
  description: ""
};

const ExperienceForm = () => {
  const { cvData, updateArrayItem, addArrayItem, removeArrayItem } = useCV();

  return (
    <div className="space-y-4">
      <SectionTitle title="Experience" description="Roles, companies, and impact bullets." />
      <div className="space-y-4">
        {cvData.experience.map((item, index) => (
          <div key={index} className="rounded border border-slate-200 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">Experience {index + 1}</p>
              <RemoveButton onClick={() => removeArrayItem("experience", index)} />
            </div>
            <div className="grid gap-3">
              <Field
                label="Role"
                value={item.role}
                onChange={(event) =>
                  updateArrayItem("experience", index, "role", event.target.value)
                }
                placeholder="Frontend Developer Intern"
              />
              <Field
                label="Company"
                value={item.company}
                onChange={(event) =>
                  updateArrayItem("experience", index, "company", event.target.value)
                }
                placeholder="Acme Technologies"
              />
              <Field
                label="Duration"
                value={item.duration}
                onChange={(event) =>
                  updateArrayItem("experience", index, "duration", event.target.value)
                }
                placeholder="Jan 2025 - Jun 2025"
              />
              <TextArea
                label="Description"
                value={item.description}
                onChange={(event) =>
                  updateArrayItem("experience", index, "description", event.target.value)
                }
                placeholder="Built responsive dashboards, improved load time by 30%, collaborated with backend teams..."
              />
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={() => addArrayItem("experience", emptyExperience)}>
        Add Experience
      </AddButton>
    </div>
  );
};

export default ExperienceForm;
