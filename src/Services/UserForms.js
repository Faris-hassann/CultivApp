import axiosInstance from './axiosInstance';

// ✅ Get all UserForms
export const getAllUserForms = async () => {
  try {
    const res = await axiosInstance.get('api/UserForms/GetAll');
    return res.data;
  } catch (error) {
    console.error('Error fetching UserForms:', error);
    throw error;
  }
};

// ✅ Get UserForm by ID
export const getUserFormById = async (id) => {
  try {
    const res = await axiosInstance.get(`api/UserForms/GetBy/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching UserForm ID ${id}:`, error);
    throw error;
  }
};

// ✅ Create UserForm
export const createUserForm = async (data) => {
  try {
    const res = await axiosInstance.post('api/UserForms/Create', data);
    return res.data;
  } catch (error) {
    console.error('Error creating UserForm:', error);
    throw error;
  }
};

// ✅ Edit UserForm
export const editUserForm = async (id, data) => {
  try {
    const res = await axiosInstance.put(`api/UserForms/Edit/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(`Error editing UserForm ID ${id}:`, error);
    throw error;
  }
};

// ✅ Delete UserForm
export const deleteUserForm = async (id) => {
  try {
    const res = await axiosInstance.delete(`api/UserForms/Delete/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting UserForm ID ${id}:`, error);
    throw error;
  }
};

// ✅ Get UserForms by Category and Supplier
export const getUserFormsByCategoryAndSupplier = async (categoryId, supplierId) => {
  try {
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId);
    if (supplierId) params.append('supplierId', supplierId);

    const res = await axiosInstance.get(`api/UserForms/ByCategoryAndSupplier?${params.toString()}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching filtered UserForms:', error);
    throw error;
  }
};

// ✅ Change Status (Approval)
export const changeUserFormStatus = async (id, newStatus) => {
  try {
    const res = await axiosInstance.put(`api/UserForms/Approval/${id}`, { status: newStatus });
    return res.data;
  } catch (error) {
    console.error(`Error updating status for UserForm ID ${id}:`, error);
    throw error;
  }
};