import { useState } from 'react';

const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      additionalSkills: {
        ...prev.additionalSkills,
        [name]: checked
      }
    }));
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  return {
    formData,
    handleChange,
    handleCheckboxChange,
    resetForm
  };
};

export default useForm;
