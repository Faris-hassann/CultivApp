import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import { getCategoryById, updateCategory } from '../../Services/Category';
import { useTheme } from '@mui/material';

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
    if (!formData?.name || formData.name.trim() === '') {
      newErrors.name = 'Category name is required';
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
      localStorage.setItem('categoryUpdated', 'true'); // ✅ Store flag
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
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4 text-center">Edit Category</h3>
        {submitError && <Alert variant="danger">{submitError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="name">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData?.name || ''}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  placeholder="Enter category name"
                  style={inputStyle}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Update Category
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default EditCategory;
