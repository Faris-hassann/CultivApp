import axiosInstance from './axiosInstance';

// ✅ Get all branches (authorized & role-sensitive)
export const getAllBranches = async () => {
  try {
    const response = await axiosInstance.get(`api/Branch/GetAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Branches:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

// ✅ Create branch (multipart/form-data)
export const createBranch = async (formData) => {
  try {
    const response = await axiosInstance.post(`api/Branch/Create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating branch:', error);
    throw error;
  }
};

// ✅ Get a branch by ID
export const getBranchById = async (id) => {
  try {
    const response = await axiosInstance.get(`api/Branch/GetBy/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching branch by ID:', error);
    throw error;
  }
};

// ✅ Update branch
export const updateBranch = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`api/Branch/Edit/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating branch:', error);
    throw error;
  }
};

// ✅ Delete branch
export const deleteBranch = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/Branch/Delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting branch:', error);
    throw error;
  }
};

// ✅ Get branches by SubCompanyID (not role-filtered, optional)
export const getBranchesBySubCompanyId = async (subCompanyId) => {
  try {
    const response = await axiosInstance.get(`api/Branch/GetBySubCompany/${subCompanyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching branches by SubCompanyID:', error);
    throw error;
  }
};
