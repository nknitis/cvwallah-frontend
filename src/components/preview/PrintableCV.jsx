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

const hasText = (value) => String(value || "").trim().length > 0;

const hasFilledValues = (values) => {
  return values.some((value) => {
    if (Array.isArray(value)) {
      return value.some(hasText);
    }

    return hasText(value);
  });
};

const PrintableCV = forwardRef((_, ref) => {
  const { cvData } = useCV();
  const { personal, education, experience, skills, projects } = cvData;

  const visibleEducation = education.filter((item) =>
    hasFilledValues([item.degree, item.school, item.year, item.grades])
  );
  const visibleExperience = experience.filter((item) =>
    hasFilledValues([item.role, item.company, item.duration, item.description])
  );
  const visibleSkills = skills.filter(hasText);
  const visibleProjects = projects.filter((project) => {
    return hasFilledValues([
      project.title,
      project.description,
      project.link,
      project.techStack
    ]);
  });
  const visibleCustomSections = (cvData.customSections || []).filter((section) =>
    hasFilledValues([section.title, section.content])
  );

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

      {visibleEducation.length ? (
        <PreviewSection title="Education">
          <div className="space-y-3">
            {visibleEducation.map((item, index) => (
              <div key={index} className="grid gap-0.5">
                <div className="flex items-start justify-between gap-5">
                  {item.degree ? <p className="font-semibold">{item.degree}</p> : null}
                  {item.year ? (
                    <p className="shrink-0 text-sm text-slate-500">{item.year}</p>
                  ) : null}
                </div>
                {item.school ? (
                  <p className="text-sm text-slate-700">{item.school}</p>
                ) : null}
                {item.grades ? <p className="text-sm text-slate-600">{item.grades}</p> : null}
              </div>
            ))}
          </div>
        </PreviewSection>
      ) : null}

      {visibleExperience.length ? (
        <PreviewSection title="Experience">
          <div className="space-y-4">
            {visibleExperience.map((item, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    {item.role ? <p className="font-semibold">{item.role}</p> : null}
                    {item.company ? (
                      <p className="text-sm text-slate-700">{item.company}</p>
                    ) : null}
                  </div>
                  {item.duration ? (
                    <p className="shrink-0 text-sm text-slate-500">{item.duration}</p>
                  ) : null}
                </div>
                {item.description ? (
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                    {item.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </PreviewSection>
      ) : null}

      {visibleSkills.length ? (
        <PreviewSection title="Skills">
          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="rounded border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </PreviewSection>
      ) : null}

      {visibleProjects.length ? (
        <PreviewSection title="Projects">
          <div className="space-y-4">
            {visibleProjects.map((project, index) => (
              <div key={index}>
                {project.title ? <p className="font-semibold">{project.title}</p> : null}
                {project.description ? (
                  <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">
                    {project.description}
                  </p>
                ) : null}
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-xs font-medium text-slate-600 underline"
                  >
                    {project.link}
                  </a>
                ) : null}
                {project.techStack.length ? (
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Tech: {project.techStack.join(", ")}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </PreviewSection>
      ) : null}

      {visibleCustomSections.map((section, index) => (
        <PreviewSection key={index} title={section.title?.trim() || `Custom Section ${index + 1}`}>
          {section.content ? (
            <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
              {section.content}
            </p>
          ) : null}
        </PreviewSection>
      ))}
    </article>
  );
});

PrintableCV.displayName = "PrintableCV";

export default PrintableCV;
