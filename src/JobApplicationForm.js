import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import useForm from './useForm';
import useValidation from './useValidation';

const JobApplicationForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingFor: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false
    },
    preferredInterviewTime: ''
  };

  const { formData, handleChange, handleCheckboxChange, resetForm } = useForm(initialValues);
  const { errors, validate } = useValidation();
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(formData)) {
      setSubmittedData(formData);
      resetForm();
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>Job Application</Typography>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Applying for Position</InputLabel>
          <Select
            name="applyingFor"
            value={formData.applyingFor}
            onChange={handleChange}
          >
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Designer">Designer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </FormControl>
        {(formData.applyingFor === 'Developer' || formData.applyingFor === 'Designer') && (
          <TextField
            fullWidth
            label="Relevant Experience (years)"
            name="relevantExperience"
            type="number"
            value={formData.relevantExperience}
            onChange={handleChange}
            error={!!errors.relevantExperience}
            helperText={errors.relevantExperience}
            margin="normal"
          />
        )}
        {formData.applyingFor === 'Designer' && (
          <TextField
            fullWidth
            label="Portfolio URL"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
            error={!!errors.portfolioUrl}
            helperText={errors.portfolioUrl}
            margin="normal"
          />
        )}
        {formData.applyingFor === 'Manager' && (
          <TextField
            fullWidth
            label="Management Experience"
            name="managementExperience"
            value={formData.managementExperience}
            onChange={handleChange}
            error={!!errors.managementExperience}
            helperText={errors.managementExperience}
            margin="normal"
          />
        )}
        <FormControl component="fieldset" margin="normal">
          <Typography component="legend">Additional Skills</Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="JavaScript"
                checked={formData.additionalSkills.JavaScript}
                onChange={handleCheckboxChange}
              />
            }
            label="JavaScript"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="CSS"
                checked={formData.additionalSkills.CSS}
                onChange={handleCheckboxChange}
              />
            }
            label="CSS"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="Python"
                checked={formData.additionalSkills.Python}
                onChange={handleCheckboxChange}
              />
            }
            label="Python"
          />
          {errors.additionalSkills && <Typography color="error">{errors.additionalSkills}</Typography>}
        </FormControl>
        <TextField
          fullWidth
          label="Preferred Interview Time"
          name="preferredInterviewTime"
          type="datetime-local"
          value={formData.preferredInterviewTime}
          onChange={handleChange}
          error={!!errors.preferredInterviewTime}
          helperText={errors.preferredInterviewTime}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      {submittedData && (
        <Box mt={4}>
          <Typography variant="h6">Submitted Data:</Typography>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default JobApplicationForm;
