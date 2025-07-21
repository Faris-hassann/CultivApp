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
import {
  getAllSuppliers,
  deleteSupplier,
} from '../../Services/Supplier';

const columns = ['#', 'Supplier Name', 'Type of User', 'Created By', 'Created On'];

function SupplierPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(null); // 'created' | 'updated' | 'deleted'

  useEffect(() => {
    const created = localStorage.getItem('SupplierCreated');
    const updated = localStorage.getItem('SupplierUpdated');

    if (created === 'true') {
      setShowToast('created');
      localStorage.removeItem('SupplierCreated');
    } else if (updated === 'true') {
      setShowToast('updated');
      localStorage.removeItem('SupplierUpdated');
    }
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const result = await getAllSuppliers();
      const normalized = result.map((item, index) => ({
        id: item.id || item.ID,
        '#': index + 1,
        'Supplier Name': item.name || item.Name || 'N/A',
        'Type of User': item.typeofUserName || item.TypeofUserName || 'N/A',
        'Created By': item.createdBy || 'N/A',
        'Created On': item.createdON
          ? new Date(item.createdON).toLocaleString()
          : 'N/A',
      }));
      setSuppliers(normalized);
      setError(false);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleEdit = (row) => navigate(`/Supplier/Edit/${row.id}`);
  const handleDelete = async (row) => {
    const name = row['Supplier Name'] || 'this supplier';

    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: 'Are you sure you want to delete this supplier? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteSupplier(row.id);
        await fetchSuppliers();
        setShowToast('deleted');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete the supplier.', 'error');
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
          <Typography variant="h4">Suppliers</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/Supplier/Create')}
          >
            Add New Supplier
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
              data={suppliers}
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
              ? 'Supplier created successfully!'
              : showToast === 'updated'
              ? 'Supplier updated successfully!'
              : 'Supplier deleted successfully!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default SupplierPage;
