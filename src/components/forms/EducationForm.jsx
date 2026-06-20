import { useCV } from "../../context/CVContext.jsx";
import { AddButton, Field, RemoveButton, SectionTitle } from "./FormControls.jsx";

const emptyEducation = {
  degree: "",
  school: "",
  year: "",
  grades: ""
};

const EducationForm = () => {
  const { cvData, updateArrayItem, addArrayItem, removeArrayItem } = useCV();

  return (
    <div className="space-y-4">
      <SectionTitle title="Education" description="Degrees, institutes, and academic details." />
      <div className="space-y-4">
        {cvData.education.map((item, index) => (
          <div key={index} className="rounded border border-slate-200 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">Education {index + 1}</p>
              <RemoveButton onClick={() => removeArrayItem("education", index)} />
            </div>
            <div className="grid gap-3">
              <Field
                label="Degree"
                value={item.degree}
                onChange={(event) =>
                  updateArrayItem("education", index, "degree", event.target.value)
                }
                placeholder="B.Tech in Computer Science"
              />
              <Field
                label="School / College"
                value={item.school}
                onChange={(event) =>
                  updateArrayItem("education", index, "school", event.target.value)
                }
                placeholder="Delhi Technological University"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Year"
                  value={item.year}
                  onChange={(event) =>
                    updateArrayItem("education", index, "year", event.target.value)
                  }
                  placeholder="2021 - 2025"
                />
                <Field
                  label="Grades"
                  value={item.grades}
                  onChange={(event) =>
                    updateArrayItem("education", index, "grades", event.target.value)
                  }
                  placeholder="8.7 CGPA"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddButton onClick={() => addArrayItem("education", emptyEducation)}>
        Add Education
      </AddButton>
    </div>
  );
};

export default EducationForm;
