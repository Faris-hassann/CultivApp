import axiosInstance from './axiosInstance'; // Assumes you exported axiosInstance from a shared file like 'axiosInstance.js'

// ✅ Fetch all subcompanies (authorized)
export const getAllSubCompanies = async () => {
  try {
    const response = await axiosInstance.get('api/SubCompany/GetAll');
    return response.data;
  } catch (error) {
    console.error('Error fetching subcompanies:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    throw error;
  }
};

// ✅ Create a new subcompany
export const createSubCompany = async (formData) => {
  try {
    const response = await axiosInstance.post('api/SubCompany/Create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating subcompany:', error);
    throw error;
  }
};

// ✅ Get subcompany by ID
export const getSubCompanyById = async (id) => {
  try {
    const response = await axiosInstance.get(`api/SubCompany/GetBy/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subcompany by ID:', error);
    throw error;
  }
};

// ✅ Update subcompany
export const updateSubCompany = async (id, companyData) => {
  try {
    const response = await axiosInstance.put(`api/SubCompany/Edit/${id}`, companyData);
    return response.data;
  } catch (error) {
    console.error('Error updating subcompany:', error);
    throw error;
  }
};

// ✅ Delete subcompany
export const deleteSubCompany = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/SubCompany/Delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting subcompany:', error);
    throw error;
  }
};

// ✅ Get subcompanies by category
export const getSubCompaniesByCategory = async (categoryName) => {
  try {
    const response = await axiosInstance.get(`api/SubCompany/GetByCategory/${encodeURIComponent(categoryName)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching subcompanies by category '${categoryName}':`, error);
    throw error;
  }
};

// ✅ Get subcompanies by company ID
export const getSubCompaniesByCompany = async (companyId) => {
  try {
    const response = await axiosInstance.get(`api/SubCompany/GetSubCompanyByCompany/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subcompanies by company ID:', error);
    throw error;
  }
};