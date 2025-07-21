import React, { useEffect, useState } from 'react';
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

import { createUserForm } from '../../../Services/UserForms';
import { getAllTypeOfUsers } from '../../../Services/TypeUser';
import { getSuppliersByTypeofUser } from '../../../Services/Supplier';

function CreateUserForm() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    typeID: '',
    supplierID: '',
    optionChoice: '',
  });

  const [types, setTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const result = await getAllTypeOfUsers();
        setTypes(result);
      } catch (error) {
        setSubmitError('Failed to load user types.');
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      if (!formData.typeID) {
        setSuppliers([]);
        return;
      }

      try {
        const result = await getSuppliersByTypeofUser(formData.typeID);
        setSuppliers(result);
      } catch (error) {
        console.error('Failed to load suppliers:', error);
        setSuppliers([]);
      }
    };

    fetchSuppliers();
  }, [formData.typeID]);

  const validate = () => {
    const newErrors = {};
    if (!formData.typeID) newErrors.typeID = 'Type of User is required';
    if (!formData.supplierID) newErrors.supplierID = 'Supplier is required';
    if (!formData.optionChoice) newErrors.optionChoice = 'Option is required';
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
      await createUserForm({
        TypeID: formData.typeID,
        SupplierID: formData.supplierID,
        OptionChoice: formData.optionChoice,
      });
      setShowToast(true);
      localStorage.setItem('UserFormCreated', 'true');
      navigate('/Users');
    } catch (error) {
      console.error(error);
      setSubmitError('Failed to create user form.');
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
      <Card sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Create User Form</Typography>
        </CardContent>
      </Card>

      {/* Form Card */}
      <Card sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, borderRadius: 2, boxShadow: 3, marginTop: 3 }}>
        <CardContent>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* Type of User */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="typeID">
                  <Form.Label>Type of User</Form.Label>
                  <Form.Select
                    name="typeID"
                    value={formData.typeID}
                    onChange={handleChange}
                    isInvalid={!!errors.typeID}
                    style={inputStyle}
                  >
                    <option value="">Select type</option>
                    {types.map((type) => (
                      <option key={type.id || type.ID} value={type.id || type.ID}>
                        {type.name || type.Name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.typeID}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Supplier */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="supplierID">
                  <Form.Label>Supplier</Form.Label>
                  <Form.Select
                    name="supplierID"
                    value={formData.supplierID}
                    onChange={handleChange}
                    isInvalid={!!errors.supplierID}
                    style={inputStyle}
                    disabled={!formData.typeID || suppliers.length === 0}
                  >
                    <option value="">
                      {!formData.typeID
                        ? 'Select Type first'
                        : suppliers.length === 0
                        ? 'No suppliers available'
                        : 'Select Supplier'}
                    </option>
                    {suppliers.map((sup) => (
                      <option key={sup.id || sup.ID} value={sup.id || sup.ID}>
                        {sup.name || sup.Name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.supplierID}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Option Choice (dropdown now) */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="optionChoice">
                  <Form.Label>Option Choice</Form.Label>
                  <Form.Select
                    name="optionChoice"
                    value={formData.optionChoice}
                    onChange={handleChange}
                    isInvalid={!!errors.optionChoice}
                    style={inputStyle}
                  >
                    <option value="">Select option</option>
                    <option value="Booking">Booking</option>
                    <option value="Issue">Issue</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.optionChoice}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Submit Form
            </Button>
          </Form>
        </CardContent>
      </Card>

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} bg="success" delay={1500} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">User Form created successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default CreateUserForm;
