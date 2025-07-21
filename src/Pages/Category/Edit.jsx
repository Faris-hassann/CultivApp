import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner
} from 'react-bootstrap';
import {
  Card,
  Container,
  CardContent,
  Typography,
  useTheme
} from '@mui/material';
import { getCategoryById, updateCategory } from '../../Services/Category';

function EditCategory() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryById(id);
        setFormData(category);
      } catch (err) {
        setSubmitError('Error fetching category data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData?.Name || formData.Name.trim() === '') {
      newErrors.Name = 'Category Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await updateCategory(id, formData);
      localStorage.setItem('categoryUpdated', 'true');
      navigate('/Category');
    } catch (err) {
      setSubmitError('Failed to update category');
    }
  };

  const inputStyle = {
    backgroundColor: theme.palette.primary[400],
    color: 'black',
    borderColor: theme.palette.primary[400],
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

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
          <Typography variant="h4">Edit Category</Typography>
        </CardContent>
      </Card>

      {/* Form Card */}
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 3,
          marginTop: 3
        }}
      >
        <CardContent>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="name">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name" // Make sure this matches the property in your object
                    value={formData?.Name || ''}
                    onChange={handleChange}
                    isInvalid={!!errors.Name}
                    placeholder="Enter category name"
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Update Category
            </Button>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default EditCategory;