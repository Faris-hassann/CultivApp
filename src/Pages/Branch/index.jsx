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
import { getAllBranches, deleteBranch } from '../../Services/Branch';

const columns = ['#', 'Branch Name', 'Location', 'Industry'];

function Branches() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [Branches, setBranches] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(null); // 'created' | 'updated' | 'deleted'

  // Detect flag for creation/update from localStorage
  useEffect(() => {
    const created = localStorage.getItem('BranchCreated');
    const updated = localStorage.getItem('BranchUpdated');

    if (created === 'true') {
      setShowToast('created');
      localStorage.removeItem('BranchCreated');
    } else if (updated === 'true') {
      setShowToast('updated');
      localStorage.removeItem('BranchUpdated');
    }
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const result = await getAllBranches();
      const normalized = result.map((c, index) => ({
        id: c.Id,
        '#': index + 1,
        'Branch Name': c.Name || c.BranchName || 'N/A',
        Location: c.Location || 'N/A',
        Industry: c.Category || 'N/A',
      }));
      setBranches(normalized);
      setError(false);
    } catch (err) {
      console.error('Error fetching Branches:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleEdit = (row) => navigate(`/Branch/Edit/${row.id}`);
  const handleView = (row) => navigate(`/Branch/View/${row.id}`);

  const handleDelete = async (row) => {
    const BranchName = row['Branch Name'] || 'this Branch';
    
    const result = await Swal.fire({
      title: `Delete ${BranchName}?`,
      text: 'Are you sure you want to delete this Branch? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteBranch(row.id);
        await fetchBranches();
        setShowToast('deleted');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete the Branch.', 'error');
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
          <Typography variant="h4">Branches Data</Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/Branch/Create')}>
            Add New Branch
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
              data={Branches}
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
              ? 'Branch created successfully!'
              : showToast === 'updated'
              ? 'Branch updated successfully!'
              : 'Branch deleted successfully!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Branches;
