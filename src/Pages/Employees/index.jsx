import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import DataTable from '../../Components/Table';
import { useNavigate } from 'react-router-dom';
import { getAllAccounts, deleteAccount, isAuthenticated } from '../../Services/Employee';
import { Toast, ToastContainer } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Employees() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(null); // 'created', 'updated', or 'deleted'
    
  const columns = ['#', 'First Name', 'Last Name', 'Email', 'Phone'];

  useEffect(() => {
    if (!isAuthenticated()) navigate('/login');
  }, [navigate]);

  const fetchAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const Employees = await getAllAccounts();
      setAccounts(
        Employees.map((u, index) => ({
          id: u.id || u.Id || u.id || u.ID, // ✅ Capital fallback
          '#': index + 1,
          'First Name': u.firstName,
          'Last Name': u.lastName,
          'Email': u.email,
          'Phone': u.phoneNumber,
          companyID: u.companyID,
          subCompanyID: u.subCompanyID,
          branchID: u.branchID,
        }))
      );
    } catch (err) {
      console.error('Failed to fetch Employees:', err);
      setError('Failed to load Employees. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleEdit = (row) => {
    if (!row?.id) return console.warn('Missing ID for edit action');
    navigate(`/Employees/Edit/${row.id}`, {
      state: {
        EmployeeId: row.id,
        companyID: row.companyID,
        subCompanyID: row.subCompanyID,
        branchID: row.branchID,
      },
    });
  };

  const handleView = (row) => {
    if (!row?.id) return console.warn('Missing ID for view action');
    navigate(`/Employees/View/${row.id}`);
  };

  const handleDelete = async (row) => {
    const EmployeeName = row?.['First Name'] || 'this Employee';
    if (!row?.id) return Swal.fire('Error', 'Invalid Employee ID.', 'error');

    const result = await Swal.fire({
      title: `Delete Employee ${EmployeeName}?`,
      text: 'Are you sure you want to delete this Employee? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteAccount(row.id);
        await fetchAccounts();
        setShowToast('deleted');
      } catch (err) {
        console.error('Failed to delete Employee:', err);
        Swal.fire('Error', 'Failed to delete the Employee.', 'error');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 3,
          mb: 3,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            Employees Management
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/Employees/Create')}
            sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
          >
            Add New Employee
          </Button>
        </CardContent>
      </Card>

      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 1,
          p: 2,
        }}
      >
        <Box>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
              }}
            >
              <CircularProgress size={60} />
            </Box>
          ) : (
            <DataTable
              columns={columns}
              data={accounts}
              actions={{
                onEdit: handleEdit,
                onView: handleView,
                onDelete: handleDelete,
              }}
              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none',
                },
              }}
            />
          )}
        </Box>
      </Card>

      {/* Snackbar Toast */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          onClose={() => setShowToast(null)}
          show={!!showToast}
          delay={5000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {showToast === 'created'
              ? 'Employee Created Successfully!'
              : showToast === 'updated'
                ? 'Employee Updated Successfully!'
                : 'Employee Deleted Successfully!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Employees;
