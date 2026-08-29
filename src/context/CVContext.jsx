import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultCvData } from "../utils/defaultCvData.js";

const CVContext = createContext(null);
const CV_STORAGE_KEY = "cv-wallah-data";

const mergeWithDefaultCvData = (savedData) => ({
  ...defaultCvData,
  ...savedData,
  personal: {
    ...defaultCvData.personal,
    ...(savedData?.personal || {})
  },
  education: savedData?.education?.length ? savedData.education : defaultCvData.education,
  experience: savedData?.experience?.length ? savedData.experience : defaultCvData.experience,
  skills: Array.isArray(savedData?.skills) ? savedData.skills : defaultCvData.skills,
  projects: savedData?.projects?.length ? savedData.projects : defaultCvData.projects,
  customSections: Array.isArray(savedData?.customSections)
    ? savedData.customSections
    : defaultCvData.customSections
});

const getInitialCvData = () => {
  try {
    const savedData = localStorage.getItem(CV_STORAGE_KEY);
    return savedData ? mergeWithDefaultCvData(JSON.parse(savedData)) : defaultCvData;
  } catch {
    return defaultCvData;
  }
};

export const CVProvider = ({ children }) => {
  const [cvData, setCvData] = useState(getInitialCvData);
  const [activeStep, setActiveStep] = useState("personal");
  const [cvVersion, setCvVersion] = useState(0);

  useEffect(() => {
    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  const updatePersonal = (field, value) => {
    setCvData((current) => ({
      ...current,
      personal: {
        ...current.personal,
        [field]: value
      }
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setCvData((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section, emptyItem) => {
    setCvData((current) => ({
      ...current,
      [section]: [...current[section], emptyItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setCvData((current) => ({
      ...current,
      [section]:
        current[section].length === 1
          ? current[section]
          : current[section].filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const updateSkills = (skillsText) => {
    const skills = skillsText
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    setCvData((current) => ({ ...current, skills }));
  };

  const updateProjectTechStack = (index, techStackText) => {
    const techStack = techStackText
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);

    updateArrayItem("projects", index, "techStack", techStack);
  };

  const replaceCvData = (nextCvData) => {
    setCvData(nextCvData);
    setCvVersion((current) => current + 1);
  };

  const resetCvData = () => {
    localStorage.removeItem(CV_STORAGE_KEY);
    setCvData(defaultCvData);
    setActiveStep("personal");
    setCvVersion((current) => current + 1);
  };

  const value = useMemo(
    () => ({
      cvData,
      cvVersion,
      activeStep,
      setActiveStep,
      updatePersonal,
      updateArrayItem,
      addArrayItem,
      removeArrayItem,
      updateSkills,
      updateProjectTechStack,
      replaceCvData,
      resetCvData
    }),
    [cvData, cvVersion, activeStep]
  );

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};

export const useCV = () => {
  const context = useContext(CVContext);

  if (!context) {
    throw new Error("useCV must be used inside CVProvider.");
  }

  return context;
};
