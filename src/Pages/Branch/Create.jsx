import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../Services/Category';
import { getAllSubCompanies } from '../../Services/SubCompany';
import { createBranch } from '../../Services/Branch';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Card,
  CardContent,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
import {
  Form,
  Row,
  Col,
  Toast,
  ToastContainer,
  Alert,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateBranch = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCompanies, setSubCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    email: '',
    phoneNumber: '',
    bitrixID: '',
    imageUrl: null,
    subCompanyID: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [submitError, setSubmitError] = useState(null);

  const inputStyle = {
    backgroundColor: theme.palette.primary[400],
    color: 'black',
    borderColor: theme.palette.primary[400],
  };

  useEffect(() => {
    getAllCategories().then(setCategories).catch(console.error);
    getAllSubCompanies().then(setSubCompanies).catch(console.error);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'category', 'location', 'email', 'phoneNumber', 'imageUrl', 'subCompanyID'];
    const missing = requiredFields.filter(field => !formData[field]);
    if (missing.length) {
      setSubmitError(`Please fill: ${missing.join(', ')}`);
      return;
    }

    const finalData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'imageUrl' && formData[key]) {
        finalData.append('files', formData[key]);
      } else {
        finalData.append(key, formData[key] || '');
      }
    });

    try {
      await createBranch(finalData);
      setToastMessage('Branch created successfully!');
      setToastVariant('success');
      setShowToast(true);
      localStorage.setItem('BranchCreated', 'true');
      navigate('/Branches');
    } catch (error) {
      console.error('Submission error:', error.response?.data || error.message);
      setToastMessage('Error creating Branch.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ backgroundColor: theme.palette.background.default, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4">Create New Branch</Typography>
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
              <Col md={6}><Form.Group controlId="name">
                <Form.Label>Name *</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" style={inputStyle} />
              </Form.Group></Col>
              <Col md={6}><Form.Group controlId="category">
                <Form.Label>Category *</Form.Label>
                <Form.Select name="category" value={formData.category} onChange={handleInputChange} style={inputStyle}>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat.Id} value={cat.Name}>{cat.Name}</option>)}
                  <option value="أخري">أخري</option>
                </Form.Select>
              </Form.Group></Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><Form.Group controlId="location">
                <Form.Label>Location *</Form.Label>
                <Form.Control type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter location" style={inputStyle} />
              </Form.Group></Col>
              <Col md={6}><Form.Group controlId="email">
                <Form.Label>Email *</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" style={inputStyle} />
              </Form.Group></Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number *</Form.Label>
                <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Enter phone number" style={inputStyle} />
              </Form.Group></Col>
              <Col md={6}><Form.Group controlId="subCompanyID">
                <Form.Label>SubCompany *</Form.Label>
                <Form.Select name="subCompanyID" value={formData.subCompanyID} onChange={handleInputChange} style={inputStyle}>
                  <option value="">Select SubCompany</option>
                  {subCompanies.map(sub => <option key={sub.Id} value={sub.Id}>{sub.Name}</option>)}
                </Form.Select>
              </Form.Group></Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><Form.Group controlId="imageUrl">
                <Form.Label>Image *</Form.Label>
                <Form.Control type="file" name="imageUrl" onChange={handleInputChange} style={inputStyle} />
              </Form.Group></Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}><Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <ReactQuill theme="snow" value={formData.description} onChange={handleDescriptionChange} className="bg-white text-black" />
              </Form.Group></Col>
            </Row>

            <Button type="submit" variant="primary">Create Branch</Button>
          </Form>
        </CardContent>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} bg={toastVariant} delay={3000} autohide>
          <Toast.Header><strong className="me-auto">Notification</strong></Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default CreateBranch;
