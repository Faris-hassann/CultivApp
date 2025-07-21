import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from 'react-bootstrap';
import {
  Card,
  Container,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import {
  getSupplierById,
  editSupplier,
} from '../../Services/Supplier';
import { getAllTypeOfUsers } from '../../Services/TypeUser';

function EditSupplier() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [typeOptions, setTypeOptions] = useState([]);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supplier, types] = await Promise.all([
          getSupplierById(id),
          getAllTypeOfUsers(),
        ]);
        setFormData(supplier);
        setTypeOptions(types);
      } catch (err) {
        console.error(err);
        setSubmitError('Error fetching supplier data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData?.Name || formData.Name.trim() === '') {
      newErrors.Name = 'Supplier name is required';
    }
    if (!formData?.TypeofUser) {
      newErrors.TypeofUser = 'Type of User is required';
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
      await editSupplier(id, formData);
      localStorage.setItem('SupplierUpdated', 'true');
      navigate('/Supplier');
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to update Supplier');
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
          <Typography variant="h4">Edit Supplier</Typography>
        </CardContent>
      </Card>

      {/* Form Card */}
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 3,
          marginTop: 3,
        }}
      >
        <CardContent>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="Name">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name"
                    value={formData?.Name || ''}
                    onChange={handleChange}
                    isInvalid={!!errors.Name}
                    placeholder="Enter supplier name"
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="TypeofUser">
                  <Form.Label>Type of User</Form.Label>
                  <Form.Select
                    name="TypeofUser"
                    value={formData?.TypeofUser || ''}
                    onChange={handleChange}
                    isInvalid={!!errors.TypeofUser}
                    style={inputStyle}
                  >
                    <option value="">Select Type of User</option>
                    {typeOptions.map((type) => (
                      <option key={type.ID || type.id} value={type.ID || type.id}>
                        {type.Name || type.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.TypeofUser}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Update Supplier
            </Button>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default EditSupplier;
