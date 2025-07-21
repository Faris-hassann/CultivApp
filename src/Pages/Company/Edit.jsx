import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { getCompanyById, updateCompany } from '../../Services/Company';
import { useTheme } from '@mui/material';

function EditCompany() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const company = await getCompanyById(id);
        setFormData(company);
      } catch (err) {
        setSubmitError('Error fetching company data');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCompany(id, formData);
      navigate('/Company');
    } catch (err) {
      setSubmitError('Failed to update company');
    }
  };

  const inputStyle = {
    backgroundColor: theme.palette.primary[400],
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary[400],
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <h3>Edit Company</h3>
      {submitError && <Alert variant="danger">{submitError}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                style={inputStyle}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Technology, Retail"
                style={inputStyle}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Add remaining fields similar to above (location, email, phoneNumber, etc.) */}

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter company description..."
                style={inputStyle}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

export default EditCompany;
