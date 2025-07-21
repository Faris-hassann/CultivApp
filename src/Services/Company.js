import axiosInstance from './axiosInstance';

// ✅ Get all Companies
export const getAllCompanies = async () => {
  try {
    const res = await axiosInstance.get('api/Company/GetAll');
    return res.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

// ✅ Create Company (with multipart/form-data)
export const createCompany = async (formData) => {
  try {
    const res = await axiosInstance.post('api/Company/Create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};

// ✅ Get Company by ID
export const getCompanyById = async (id) => {
  try {
    const res = await axiosInstance.get(`api/Company/GetBy/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching company ID ${id}:`, error);
    throw error;
  }
};

// ✅ Get Companies by Category Name
export const getCompaniesByCategory = async (categoryName) => {
  try {
    const res = await axiosInstance.get(`api/Company/GetByCategory/${encodeURIComponent(categoryName)}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching companies by category '${categoryName}':`, error);
    throw error;
  }
};

// ✅ Update Company
export const updateCompany = async (id, data) => {
  try {
    const res = await axiosInstance.put(`api/Company/Edit/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(`Error updating company ID ${id}:`, error);
    throw error;
  }
};

// ✅ Delete Company
export const deleteCompany = async (id) => {
  try {
    const res = await axiosInstance.delete(`api/Company/Delete/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting company ID ${id}:`, error);
    throw error;
  }
};