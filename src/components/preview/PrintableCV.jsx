import { forwardRef } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { useCV } from "../../context/CVContext.jsx";

const ContactItem = ({ icon: Icon, value }) => {
  if (!value) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
      <Icon size={13} />
      <span className="break-all">{value}</span>
    </span>
  );
};

const PreviewSection = ({ title, children }) => {
  return (
    <section className="mt-5">
      <h3 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wide text-slate-900">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
};

const PrintableCV = forwardRef((_, ref) => {
  const { cvData } = useCV();
  const { personal, education, experience, skills, projects } = cvData;

  return (
    <article
      ref={ref}
      className="mx-auto min-h-[1123px] w-[794px] bg-white px-12 py-10 text-slate-900 shadow-paper"
    >
      <header className="border-b-2 border-slate-900 pb-5">
        <h1 className="text-3xl font-bold text-slate-950">
          {personal.name || "Your Name"}
        </h1>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          <ContactItem icon={Mail} value={personal.email} />
          <ContactItem icon={Phone} value={personal.phone} />
          <ContactItem icon={Linkedin} value={personal.linkedin} />
          <ContactItem icon={Github} value={personal.github} />
        </div>
      </header>

      <PreviewSection title="Education">
        <div className="space-y-3">
          {education.map((item, index) => (
            <div key={index} className="grid gap-0.5">
              <div className="flex items-start justify-between gap-5">
                <p className="font-semibold">{item.degree || "Degree"}</p>
                <p className="shrink-0 text-sm text-slate-500">{item.year || "Year"}</p>
              </div>
              <p className="text-sm text-slate-700">{item.school || "School / College"}</p>
              {item.grades ? <p className="text-sm text-slate-600">{item.grades}</p> : null}
            </div>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection title="Experience">
        <div className="space-y-4">
          {experience.map((item, index) => (
            <div key={index}>
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-semibold">{item.role || "Role"}</p>
                  <p className="text-sm text-slate-700">{item.company || "Company"}</p>
                </div>
                <p className="shrink-0 text-sm text-slate-500">
                  {item.duration || "Duration"}
                </p>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                {item.description || "Describe your responsibilities, results, and impact."}
              </p>
            </div>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection title="Skills">
        <div className="flex flex-wrap gap-2">
          {(skills.length ? skills : ["React", "Node.js", "MongoDB"]).map((skill) => (
            <span
              key={skill}
              className="rounded border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection title="Projects">
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index}>
              <p className="font-semibold">{project.title || "Project Title"}</p>
              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">
                {project.description || "Project description and measurable outcome."}
              </p>
              {project.techStack.length ? (
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Tech: {project.techStack.join(", ")}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </PreviewSection>
    </article>
  );
});

PrintableCV.displayName = "PrintableCV";

export default PrintableCV;
