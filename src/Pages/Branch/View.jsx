import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBranchById } from '../../Services/Branch';
import BASE_URL from '../../config';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Container as MuiContainer,
  useTheme,
} from '@mui/material';
import { Row, Col, Card } from 'react-bootstrap';

function ViewBranch() {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const data = await getBranchById(id);
        setBranch(data);
      } catch (error) {
        console.error('Error loading branch:', error);
      }
    };
    fetchBranch();
  }, [id]);

  if (!branch) return <p>Loading...</p>;

  return (
    <div style={{ height: '90vh', overflowY: 'auto' }}>
      <MuiContainer maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <MuiCard
          sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRadius: 2,
            boxShadow: 3,
            mb: 3,
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Branch Details
            </Typography>
          </CardContent>
        </MuiCard>

        {/* Image and Name */}
        <Card className="mb-4 shadow-sm">
          {branch.ImageUrl && (
            <Card.Img
              variant="top"
              src={BASE_URL + branch.ImageUrl}
              alt="Branch"
              style={{ height: '300px', objectFit: 'cover' }}
            />
          )}
          <Card.Body>
            <Card.Title className="text-center fs-3 fw-bold">
              {branch.Name}
            </Card.Title>
          </Card.Body>
        </Card>

        {/* Info */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}><strong>Category:</strong> {branch.Category}</Col>
              <Col md={6}><strong>Location:</strong> {branch.Location}</Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><strong>Email:</strong> {branch.Email}</Col>
              <Col md={6}><strong>Phone:</strong> {branch.PhoneNumber}</Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><strong>Wallet:</strong> {branch.Wallet || 'N/A'}</Col>
              <Col md={6}><strong>Bitrix ID:</strong> {branch.BitrixID}</Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <strong>Description:</strong>
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: branch.Description || '' }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </MuiContainer>
    </div>
  );
}

export default ViewBranch;
