import axios from 'axios';
import BASE_URL from '../config';

// Fetch all Categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/Category/GetAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Categories:', error);
    throw error;
  }
};

// Post Company Data
export const createCategory = async (data) => {
  const response = await axios.post(`${BASE_URL}api/Category/Create`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};

// Get a single company by ID
export const getCategoryById = async (id) => {
  const response = await axios.get(`${BASE_URL}api/Category/GetBy/${id}`);
  return response.data;
};

// Update a company
export const updateCategory = async (id, data) => {
  const response = await axios.put(`${BASE_URL}api/Category/Edit/${id}`, data);
  return response.data;
};

// Delete a category by ID
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${BASE_URL}api/Category/Delete/${id}`);
  return response.data;
};