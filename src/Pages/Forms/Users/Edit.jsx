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
import { getUserFormById, editUserForm } from '../../../Services/UserForms';
import { getAllTypeOfUsers } from '../../../Services/TypeUser';
import { getSuppliersByTypeofUser } from '../../../Services/Supplier';

function EditUserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const [formData, setFormData] = useState(null);
    const [types, setTypes] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [form, typeList] = await Promise.all([
                    getUserFormById(id),
                    getAllTypeOfUsers(),
                ]);

                setFormData({
                    typeID: form.typeID || form.TypeID || '',
                    supplierID: form.supplierID || form.SupplierID || '',
                    optionChoice: form.optionChoice || form.OptionChoice || '',
                });

                setTypes(typeList);

                if (form.typeID || form.TypeID) {
                    const supplierList = await getSuppliersByTypeofUser(
                        form.typeID || form.TypeID
                    );
                    setSuppliers(supplierList);
                }
            } catch (err) {
                console.error(err);
                setSubmitError('Error fetching user form data');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [id]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            if (!formData?.typeID) return;
            try {
                const supplierList = await getSuppliersByTypeofUser(formData.typeID);
                setSuppliers(supplierList);
            } catch (err) {
                console.error('Error fetching suppliers:', err);
                setSuppliers([]);
            }
        };

        if (formData?.typeID) {
            fetchSuppliers();
        }
    }, [formData?.typeID]);

    const validate = () => {
        const newErrors = {};
        if (!formData?.typeID) newErrors.typeID = 'Type is required';
        if (!formData?.supplierID) newErrors.supplierID = 'Supplier is required';
        if (!formData?.optionChoice) newErrors.optionChoice = 'Option is required';
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
            await editUserForm(id, {
                ID: id, // ✅ include ID in body
                TypeID: formData.typeID,
                SupplierID: formData.supplierID,
                OptionChoice: formData.optionChoice,
            });
            localStorage.setItem('UserFormUpdated', 'true');
            navigate('/Users');
        } catch (err) {
            console.error(err);
            setSubmitError('Failed to update user form');
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
                    <Typography variant="h4">Edit User Form</Typography>
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

                        {/* Option Choice Dropdown */}
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
                            Update Form
                        </Button>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default EditUserForm;
