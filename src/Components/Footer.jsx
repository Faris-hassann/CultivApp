"use client"
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const themeSettings = {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  };

  const handleLegalLink = (section) => {
    navigate('/Privacy&Terms', { state: { scrollTo: section } });
  };

  return (
    <Box
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Rwafi
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: 'grey.300' }}>
                Your trusted partner for business setup and logistics solutions in Saudi Arabia.
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Empowering businesses to succeed in the Saudi market with comprehensive services and local expertise.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="#home"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': {
                    color: themeSettings.primary.light,
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                Home
              </Link>
              <Link
                href="#services"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': {
                    color: themeSettings.primary.light,
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                Services
              </Link>
              <Link
                href="#about"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': {
                    color: themeSettings.primary.light,
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                About Us
              </Link>
              <Link
                href="#contact"
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  '&:hover': {
                    color: themeSettings.primary.light,
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                onClick={() => handleLegalLink('privacy-policy')}
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    color: themeSettings.primary.light,
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                Privacy Policy
              </Link>
              <Link
                onClick={() => handleLegalLink('terms-of-service')}
                sx={{
                  color: 'grey.300',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    color: themeSettings.primary.light,
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                Terms of Service
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

        {/* Bottom Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: 'grey.400', textAlign: { xs: 'center', md: 'left' } }}>
            © {new Date().getFullYear()} Rwafi. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              Riyadh, Saudi Arabia
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              +966 50 123 4567
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;