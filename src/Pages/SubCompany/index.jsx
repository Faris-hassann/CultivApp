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
import { getAllSubCompanies, deleteSubCompany } from '../../Services/SubCompany';

const columns = ['#', 'SubCompany Name', 'Location', 'Industry', 'Main Company'];

function SubCompanies() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(null); // 'created' | 'updated' | 'deleted'

  // Detect flag for creation/update from localStorage
  useEffect(() => {
    const created = localStorage.getItem('SubCompanyCreated');
    const updated = localStorage.getItem('SubCompanyUpdated');

    if (created === 'true') {
      setShowToast('created');
      localStorage.removeItem('SubCompanyCreated');
    } else if (updated === 'true') {
      setShowToast('updated');
      localStorage.removeItem('SubCompanyUpdated');
    }
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const result = await getAllSubCompanies();
      const normalized = result.map((c, index) => ({
        id: c.Id,
        '#': index + 1,
        'SubCompany Name': c.Name || c.SubCompanyName || 'N/A',
        Location: c.Location || 'N/A',
        Industry: c.Category || 'N/A',
        'Main Company': c.CompanyName
      }));
      setCompanies(normalized);
      setError(false);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleEdit = (row) => navigate(`/SubCompany/Edit/${row.id}`);
  const handleView = (row) => navigate(`/SubCompany/View/${row.id}`);

  const handleDelete = async (row) => {
    const SubCompanyName = row['SubCompany Name'] || 'this SubCompany';
    
    const result = await Swal.fire({
      title: `Delete ${SubCompanyName}?`,
      text: 'Are you sure you want to delete this SubCompany? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteSubCompany(row.id);
        await fetchCompanies();
        setShowToast('deleted');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete the SubCompany.', 'error');
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
          <Typography variant="h4">SubCompanies Data</Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/SubCompany/Create')}>
            Add New SubCompany
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
              data={companies}
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
              ? 'SubCompany created successfully!'
              : showToast === 'updated'
              ? 'SubCompany updated successfully!'
              : 'SubCompany deleted successfully!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default SubCompanies;
