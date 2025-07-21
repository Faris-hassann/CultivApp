import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  Button,
  Alert,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import {
  Card,
  CardContent,
  Typography,
  Container,
  useTheme
} from '@mui/material';
import { getBranchById, updateBranch } from '../../Services/Branch';
import BASE_URL from '../../config';

function EditBranch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [formData, setFormData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const branch = await getBranchById(id);
        setFormData(branch);
      } catch {
        setSubmitError('Error fetching branch data');
      }
    };
    fetchBranch();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.category) newErrors.category = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Required';
    if (!formData.location) newErrors.location = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    }
    if (selectedFile) {
      data.append('files', selectedFile);
    }

    try {
      await updateBranch(id, data);
      setShowToast(true);
      setTimeout(() => navigate('/Branches'), 1600);
    } catch {
      setSubmitError('Failed to update branch');
    }
  };

  const inputStyle = {
    backgroundColor: theme.palette.primary[400],
    color: 'black',
    borderColor: theme.palette.primary[400]
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderRadius: 2,
        boxShadow: 3,
      }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Edit Branch</Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 3,
          marginTop: 3,
          height: '70vh',
          overflow: 'hidden', // prevent outer scrollbars
        }}
      >
        <CardContent
          sx={{
            height: '100%',
            overflowY: 'auto', // enable vertical scroll
            pr: 2, // optional: prevent content cutoff by scrollbar
          }}
        >
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Branch name"
                    isInvalid={!!errors.name}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
                    placeholder="e.g. Retail"
                    isInvalid={!!errors.category}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.phoneNumber}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    isInvalid={!!errors.location}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="bitrixID">
                  <Form.Label>Bitrix ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="bitrixID"
                    value={formData.bitrixID}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="wallet">
                  <Form.Label>Wallet</Form.Label>
                  <Form.Control
                    type="number"
                    name="wallet"
                    value={formData.wallet}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="imageUpload">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} accept="image/*" />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <small>Current Image:</small>
                      <img src={BASE_URL + formData.imageUrl} alt="Current" style={{ maxWidth: '150px' }} />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </CardContent>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} bg="success" delay={1500} autohide>
          <Toast.Header><strong className="me-auto">Success</strong></Toast.Header>
          <Toast.Body className="text-white">Branch updated successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default EditBranch;
