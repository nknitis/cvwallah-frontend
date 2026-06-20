import { useCV } from "../../context/CVContext.jsx";
import { Field, SectionTitle } from "./FormControls.jsx";

const PersonalForm = () => {
  const { cvData, updatePersonal } = useCV();
  const personal = cvData.personal;

  return (
    <div className="space-y-4">
      <SectionTitle title="Personal Details" description="Basic identity and contact links." />
      <div className="grid gap-3">
        <Field
          label="Full Name"
          value={personal.name}
          onChange={(event) => updatePersonal("name", event.target.value)}
          placeholder="Nitish Kumar"
        />
        <Field
          label="Email"
          type="email"
          value={personal.email}
          onChange={(event) => updatePersonal("email", event.target.value)}
          placeholder="nitish@example.com"
        />
        <Field
          label="Phone"
          value={personal.phone}
          onChange={(event) => updatePersonal("phone", event.target.value)}
          placeholder="+91 98765 43210"
        />
        <Field
          label="LinkedIn"
          value={personal.linkedin}
          onChange={(event) => updatePersonal("linkedin", event.target.value)}
          placeholder="linkedin.com/in/nitish"
        />
        <Field
          label="GitHub"
          value={personal.github}
          onChange={(event) => updatePersonal("github", event.target.value)}
          placeholder="github.com/nitish"
        />
      </div>
    </div>
  );
};

export default PersonalForm;
