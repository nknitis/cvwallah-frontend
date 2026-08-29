const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const postJson = async (endpoint, body) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
};

const postFormData = async (endpoint, formData) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
};

export const getAtsScore = (cvData) => {
  return postJson("/ats-score", { cvData });
};

export const tailorCv = (cvData, jobDescription) => {
  return postJson("/tailor-cv", { cvData, jobDescription });
};

export const importResumeText = (resumeText) => {
  return postJson("/import-resume", { resumeText });
};

export const extractPdfText = (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  return postFormData("/extract-pdf", formData);
};

export const roastCv = (cvData) => {
  return postJson("/roast-cv", { cvData });
};
