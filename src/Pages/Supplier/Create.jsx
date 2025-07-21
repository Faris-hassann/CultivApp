import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Alert,
  Toast,
  Row,
  Col,
  ToastContainer,
  Button,
} from 'react-bootstrap';
import {
  Card,
  CardContent,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
import { createSupplier } from '../../Services/Supplier';
import { getAllTypeOfUsers } from '../../Services/TypeUser';

function CreateSupplier() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    typeOfUser: '',
  });
  const [typeOptions, setTypeOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getAllTypeOfUsers();
        setTypeOptions(res);
      } catch (err) {
        console.error('Failed to fetch type of users', err);
      }
    };
    fetchTypes();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.typeOfUser) newErrors.typeOfUser = 'Required';
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
      await createSupplier({
        name: formData.name,
        typeOfUser: formData.typeOfUser,
      });
      localStorage.setItem('SupplierCreated', 'true');
      navigate('/Supplier');
    } catch (error) {
      console.error(error);
      setSubmitError('Failed to create Supplier.');
    }
  };

  const inputStyle = {
    backgroundColor: theme.palette.primary[400],
    color: 'black',
    borderColor: theme.palette.primary[400],
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
          <Typography variant="h4">Create Supplier</Typography>
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
                <Form.Group controlId="name">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    placeholder="Enter supplier name"
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="typeOfUser">
                  <Form.Label>Type of User</Form.Label>
                  <Form.Select
                    name="typeOfUser"
                    value={formData.typeOfUser}
                    onChange={handleChange}
                    isInvalid={!!errors.typeOfUser}
                    style={inputStyle}
                  >
                    <option value="">Select Type of User</option>
                    {typeOptions.map((type) => (
                      <option key={type.id || type.ID} value={type.id || type.ID}>
                        {type.name || type.Name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.typeOfUser}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Create Supplier
            </Button>
          </Form>
        </CardContent>
      </Card>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg="success"
          delay={1500}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Supplier created successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default CreateSupplier;
