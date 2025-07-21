import React, { useState, createContext } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { ColorModeContext, useMode } from './theme';

// Landing Pages (Public)
import Home from './Pages/Home';
import ExternalFAQ from './Pages/ExternalFAQ';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import NotFound from './Pages/NotFound';

// User Dashboard (Private)
import UserDashboard from './Pages/External/Dashboard';
import Profile from './Pages/Profile';
import HistoryPage from './Pages/External/HistoryPage';

// Global Managerale Dashboard Components
import Topbar from "./Components/Topbar";
import Sidebar from './Components/Sidebar';
import ProtectedRoute from './Components/ProtectedRoute';

// Pages
import Dashboard from './Pages/Dashboard';

// Users
import Employees from './Pages/Employees';
import CreateEmployee from './Pages/Employees/Create';
import EditEmployee from './Pages/Employees/Edit';
import ViewEmployee from './Pages/Employees/View';

// Category
import Category from './Pages/Category';
import CreateCategory from './Pages/Category/Create';
import EditCategory from './Pages/Category/Edit';
import ViewCategory from './Pages/Category/View';

// Company
import Company from './Pages/Company';
import CreateCompany from './Pages/Company/Create';
import EditCompany from './Pages/Company/Edit';
import ViewCompany from './Pages/Company/View';

// SubCompany
import SubCompany from './Pages/SubCompany';
import CreateSubCompany from './Pages/SubCompany/Create';
import EditSubCompany from './Pages/SubCompany/Edit';
import ViewSubCompany from './Pages/SubCompany/View';

// Branch
import Branches from './Pages/Branch';
import CreateBranch from './Pages/Branch/Create';
import EditBranch from './Pages/Branch/Edit';
import ViewBranch from './Pages/Branch/View';

// FAQ
import FAQ from './Pages/FAQ';
import CreateFAQ from './Pages/FAQ/Create';
import EditFAQ from './Pages/FAQ/Edit';
import ViewFAQ from './Pages/FAQ/View';

// Forms
import Forms from './Pages/Forms';

// User In Forms
import User from './Pages/Forms/Users';
import CreateUser from './Pages/Forms/Users/Create';
import EditUser from './Pages/Forms/Users/Edit';
import ViewUser from './Pages/Forms/Users/View';
import ApprovalUser from './Pages/Forms/Users/Approval';

// Side Users Data
// Type of User
import TypeUser from './Pages/Type';
import CreateTypeUser from './Pages/Type/Create';
import EditTypeUser from './Pages/Type/Edit';

// Supplier
import Supplier from './Pages/Supplier';
import CreateSupplier from './Pages/Supplier/Create';
import EditSupplier from './Pages/Supplier/Edit';

// Members
import Members from './Pages/Members';

// Legal Pages
import PrivacyTerms from './Pages/PrivacyTerms';

export const ToastContext = createContext();

function AppLayout() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Outlet /> {/* This will render nested routes */}
      </main>
    </div>
  );
}

function AuthLayout() {
  return (
    <main className="content">
      <Outlet />
    </main>
  );
}

