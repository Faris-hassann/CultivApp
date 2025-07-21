import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFAQById } from '../../Services/FAQ';
import {
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';

function ViewFAQ() {
  const { id } = useParams();
  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const data = await getFAQById(id);
        setFaq(data);
      } catch (error) {
        console.error('Error fetching FAQ:', error);
        setError('Failed to load FAQ data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQ();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!faq) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ backgroundColor: 'background.default', borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            FAQ Details
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Question:
          </Typography>
          <Typography variant="body1" color="text.primary">
            {faq.Question}
          </Typography>

          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            Answer:
          </Typography>
          <Typography
            variant="body1"
            component="div"
            color="text.primary"
            dangerouslySetInnerHTML={{ __html: faq.Answer }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default ViewFAQ;
