// ./utils/auth.js
// Save user data after login
export const saveAuth = ({ userId, userEmail, fullname, companyID, subCompanyID, branchID, role, token }) => {
  localStorage.setItem('userId', userId);
  localStorage.setItem('userEmail', userEmail);
  localStorage.setItem('fullname', fullname);
  localStorage.setItem('companyID', companyID);
  localStorage.setItem('subCompanyID', subCompanyID);
  localStorage.setItem('branchID', branchID);
  localStorage.setItem('userRole', role);
  localStorage.setItem('token', token);
};

// Retrieve saved auth data
export const getAuth = () => {
  return {
    userId: localStorage.getItem('userId'),
    role: localStorage.getItem('userRole'),
    fullname: localStorage.getItem('fullname'),
    companyID: localStorage.getItem('companyID'),
    subCompanyID: localStorage.getItem('subCompanyID'),
    branchID: localStorage.getItem('branchID'),
    token: localStorage.getItem('token')
  };
};

// Clear auth data on logout
export const clearAuth = () => {
  localStorage.clear();
};
