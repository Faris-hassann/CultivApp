import axiosInstance from './axiosInstance';

// ✅ Get all Categories
export const getAllCategories = async () => {
  try {
    const res = await axiosInstance.get('api/Category/GetAll');
    return res.data;
  } catch (error) {
    console.error('Error fetching Categories:', error);
    throw error;
  }
};

// ✅ Get Category by ID
export const getCategoryById = async (id) => {
  try {
    const res = await axiosInstance.get(`api/Category/GetBy/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(`Error fetching Category ID ${id}:`, error);
    throw error;
  }
};

// ✅ Create Category
export const createCategory = async (data) => {
  try {
    const res = await axiosInstance.post('api/Category/Create', data);
    return res.data;
  } catch (error) {
    console.error('Error creating Category:', error);
    throw error;
  }
};

// ✅ Update Category
export const updateCategory = async (id, data) => {
  try {
    const res = await axiosInstance.put(`api/Category/Edit/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(`Error updating Category ID ${id}:`, error);
    throw error;
  }
};

// ✅ Delete Category
export const deleteCategory = async (id) => {
  try {
    const res = await axiosInstance.delete(`api/Category/Delete/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting Category ID ${id}:`, error);
    throw error;
  }
};

// ✅ Get Categories where Status == true
export const getTrueCategories = async () => {
  try {
    const res = await axiosInstance.get('api/Category/GetAllTrue');
    return res.data;
  } catch (error) {
    console.error('Error fetching true Categories:', error);
    throw error;
  }
};
