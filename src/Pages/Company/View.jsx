import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById } from '../../Services/Company';
import { getSubCompaniesByCompany } from '../../Services/SubCompany';
import BASE_URL from '../../config';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Container,
  useTheme,
  Grid,
  Button as MuiButton,
  Box,
  CardMedia,
} from '@mui/material';

function ViewCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [company, setCompany] = useState(null);
  const [subCompanies, setSubCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await getCompanyById(id);
        setCompany(companyData);
        const subs = await getSubCompaniesByCompany(companyData.Id);
        setSubCompanies(subs);
      } catch (error) {
        console.error('Error loading company or subcompanies:', error);
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
              Company Details
            </Typography>
          </CardContent>
        </MuiCard>

        {/* Image and Name */}
        <MuiCard className="mb-4 shadow-sm" sx={{ mb: 4, boxShadow: 3 }}>
          {company.ImageUrl && (
            <CardMedia
              component="img"
              image={BASE_URL + company.ImageUrl}
              alt="Company"
              sx={{ height: 300, objectFit: 'cover' }}
            />
          )}
          <CardContent>
            <Typography align="center" variant="h5" fontWeight="bold">
              {company.Name}
            </Typography>
          </CardContent>
        </MuiCard>

        {/* Info */}
        <MuiCard className="mb-4 shadow-sm" sx={{ mb: 4, boxShadow: 3 }}>
          <CardContent>
            <Grid container spacing={2} mb={2}>
              <Grid item md={6} xs={12}><strong>Category:</strong> {company.Category}</Grid>
              <Grid item md={6} xs={12}><strong>Location:</strong> {company.Location}</Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item md={6} xs={12}><strong>Email:</strong> {company.Email}</Grid>
              <Grid item md={6} xs={12}><strong>Phone:</strong> {company.PhoneNumber}</Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item md={6} xs={12}><strong>Wallet:</strong> {company.Wallet || 'N/A'}</Grid>
              <Grid item md={6} xs={12}><strong>Bitrix ID:</strong> {company.BitrixID}</Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item md={6} xs={12}>
                <strong>Company Type:</strong>{' '}
                {company.CompanyOrIndividual ? 'Company' : 'Individual'}
              </Grid>
              <Grid item md={6} xs={12}>
                <strong>Promissory Note:</strong><br />
                {renderFileLink('Promissory Note', company.PromissoryNote)}
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item md={6} xs={12}><strong>Owner ID:</strong> {company.OwnerID}</Grid>
              <Grid item md={6} xs={12}>
                <strong>Owner ID Document:</strong><br />
                {renderFileLink('Owner ID', company.OwnerIDImageUrl)}
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item md={6} xs={12}><strong>Commercial Register:</strong> {company.CommercialRegister}</Grid>
              <Grid item md={6} xs={12}>
                <strong>Commercial Register Document:</strong><br />
                {renderFileLink('Commercial Register', company.CommercialRegisterImageURl)}
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item md={6} xs={12}><strong>Tax Card:</strong> {company.TaxCard}</Grid>
              <Grid item md={6} xs={12}>
                <strong>Tax Card Document:</strong><br />
                {renderFileLink('Tax Card', company.TaxCardImageUrl)}
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item xs={12}>
                <strong>Description:</strong>
                <Box
                  dangerouslySetInnerHTML={{ __html: company.Description }}
                  mt={2}
                />
              </Grid>
            </Grid>
          </CardContent>
        </MuiCard>

        {/* SubCompanies */}
        {subCompanies.length > 0 && (
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
                <Typography variant="h5">SubCompanies</Typography>
              </CardContent>
            </MuiCard>

            <Grid container spacing={3}>
              {subCompanies.map((sub) => (
                <Grid item md={4} xs={12} key={sub.id}>
                  <MuiCard className="shadow-sm" sx={{ boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      image={BASE_URL + sub.ImageUrl}
                      alt={sub.name}
                      sx={{ height: 200, objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h6">{sub.Name}</Typography>
                      <Typography variant="body2" color="text.secondary">{sub.Location}</Typography>
                      <MuiButton
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => navigate(`/SubCompany/View/${sub.Id}`)}
                      >
                        View
                      </MuiButton>
                    </CardContent>
                  </MuiCard>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
}

export default ViewCompany;