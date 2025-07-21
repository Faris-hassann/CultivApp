import axiosInstance from './axiosInstance';

// ✅ Get all FAQs
export const getAllFAQ = async () => {
  try {
    const res = await axiosInstance.get('api/FAQ/GetAll');
    return res.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};

// ✅ Get FAQ by ID
export const getFAQById = async (id) => {
  try {
    const res = await axiosInstance.get(`api/FAQ/GetBy/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching FAQ ID ${id}:`, error);
    throw error;
  }
};

// ✅ Create FAQ
export const createFAQ = async (data) => {
  try {
    const res = await axiosInstance.post('api/FAQ/Create', data);
    return res.data;
  } catch (error) {
    console.error('Error creating FAQ:', error);
    throw error;
  }
};

// ✅ Update FAQ
export const updateFAQ = async (id, data) => {
  try {
    const res = await axiosInstance.put(`api/FAQ/Edit/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(`Error updating FAQ ID ${id}:`, error);
    throw error;
  }
};

// ✅ Delete FAQ
export const deleteFAQ = async (id) => {
  try {
    const res = await axiosInstance.delete(`api/FAQ/Delete/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting FAQ ID ${id}:`, error);
    throw error;
  }
};

// ✅ (Optional) Get only active FAQs (status === true)
export const getActiveFAQs = async () => {
  try {
    const res = await axiosInstance.get('api/FAQ/GetAllTrue');
    return res.data;
  } catch (error) {
    console.error('Error fetching active FAQs:', error);
    throw error;
  }
};
