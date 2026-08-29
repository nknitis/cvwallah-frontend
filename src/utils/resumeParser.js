const normalizeText = (value) => (value || "").toString().trim();

const normalizeUrl = (value) => {
  const text = normalizeText(value);
  if (!text) return "";

  if (/^https?:\/\//i.test(text)) return text;
  return `https://${text}`;
};

const parseSkills = (rawText) => {
  return rawText
    .split(/,|\n|\|/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);
};

const parseProjects = (rawText) => {
  const lines = rawText
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line) => ({
    title: line,
    description: "",
    techStack: [],
    link: ""
  }));
};

export const parseResumeText = (rawText) => {
  const text = normalizeText(rawText);
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);

  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  const phone = text.match(/(?:\+?\d[\d\s-]{8,}\d)/)?.[0] || "";
  const linkedIn = text.match(/https?:\/\/[^\s]+linkedin[^\s]*/i)?.[0] || "";
  const github = text.match(/https?:\/\/[^\s]+github[^\s]*/i)?.[0] || "";

  const nameLine = lines.find((line) => !/[\d@.]/.test(line) && line.split(/\s+/).length >= 2) || "";
  const skillsText = lines.find((line) => /skill|technolog|framework|tool/i.test(line)) || "";
  const projectsText = lines.filter((line) => /project|portfolio|github|repo/i.test(line)).join("\n");

  const educationItems = lines
    .filter((line) => /b\.tech|btech|b\.e|be|mba|mca|bca|degree|college|university|school|institute/i.test(line))
    .map((line) => ({
      degree: line,
      school: line,
      year: "",
      grades: ""
    }));

  const experienceItems = lines
    .filter((line) => /developer|engineer|intern|manager|analyst|designer|consultant|lead/i.test(line))
    .map((line) => ({
      role: line,
      company: "",
      duration: "",
      description: ""
    }));

  const projects = projectsText ? parseProjects(projectsText) : [];
  const skills = skillsText ? parseSkills(skillsText.replace(/skill(s)?/i, "")) : [];

  return {
    personal: {
      name: normalizeText(nameLine),
      email,
      phone,
      linkedin: linkedIn ? normalizeUrl(linkedIn) : "",
      github: github ? normalizeUrl(github) : ""
    },
    education: educationItems.length ? educationItems : [
      {
        degree: "",
        school: "",
        year: "",
        grades: ""
      }
    ],
    experience: experienceItems.length ? experienceItems : [
      {
        role: "",
        company: "",
        duration: "",
        description: ""
      }
    ],
    skills,
    projects,
    customSections: []
  };
};
