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
import DataTable from '../../Components/Table';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Toast, ToastContainer } from 'react-bootstrap';
import { getAllTypeOfUsers, deleteTypeOfUser } from '../../Services/TypeUser';
import LoadingModal from '../../Components/LoadingModal';

const columns = ['#', 'Type Name', 'Created On'];

function TypeOfUserPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [types, setTypes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(null); // 'created' | 'updated' | 'deleted'
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const created = localStorage.getItem('TypeOfUserCreated');
    const updated = localStorage.getItem('TypeOfUserUpdated');

    if (created === 'true') {
      setShowToast('created');
      localStorage.removeItem('TypeOfUserCreated');
    } else if (updated === 'true') {
      setShowToast('updated');
      localStorage.removeItem('TypeOfUserUpdated');
    }
  }, []);

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const result = await getAllTypeOfUsers();
      const normalized = result.map((item, index) => ({
        id: item.id || item.ID,
        '#': index + 1,
        'Type Name': item.name || item.Name || 'N/A',
        'Created On': item.createdON
          ? new Date(item.createdON).toLocaleString()
          : 'N/A',
      }));
      setTypes(normalized);
      setError(false);
    } catch (err) {
      console.error('Error fetching TypeOfUsers:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleEdit = (row) => navigate(`/TypeUser/Edit/${row.id}`);
  const handleDelete = async (row) => {
    const name = row['Type Name'] || 'this type';

    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: 'Are you sure you want to delete this user type? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      setModalLoading(true);
      try {
        await deleteTypeOfUser(row.id);
        await fetchTypes();
        setShowToast('deleted');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete the user type.', 'error');
      } finally {
        setModalLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <LoadingModal open={modalLoading} message="Processing, please wait..." />
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
          <Typography variant="h4">Type of Users</Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/TypeUser/Create')}>
            Add New Type
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card
        sx={{
          mt: 3,
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          color: theme.palette.text.primary,
          borderRadius: 3,
          boxShadow: 2,
          p: 3,
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
              data={types}
              actions={{
                onEdit: handleEdit,
                onDelete: handleDelete,
              }}
              customRender={{}}
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
              ? 'Type of User created successfully!'
              : showToast === 'updated'
              ? 'Type of User updated successfully!'
              : 'Type of User deleted successfully!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default TypeOfUserPage;
