import { useState } from 'react';

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const errors = {};

    if (!formData.fullName) errors.fullName = 'Full Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is not valid';
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone Number is required';
    if (formData.applyingFor === 'Developer' || formData.applyingFor === 'Designer') {
      if (!formData.relevantExperience) errors.relevantExperience = 'Relevant Experience is required';
      else if (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0) errors.relevantExperience = 'Experience must be a number greater than 0';
    }
    if (formData.applyingFor === 'Designer' && !formData.portfolioUrl) {
      errors.portfolioUrl = 'Portfolio URL is required';
    } else if (formData.portfolioUrl && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioUrl)) {
      errors.portfolioUrl = 'URL is not valid';
    }
    if (formData.applyingFor === 'Manager' && !formData.managementExperience) errors.managementExperience = 'Management Experience is required';
    if (!Object.values(formData.additionalSkills).includes(true)) errors.additionalSkills = 'At least one skill must be selected';
    if (!formData.preferredInterviewTime) errors.preferredInterviewTime = 'Preferred Interview Time is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
    errors,
    validate
  };
};

export default useValidation;
