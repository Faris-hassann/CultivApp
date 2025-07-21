import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { loginUser, googleLogin } from '../Services/Employee';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data) => {
    setIsLoginLoading(true);
    try {
      await loginUser(data);
      navigate('/Dashboard');
    } catch (error) {
      form.setError('email', {
        type: 'manual',
        message: 'Invalid email or password',
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // you get email from this
      const email = decoded.email;

      await googleLogin(email); // Your backend API call
      navigate('/Dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      alert('Google login failed');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light position-relative">
      <div className="position-absolute top-0 end-0 w-50 h-50 bg-primary opacity-10 rounded-circle blur" style={{ zIndex: -1 }} />
      <div className="position-absolute bottom-0 start-0 w-50 h-50 bg-info opacity-10 rounded-circle blur" style={{ zIndex: -1 }} />

      <Container className="p-4">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <div className="text-center mb-4">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" style={{ width: 50, height: 50 }}>
                  R
                </div>
                <div className="ms-2 text-start">
                  <h4 className="m-0 fw-bold text-primary">Rwafi</h4>
                  <small className="text-muted">Logistics Solutions</small>
                </div>
              </div>
              <h2 className='text-black'>Welcome Back</h2>
              <p className="text-muted">Sign in to your account to continue</p>
            </div>

            <div className="bg-white p-4 shadow rounded-4 border">
              <Form onSubmit={form.handleSubmit(handleLogin)}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label className='text-black'>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    {...form.register('email')}
                    isInvalid={!!form.formState.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.formState.errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label className='text-black'>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...form.register('password')}
                      isInvalid={!!form.formState.errors.password}
                    />
                    <span
                      role="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                    >
                      {showPassword ? <EyeSlashIcon width={20} /> : <EyeIcon width={20} />}
                    </span>
                    <Form.Control.Feedback type="invalid">
                      {form.formState.errors.password?.message}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>

              <div className="text-center text-muted my-3">Or continue with</div>

              <div className="d-flex justify-content-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert("Google login failed")}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
