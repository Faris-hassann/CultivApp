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
import { getAllFAQ, deleteFAQ } from '../../Services/FAQ';

const columns = ['#', 'Questions', 'Answers'];

function FAQ() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [faqs, setfaqs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(null); // 'created' | 'updated' | 'deleted'

  useEffect(() => {
    const created = localStorage.getItem('faqCreated');
    const updated = localStorage.getItem('faqUpdated');

    if (created === 'true') {
      setShowToast('created');
      localStorage.removeItem('faqCreated');
    } else if (updated === 'true') {
      setShowToast('updated');
      localStorage.removeItem('faqUpdated');
    }
  }, []);

  const fetchfaqs = async () => {
    setLoading(true);
    try {
      const result = await getAllFAQ();
      const normalized = result.map((c, index) => ({
        id: c.Id,
        '#': index + 1,
        Questions: c.Question || 'N/A',
        Answers: c.Answer || 'N/A',
      }));

      setfaqs(normalized);
      setError(false);
    } catch (err) {
      console.error('Error fetching faqs:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchfaqs();
  }, []);

  const handleEdit = (row) => navigate(`/FAQ/Edit/${row.id}`);
  const handleView = (row) => navigate(`/FAQ/View/${row.id}`);

  const handleDelete = async (row) => {
    const faqName = row['faq Name'] || 'this faq';

    const result = await Swal.fire({
      title: `Delete ${faqName}?`,
      text: 'Are you sure you want to delete this faq? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteFAQ(row.id);
        await fetchfaqs();
        setShowToast('deleted');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete the faq.', 'error');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">FAQ Data</Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/FAQ/Create')}>
            Add New FAQ
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3, backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, borderRadius: 2, boxShadow: 1, p: 2 }}>
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
              data={faqs}
              actions={{
                onEdit: handleEdit,
                onView: handleView,
                onDelete: handleDelete,
              }}
              customRender={{
                Answers: (value) => <div dangerouslySetInnerHTML={{ __html: value }} />,
              }}
            />
          )}
        </Box>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(null)} show={!!showToast} bg="success" delay={10000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {showToast === 'created'
              ? 'FAQ Created Successfully!'
              : showToast === 'updated'
              ? 'FAQ Updated Successfully!'
              : 'FAQ Deleted Successfully!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default FAQ;
