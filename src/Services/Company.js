import axios from 'axios';
import BASE_URL from '../config';

// Fetch all companies
export const getAllCompanies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/Company/GetAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const createCompany = async (formData) => {
  console.log(formData);
  const response = await axios.post(`${BASE_URL}api/Company/Create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get a single company by ID
export const getCompanyById = async (id) => {
  const response = await axios.get(`${BASE_URL}api/Company/GetBy/${id}`);
  return response.data;
};

// Get companies by category
export const getCompaniesByCategory = async (categoryName) => {
  try {
    const response = await axios.get(`${BASE_URL}api/Company/GetByCategory/${encodeURIComponent(categoryName)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching companies by category '${categoryName}':`, error);
    throw error;
  }
};

// Update a company
export const updateCompany = async (id, companyData) => {
  const response = await axios.put(`${BASE_URL}api/Company/Edit/${id}`, companyData);
  return response.data;
};

// DELETE Company by ID
export const deleteCompany = async (id) => {
  return await axios.delete(`${BASE_URL}api/Company/Delete/${id}`);
};
