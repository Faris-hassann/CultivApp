import axios from 'axios';
import BASE_URL from '../config';

// Fetch all Categories
export const getAllFAQ = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/FAQ/GetAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Categories:', error);
    throw error;
  }
};

// Post Company Data
export const createFAQ = async (data) => {
  const response = await axios.post(`${BASE_URL}api/FAQ/Create`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};

// Get a single company by ID
export const getFAQById = async (id) => {
  const response = await axios.get(`${BASE_URL}api/FAQ/GetBy/${id}`);
  return response.data;
};

// Update a company
export const updateFAQ = async (id, data) => {
  const response = await axios.put(`${BASE_URL}api/FAQ/Edit/${id}`, data);
  return response.data;
};

// Delete a FAQ by ID
export const deleteFAQ = async (id) => {
  const response = await axios.delete(`${BASE_URL}api/FAQ/Delete/${id}`);
  return response.data;
};