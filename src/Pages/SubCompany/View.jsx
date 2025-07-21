import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubCompanyById } from '../../Services/SubCompany';
import { getBranchesBySubCompanyId } from '../../Services/Branch';
import BASE_URL from '../../config';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
import { Card, Row, Col, Button } from 'react-bootstrap';

function ViewSubCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [company, setCompany] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await getSubCompanyById(id);
        setCompany(companyData);

        const branchData = await getBranchesBySubCompanyId(companyData.Id);
        console.log(branchData);
        setBranches(branchData);
      } catch (error) {
        console.error('Error loading subcompany or branches:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!company) return <p>Loading...</p>;

  const renderFileLink = (label, path) =>
    path ? (
      <a
        href={BASE_URL + path}
        download
        className="text-decoration-underline text-primary"
      >
        Download {label}
      </a>
    ) : (
      'N/A'
    );

  return (
    <div style={{ height: '90vh', overflowY: 'auto' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
              SubCompany Details
            </Typography>
          </CardContent>
        </MuiCard>

        {/* Image and Name */}
        <Card className="mb-4 shadow-sm">
          {company.ImageUrl && (
            <Card.Img
              variant="top"
              src={BASE_URL + company.ImageUrl}
              alt="Company"
              style={{ height: '300px', objectFit: 'cover' }}
            />
          )}
          <Card.Body>
            <Card.Title className="text-center fs-3 fw-bold">
              {company.Name}
            </Card.Title>
          </Card.Body>
        </Card>

        {/* Info */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}><strong>Category:</strong> {company.Category}</Col>
              <Col md={6}><strong>Location:</strong> {company.Location}</Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><strong>Email:</strong> {company.Email}</Col>
              <Col md={6}><strong>Phone:</strong> {company.PhoneNumber}</Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><strong>Wallet:</strong> {company.Wallet || 'N/A'}</Col>
              <Col md={6}><strong>Bitrix ID:</strong> {company.BitrixID}</Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <strong>Company Type:</strong>{' '}
                {company.CompanyOrIndividual ? 'Company' : 'Individual'}
              </Col>
              <Col md={6}>
                <strong>Promissory Note:</strong><br />
                {renderFileLink('Promissory Note', company.PromissoryNote)}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><strong>Owner ID:</strong> {company.OwnerID}</Col>
              <Col md={6}>
                <strong>Owner ID Document:</strong><br />
                {renderFileLink('Owner ID', company.OwnerIDImageUrl)}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><strong>Commercial Register:</strong> {company.CommercialRegister}</Col>
              <Col md={6}>
                <strong>Commercial Register Document:</strong><br />
                {renderFileLink('Commercial Register', company.CommercialRegisterImageURl)}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}><strong>Tax Card:</strong> {company.TaxCard}</Col>
              <Col md={6}>
                <strong>Tax Card Document:</strong><br />
                {renderFileLink('Tax Card', company.TaxCardImageUrl)}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <strong>Description:</strong>
                <div
                  dangerouslySetInnerHTML={{ __html: company.Description }}
                  className="mt-2"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Branches */}
        {branches.length > 0 && (
          <>  
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
                <Typography variant="h5">Branches</Typography>
              </CardContent>
            </MuiCard>

            <Row>
              {branches.map((branch) => (
                <Col md={4} key={branch.id} className="mb-3">
                  <Card className="shadow-sm">
                    <Card.Img
                      variant="top"
                      src={BASE_URL + branch.ImageUrl}
                      alt={branch.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{branch.name || 'Unnamed Branch'}</Card.Title>
                      <Card.Text>{branch.location || 'No location provided'}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/Branch/View/${branch.id}`)}
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default ViewSubCompany;
