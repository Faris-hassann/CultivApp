import React, { useState, useEffect } from 'react';
import {
    getAccountById,
    updateAccount,
} from '../../Services/Employee';
import {
    Card, CardContent, Typography, Container, useTheme,
} from '@mui/material';
import {
    Form, Row, Col, Toast, ToastContainer, Alert, Button,
} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const EditUser = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {};

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dob: '',
        nationalID: '',
    });

    const [profileImage, setProfileImage] = useState(null);
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
        if (!userId) return;
        const fetchData = async () => {
            try {
                const user = await getAccountById(userId);
                setFormData({
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    phoneNumber: user.phoneNumber || '',
                    dob: user.dob ? user.dob.split('T')[0] : '',
                    nationalID: user.nationalID || '',
                });
            } catch (err) {
                console.error('Error loading user', err);
            }
        };
        fetchData();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const required = ['firstName', 'lastName', 'phoneNumber'];
        const missing = required.filter((f) => !formData[f]);
        if (missing.length) {
            setSubmitError(`Please fill: ${missing.join(', ')}`);
            return;
        }

        const formPayload = new FormData();
        formPayload.append('FirstName', formData.firstName);
        formPayload.append('LastName', formData.lastName);
        formPayload.append('PhoneNumber', formData.phoneNumber);

        // Only send if not empty - send as string in YYYY-MM-DD format
        if (formData.dob) formPayload.append('DOBString', formData.dob);
        if (formData.nationalID) formPayload.append('NationalID', formData.nationalID);

        if (profileImage) formPayload.append('ProfileImageUrl', profileImage);

        // Debug the FormData
        for (const pair of formPayload.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            await updateAccount(userId, formPayload);
            setToastMessage('User updated successfully!');
            setToastVariant('success');
            setShowToast(true);
            setTimeout(() => navigate('/users'), 1500);
        } catch (error) {
            console.error('Update failed:', error);
            setToastMessage('Failed to update user.');
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Card sx={{ backgroundColor: theme.palette.background.default, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4">Edit User</Typography>
                </CardContent>
            </Card>

            <Card sx={{ mt: 3, backgroundColor: theme.palette.background.default, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    {submitError && <Alert variant="danger">{submitError}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>First Name *</Form.Label>
                                    <Form.Control name="firstName" value={formData.firstName} onChange={handleInputChange} style={inputStyle} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Last Name *</Form.Label>
                                    <Form.Control name="lastName" value={formData.lastName} onChange={handleInputChange} style={inputStyle} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} style={inputStyle} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Phone Number *</Form.Label>
                                    <Form.Control name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} style={inputStyle} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>National ID</Form.Label>
                                    <Form.Control name="nationalID" value={formData.nationalID} onChange={handleInputChange} style={inputStyle} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date" name="dob" value={formData.dob} onChange={handleInputChange} style={inputStyle} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Profile Image</Form.Label>
                                    <Form.Control type="file" onChange={handleImageChange} style={inputStyle} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button type="submit" variant="primary">Update User</Button>
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

export default EditUser;
