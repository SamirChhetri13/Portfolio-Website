import axios from 'axios';
import { fallbackProjects } from '../data/projects';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Projects endpoints
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    return fallbackProjects;
  } catch (error) {
    console.warn('Backend unavailable, returning fallback static projects data:', error.message);
    return fallbackProjects;
  }
};

// Contact endpoint
export const submitContact = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      // Return express-validation error array
      throw {
        validationErrors: error.response.data.errors,
        message: 'Invalid input fields. Please correct them.'
      };
    }
    throw {
      message: error.response?.data?.message || 'Something went wrong. Please try again later.'
    };
  }
};

