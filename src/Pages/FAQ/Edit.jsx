import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import {
  Card,
  CardContent,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
import { getFAQById, updateFAQ } from '../../Services/FAQ';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditFAQ() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const faq = await getFAQById(id);
        setFormData({
          question: faq.Question || '',
          answer: faq.Answer || '',
        });
      } catch (err) {
        setSubmitError('Error fetching FAQ data.');
      }
    };
    fetchData();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.question.trim()) newErrors.question = 'Question is required';
    if (!formData.answer.trim() || formData.answer === '<p><br></p>')
      newErrors.answer = 'Answer is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, answer: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await updateFAQ(id, {
        Id: id,
        Question: formData.question,
        Answer: formData.answer,
      });
      localStorage.setItem('faqUpdated', 'true');
      navigate('/FAQ');
    } catch (err) {
      setSubmitError('Failed to update FAQ.');
    }
  };

  const inputStyle = {
    backgroundColor: theme.palette.primary[400],
    color: 'black',
    borderColor: theme.palette.primary[400],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Edit FAQ</Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/FAQ/Create')}>
            Add New FAQ
          </Button>
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
                <Form.Group controlId="question">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    isInvalid={!!errors.question}
                    placeholder="Enter question"
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.question}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={12}>
                <Form.Group controlId="answer">
                  <Form.Label>Answer</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={formData.answer}
                    onChange={handleQuillChange}
                    style={{
                      height: '200px',
                      backgroundColor: 'white',
                      color: 'black',
                    }}
                  />
                  {errors.answer && (
                    <div className="text-danger mt-2">{errors.answer}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className='mt-4'>
              Save Changes
            </Button>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default EditFAQ;
