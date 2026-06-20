import { createContext, useContext, useMemo, useState } from "react";
import { defaultCvData } from "../utils/defaultCvData.js";

const CVContext = createContext(null);

export const CVProvider = ({ children }) => {
  const [cvData, setCvData] = useState(defaultCvData);
  const [activeStep, setActiveStep] = useState("personal");

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
  };

  const resetCvData = () => {
    setCvData(defaultCvData);
    setActiveStep("personal");
  };

  const value = useMemo(
    () => ({
      cvData,
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
    [cvData, activeStep]
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
