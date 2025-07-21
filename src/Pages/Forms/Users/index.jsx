import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  useTheme,
  Alert,
  CircularProgress,
} from '@mui/material';
import DataTable from '../../../Components/Table';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Toast, ToastContainer } from 'react-bootstrap';
import {
  getAllUserForms,
  deleteUserForm,
} from '../../../Services/UserForms';

const columns = [
  '#',
  'Option Choice',
  'Status',
  'Created On',
  'Updated On',
];

function UserFormsPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [forms, setForms] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(null); // 'created' | 'updated' | 'deleted'

  useEffect(() => {
    const created = localStorage.getItem('UserFormCreated');
    const updated = localStorage.getItem('UserFormUpdated');

    if (created === 'true') {
      setShowToast('created');
      localStorage.removeItem('UserFormCreated');
    } else if (updated === 'true') {
      setShowToast('updated');
      localStorage.removeItem('UserFormUpdated');
    }
  }, []);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const result = await getAllUserForms();
      console.log(result);
      const normalized = result.map((item, index) => ({
        id: item.id || item.ID,
        '#': index + 1,
        'Option Choice': item.OptionChoice || 'N/A',
        'Status': item.Status || 'N/A',
        'Created On': item.CreatedOn
          ? new Date(item.CreatedOn).toLocaleString()
          : 'N/A',
        'Updated On': item.UpdatedOn
          ? new Date(item.UpdatedOn).toLocaleString()
          : 'N/A',
      }));
      setForms(normalized);
      setError(false);
    } catch (err) {
      console.error('Error fetching UserForms:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleEdit = (row) => navigate(`/User/Edit/${row.id}`);
  const handleDelete = async (row) => {
    const name = row['Option Choice'] || 'this form';

    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: 'Are you sure you want to delete this user form? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteUserForm(row.id);
        await fetchForms();
        setShowToast('deleted');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete the user form.', 'error');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4">User Forms</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/User/Create')}
          >
            Add New Form
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card
        sx={{
          mt: 3,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 1,
          p: 2,
        }}
      >
        <Box>
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress color="secondary" />
            </Box>
          ) : error ? (
            <Alert severity="error">Error in Fetching Data</Alert>
          ) : (
            <DataTable
              columns={columns}
              data={forms}
              actions={{
                onEdit: handleEdit,
                onDelete: handleDelete,
              }}
            />
          )}
        </Box>
      </Card>

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(null)}
          show={!!showToast}
          bg="success"
          delay={10000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {showToast === 'created'
              ? 'User Form created successfully!'
              : showToast === 'updated'
              ? 'User Form updated successfully!'
              : 'User Form deleted successfully!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default UserFormsPage;
