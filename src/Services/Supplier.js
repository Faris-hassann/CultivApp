import axiosInstance from './axiosInstance';

// ✅ Get all suppliers
export const getAllSuppliers = async () => {
  try {
    const res = await axiosInstance.get('api/Supplier/GetAll');
    return res.data;
  } catch (error) {
    console.error('Error fetching all suppliers:', error);
    throw error;
  }
};

// ✅ Get supplier by ID
export const getSupplierById = async (id) => {
  try {
    const res = await axiosInstance.get(`api/Supplier/GetBy/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching supplier by ID (${id}):`, error);
    throw error;
  }
};

// ✅ Create new supplier
export const createSupplier = async (data) => {
  try {
    const res = await axiosInstance.post('api/Supplier/Create', data);
    return res.data;
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
};

// ✅ Edit existing supplier
export const editSupplier = async (id, data) => {
  try {
    const res = await axiosInstance.put(`api/Supplier/Edit/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(`Error editing supplier with ID ${id}:`, error);
    throw error;
  }
};

// ✅ Delete supplier
export const deleteSupplier = async (id) => {
  try {
    const res = await axiosInstance.delete(`api/Supplier/Delete/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting supplier with ID ${id}:`, error);
    throw error;
  }
};

// ✅ Get suppliers by TypeOfUser ID
export const getSuppliersByTypeofUser = async (typeId) => {
  try {
    const res = await axiosInstance.get(`api/Supplier/ByTypeofUser/${typeId}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching suppliers by TypeOfUser ID (${typeId}):`, error);
    throw error;
  }
};
