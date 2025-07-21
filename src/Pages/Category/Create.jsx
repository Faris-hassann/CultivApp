import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    Alert,
    Toast,
    Row,
    Col,
    ToastContainer,
    Button
} from 'react-bootstrap';
import {
    Card,
    CardContent,
    Typography,
    Container,
    useTheme,
} from '@mui/material';
import { createCategory } from '../../Services/Category';

function CreateCategory() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '' });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Required';
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
            await createCategory(formData);
            localStorage.setItem('categoryCreated', 'true');
            navigate('/Category');
        } catch (error) {
            console.error(error);
            setSubmitError('Failed to create Category.');
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
                    <Typography variant="h4">Create New Category</Typography>
                </CardContent>
            </Card>

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
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                        placeholder="Enter category name"
                                        style={inputStyle}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            Create Category
                        </Button>
                    </Form>
                </CardContent>
            </Card>
            
            {/* ✅ Toast Container */}
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} bg="success" delay={1500} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Category created successfully!</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}

export default CreateCategory;
