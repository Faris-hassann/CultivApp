import axios from 'axios';
import BASE_URL from '../config';
import { saveAuth } from '../utils/auth';

// Axios instance with token and base config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add Authorization token automatically
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global errors (e.g., 401)
axiosInstance.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ------------------- API METHODS ------------------- //

export const getAllAccounts = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BASE_URL}api/Account/GetAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    // Normalize keys to camelCase
    return response.data.map(user => ({
      id: user.Id,
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.Email,
      phoneNumber: user.PhoneNumber,
      roles: user.Roles,
      companyID: user.CompanyID,
      subCompanyID: user.SubCompanyID,
      branchID: user.BranchID,
      createdOn: user.CreatedOn
    }));

  } catch (error) {
    console.error('Error fetching accounts:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = '/login';
    }

    throw error;
  }
};

// ✅ Get user by ID
export const getAccountById = async (id) => {
  try {
    const res = await axiosInstance.get(`api/Account/GetUserById/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// ✅ Create user
export const createAccount = async (formData) => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.post(`${BASE_URL}api/Account/Register`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000,
    });

    return res.data;
  } catch (error) {
    console.error('Error creating account:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    throw error;
  }
};

// ✅ Update user
export const updateAccount = async (id, formData) => {
  try {
    const res = await axiosInstance.put(`api/Account/EditUser/${id}`, formData);
    return res.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// ✅ Delete user
export const deleteAccount = async (id) => {
  try {
    const res = await axiosInstance.delete(`api/Account/DeleteUser/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// ✅ Get all roles
export const getAllRoles = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${BASE_URL}api/Account/GetRoles`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching roles:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = '/login';
    }

    throw error;
  }
};

// ✅ Login
export const loginUser = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post(`api/Account/Login`, { email, password });

    const { userId, email: userEmail, fullname, companyID, subCompanyID, branchID, role, token } = res.data;

    saveAuth({
      userId,
      userEmail,
      fullname,
      companyID,
      subCompanyID,
      branchID,
      role,
      token,
    });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// ✅ Google login
export const googleLogin = async (email) => {
  try {
    const res = await axiosInstance.post(`api/Account/GoogleLogin`, { email });

    const {
      userId,
      email: userEmail,
      fullname,
      companyID,
      subCompanyID,
      branchID,
      role,
      token
    } = res.data;

    saveAuth({
      userId,
      userEmail,
      fullname,
      companyID,
      subCompanyID,
      branchID,
      role,
      token,
    });

    return { success: true };
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

// ✅ Check if user is logged in
export const isAuthenticated = () => !!localStorage.getItem("token");