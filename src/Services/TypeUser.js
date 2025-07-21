import axiosInstance from './axiosInstance'; // or wherever your axiosInstance is declared

// ✅ Get all TypeOfUsers
export const getAllTypeOfUsers = async () => {
  try {
    const res = await axiosInstance.get(`api/TypeOFUsers/GetAll`);
    return res.data;
  } catch (error) {
    console.error('Error fetching TypeOfUsers:', error);
    throw error;
  }
};

// ✅ Get TypeOfUser by ID
export const getTypeOfUserById = async (id) => {
  try {
    const res = await axiosInstance.get(`api/TypeOFUsers/GetById/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching TypeOfUser by ID:', error);
    throw error;
  }
};

// ✅ Create new TypeOfUser
export const createTypeOfUser = async (data) => {
  try {
    const res = await axiosInstance.post(`api/TypeOFUsers/Create`, data);
    return res.data;
  } catch (error) {
    console.error('Error creating TypeOfUser:', error);
    throw error;
  }
};

// ✅ Edit existing TypeOfUser
export const editTypeOfUser = async (id, data) => {
  try {
    const res = await axiosInstance.put(`api/TypeOFUsers/Edit/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Error editing TypeOfUser:', error);
    throw error;
  }
};

// ✅ Delete TypeOfUser
export const deleteTypeOfUser = async (id) => {
  try {
    const res = await axiosInstance.delete(`api/TypeOFUsers/Delete/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting TypeOfUser:', error);
    throw error;
  }
};
