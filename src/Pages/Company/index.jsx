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
import { getAllCompanies, deleteCompany } from '../../Services/Company';

const columns = ['#', 'Company Name', 'Location', 'Industry'];

function Companies() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(null); // 'created' | 'updated' | 'deleted'

  // Detect flag for creation/update from localStorage
  useEffect(() => {
    const created = localStorage.getItem('companyCreated');
    const updated = localStorage.getItem('companyUpdated');

    if (created === 'true') {
      setShowToast('created');
      localStorage.removeItem('companyCreated');
    } else if (updated === 'true') {
      setShowToast('updated');
      localStorage.removeItem('companyUpdated');
    }
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const result = await getAllCompanies();
      const normalized = result.map((c, index) => ({
        id: c.Id,
        '#': index + 1,
        'Company Name': c.Name || c.companyName || 'N/A',
        Location: c.Location || 'N/A',
        Industry: c.Category || 'N/A',
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

  const handleEdit = (row) => navigate(`/Company/Edit/${row.id}`);
  const handleView = (row) => navigate(`/Company/View/${row.id}`);

  const handleDelete = async (row) => {
    const companyName = row['Company Name'] || 'this company';
    
    const result = await Swal.fire({
      title: `Delete ${companyName}?`,
      text: 'Are you sure you want to delete this company? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteCompany(row.id);
        await fetchCompanies();
        setShowToast('deleted');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete the company.', 'error');
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
          <Typography variant="h4">Companies Data</Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/Company/Create')}>
            Add New Company
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
              ? 'Company created successfully!'
              : showToast === 'updated'
              ? 'Company updated successfully!'
              : 'Company deleted successfully!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Companies;