function App() {
  const [theme, colorMode] = useMode();
  const [toast, setToast] = useState({ show: false, title: '', message: '' });

  const showToast = (title, message) => {
    setToast({ show: true, title, message });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContext.Provider value={showToast}>
          <Routes>
            {/* Auth Routes - No sidebar/topbar */}
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/Signin" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/ExternalFAQ" element={<ExternalFAQ />} />
            </Route>

            {/* External Dashboard */}
            <Route path="/UserDashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/FormHistory" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />

            {/* Main Layout - With sidebar/topbar */}
            <Route element={<AppLayout />}>
              {/* Dashboard */}
              <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

              {/* Users */}
              <Route path="/Employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
              <Route path="/Employees/Create" element={<ProtectedRoute><CreateEmployee /></ProtectedRoute>} />
              <Route path="/Employees/Edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
              <Route path="/Employees/View/:id" element={<ProtectedRoute><ViewEmployee /></ProtectedRoute>} />

              {/* Category */}
              <Route path="/Category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
              <Route path="/Category/Create" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
              <Route path="/Category/Edit/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />
              <Route path="/Category/View/:id" element={<ProtectedRoute><ViewCategory /></ProtectedRoute>} />

              {/* Company */}
              <Route path="/Company" element={<ProtectedRoute><Company /></ProtectedRoute>} />
              <Route path="/Company/Create" element={<ProtectedRoute><CreateCompany /></ProtectedRoute>} />
              <Route path="/Company/Edit/:id" element={<ProtectedRoute><EditCompany /></ProtectedRoute>} />
              <Route path="/Company/View/:id" element={<ProtectedRoute><ViewCompany /></ProtectedRoute>} />

              {/* SubCompany */}
              <Route path="/SubCompany" element={<ProtectedRoute><SubCompany /></ProtectedRoute>} />
              <Route path="/SubCompany/Create" element={<ProtectedRoute><CreateSubCompany /></ProtectedRoute>} />
              <Route path="/SubCompany/Edit/:id" element={<ProtectedRoute><EditSubCompany /></ProtectedRoute>} />
              <Route path="/SubCompany/View/:id" element={<ProtectedRoute><ViewSubCompany /></ProtectedRoute>} />

              {/* Branch */}
              <Route path="/Branches" element={<ProtectedRoute><Branches /></ProtectedRoute>} />
              <Route path="/Branch/Create" element={<ProtectedRoute><CreateBranch /></ProtectedRoute>} />
              <Route path="/Branch/Edit/:id" element={<ProtectedRoute><EditBranch /></ProtectedRoute>} />
              <Route path="/Branch/View/:id" element={<ProtectedRoute><ViewBranch /></ProtectedRoute>} />

              {/* FAQ */}
              <Route path="/FAQ" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
              <Route path="/FAQ/Create" element={<ProtectedRoute><CreateFAQ /></ProtectedRoute>} />
              <Route path="/FAQ/Edit/:id" element={<ProtectedRoute><EditFAQ /></ProtectedRoute>} />
              <Route path="/FAQ/View/:id" element={<ProtectedRoute><ViewFAQ /></ProtectedRoute>} />

              {/* Forms */}
              <Route path="/Forms" element={<ProtectedRoute><Forms /></ProtectedRoute>} />

              {/* Users In Forms */}
              <Route path="/Users" element={<ProtectedRoute><User /></ProtectedRoute>} />
              <Route path="/Users/Create" element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
              <Route path="/Users/Edit:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
              <Route path="/Users/View:id" element={<ProtectedRoute><ViewUser /></ProtectedRoute>} />
              <Route path="/Users/Approval:id" element={<ProtectedRoute><ApprovalUser /></ProtectedRoute>} />

              {/* TypeUser */}
              <Route path="/TypeUser" element={<ProtectedRoute><TypeUser /></ProtectedRoute>} />
              <Route path="/TypeUser/Create" element={<ProtectedRoute><CreateTypeUser /></ProtectedRoute>} />
              <Route path="/TypeUser/Edit/:id" element={<ProtectedRoute><EditTypeUser /></ProtectedRoute>} />

              {/* Supplier */}
              <Route path="/Supplier" element={<ProtectedRoute><Supplier /></ProtectedRoute>} />
              <Route path="/Supplier/Create" element={<ProtectedRoute><CreateSupplier /></ProtectedRoute>} />
              <Route path="/Supplier/Edit/:id" element={<ProtectedRoute><EditSupplier /></ProtectedRoute>} />

              {/* Members */}
              <Route path="/Members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
            </Route>

            {/* Legal Pages - Public Access */}
            <Route path="/privacy-terms" element={<PrivacyTerms />} />

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
            <Toast show={toast.show} onClose={() => setToast((prev) => ({ ...prev, show: false }))} bg="light">
              <Toast.Header>
                <strong className="me-auto">{toast.title}</strong>
                <small>now</small>
              </Toast.Header>
              <Toast.Body>{toast.message}</Toast.Body>
            </Toast>
          </ToastContainer>
        </ToastContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
