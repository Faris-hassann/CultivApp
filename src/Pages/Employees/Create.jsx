import React, { useState, useEffect } from 'react';
import { createAccount, getAllRoles } from '../../Services/Employee';
import { getAllCompanies } from '../../Services/Company';
import { getAllSubCompanies } from '../../Services/SubCompany';
import { getAllBranches } from '../../Services/Branch';
import { useNavigate } from 'react-router-dom';
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
import { getAuth } from '../../utils/auth';

const CreateUser = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // 1️⃣ Store current user's role in state
  const [userRole, setUserRole] = useState("");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    nationalID: '',
    roleId: '',
    companyID: '',
    subCompanyID: '',
    branchID: '',
    profileImage: null,
  });

  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [subCompanies, setSubCompanies] = useState([]);
  const [branches, setBranches] = useState([]);

  const [submitError, setSubmitError] = useState(null);

  const inputStyle = {
    backgroundColor: theme.palette.primary[400],
    color: 'black',
    borderColor: theme.palette.primary[400],
  };

  // 2️⃣ On mount, read auth and set userRole
  useEffect(() => {
    const auth = getAuth();
    setUserRole(auth.role?.toLowerCase() || "");
  }, []);

  // 3️⃣ Fetch lookups once userRole is known
  useEffect(() => {
    // avoid running before userRole is set
    if (!userRole) return;

    const isSuperAdmin = userRole === 'superadmin';
    const isAdmin = userRole === 'admin';
    const isCompanyManager = userRole === 'companymanager';

    getAllRoles().then(setRoles);

    if (isSuperAdmin) {
      getAllCompanies().then(setCompanies);
    }
    if (isSuperAdmin || isAdmin) {
      getAllSubCompanies().then(setSubCompanies);
    }
    if (isSuperAdmin || isAdmin || isCompanyManager) {
      getAllBranches().then(setBranches);
    }
  }, [userRole]);

  // 4️⃣ Booleans for rendering
  const isSuperAdmin = userRole === 'superadmin';
  const isAdmin = userRole === 'admin';
  const isCompanyManager = userRole === 'companymanager';

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // build required list based on role
    const required = ['firstName', 'lastName', 'email', 'phoneNumber', 'roleId'];
    if (isSuperAdmin) required.push('companyID');
    const missing = required.filter((f) => !formData[f]);
    if (missing.length) {
      setSubmitError(`Please fill: ${missing.join(', ')}`);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) return;
      const correctKey = {
        profileImage: 'ProfileImage',
        roleId: 'RoleId',
        companyID: 'CompanyID',
        subCompanyID: 'SubCompanyID',
        branchID: 'BranchID',
      }[key] || key;
      data.append(correctKey, value);
    });
    data.append('Password', 'Employee123@');

    try {
      await createAccount(data);
      navigate('/Employees', { state: { toast: 'created' } });
    } catch (error) {
      console.error(error);
      setSubmitError('User creation failed. Please verify all fields.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ backgroundColor: theme.palette.background.default, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4">Create New User</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3, backgroundColor: theme.palette.background.default, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>National ID</Form.Label>
                  <Form.Control
                    placeholder="Enter National ID"
                    name="nationalID"
                    value={formData.nationalID}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Role *</Form.Label>
                  <Form.Select
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="">Select Role</option>
                    {roles.map(r => (
                      <option key={r.Id} value={r.Id}>{r.Name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              {isSuperAdmin && (
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Company *</Form.Label>
                    <Form.Select
                      name="companyID"
                      value={formData.companyID}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      <option value="">Select Company</option>
                      {companies.map(c => (
                        <option key={c.Id} value={c.Id}>{c.Name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              )}

              {(isSuperAdmin || isAdmin) && (
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>SubCompany</Form.Label>
                    <Form.Select
                      name="subCompanyID"
                      value={formData.subCompanyID}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      <option value="">Select SubCompany</option>
                      {subCompanies.map(s => (
                        <option key={s.Id} value={s.Id}>{s.Name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              )}

              {(isSuperAdmin || isAdmin || isCompanyManager) && (
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Branch</Form.Label>
                    <Form.Select
                      name="branchID"
                      value={formData.branchID}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      <option value="">Select Branch</option>
                      {branches.map(b => (
                        <option key={b.Id} value={b.Id}>{b.Name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              )}
            </Row>

            <Button type="submit" variant="primary">Create User</Button>
          </Form>
        </CardContent>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setSubmitError(null)} show={!!submitError} bg="danger" delay={3000} autohide>
          <Toast.Header><strong className="me-auto">Error</strong></Toast.Header>
          <Toast.Body className="text-white">{submitError}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default CreateUser;
