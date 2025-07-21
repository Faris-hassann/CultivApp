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
  CircularProgress
} from '@mui/material';
import DataTable from '../../Components/Table';
import { useNavigate } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '../../Services/Category';
import Swal from 'sweetalert2';
import { Toast, ToastContainer } from 'react-bootstrap';

const columns = ['#', 'Category Name'];

function Categories() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(null); // 'created' | 'updated' | 'deleted'

  // Detect toast flags from localStorage
  useEffect(() => {
    const created = localStorage.getItem('categoryCreated');
    const updated = localStorage.getItem('categoryUpdated');

    if (created === 'true') {
      setShowToast('created');
      localStorage.removeItem('categoryCreated');
    } else if (updated === 'true') {
      setShowToast('updated');
      localStorage.removeItem('categoryUpdated');
    }
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const result = await getAllCategories();
      const normalized = result.map((c, index) => ({
        id: c.Id,
        '#': index + 1,
        'Category Name': c.Name || c.categoryName || 'N/A',
      }));
      setCategories(normalized);
      setError(false);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (row) => navigate(`/Category/Edit/${row.id}`);
  const handleView = (row) => navigate(`/Category/View/${row.id}`);

  const handleDelete = async (row) => {
    const CategoryName = row['Category Name'] || 'this company';

    const result = await Swal.fire({
      title: `Delete Category ${CategoryName}?`,
      text: 'Are you sure you want to delete this category? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(row.id);
        await fetchCategories();
        setShowToast('deleted');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete the category.', 'error');
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
          <Typography variant="h4">Categories Data</Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/Category/Create')}>
            Add New Category
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
              data={categories}
              actions={{
                onEdit: handleEdit,
                onView: handleView,
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
              ? 'Category Created Successfully!'
              : showToast === 'updated'
              ? 'Category Updated Successfully!'
              : 'Category Deleted Successfully!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Categories;
