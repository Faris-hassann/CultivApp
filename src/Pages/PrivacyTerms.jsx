import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Gavel as GavelIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const PrivacyTerms = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Smooth scroll to section when component mounts (if hash in URL or state)
  useEffect(() => {
    const hash = window.location.hash;
    const scrollTo = location.state?.scrollTo;
    
    let targetSection = null;
    
    if (scrollTo) {
      targetSection = document.getElementById(scrollTo);
    } else if (hash) {
      targetSection = document.querySelector(hash);
    }
    
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [location.state]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
      pt: { xs: 2, md: 4 },
      pb: 6
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 2,
              background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Legal Information
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: themeSettings.text.secondary,
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Please review our Privacy Policy and Terms of Service to understand how we protect your information and govern our services.
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2, 
          mb: 6,
          flexWrap: 'wrap'
        }}>
          <Box
            onClick={() => scrollToSection('privacy-policy')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 2,
              bgcolor: themeSettings.primary.main,
              color: 'white',
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 2,
              '&:hover': {
                bgcolor: themeSettings.primary.dark,
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
            }}
          >
            <SecurityIcon />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Privacy Policy
            </Typography>
          </Box>
          <Box
            onClick={() => scrollToSection('terms-of-service')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 2,
              bgcolor: themeSettings.secondary.main,
              color: 'white',
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 2,
              '&:hover': {
                bgcolor: themeSettings.secondary.dark,
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
            }}
          >
            <GavelIcon />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Terms of Service
            </Typography>
          </Box>
        </Box>

        {/* Privacy Policy Section */}
        <Paper
          id="privacy-policy"
          sx={{
            p: { xs: 3, md: 5 },
            mb: 6,
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <SecurityIcon sx={{ 
              fontSize: 40, 
              color: themeSettings.primary.main 
            }} />
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 'bold',
                color: themeSettings.text.primary,
              }}
            >
              Privacy Policy
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: themeSettings.text.secondary }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            2. How We Use Your Information
          </Typography>
          <List sx={{ mb: 3 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: themeSettings.primary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Service Provision"
                secondary="We use your information to provide and improve our services, including business setup and logistics solutions."
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: themeSettings.text.secondary }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: themeSettings.primary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Communication"
                secondary="To communicate with you about our services, updates, and important information."
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: themeSettings.text.secondary }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: themeSettings.primary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Legal Compliance"
                secondary="To comply with legal obligations and regulatory requirements in Saudi Arabia."
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: themeSettings.text.secondary }}
              />
            </ListItem>
          </List>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            3. Information Sharing
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            Exceptumst qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora 
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem 
            ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            4. Data Security
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            We implement appropriate technical and organizational security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. Our security practices are regularly reviewed and updated 
            to ensure the highest level of protection for your data.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            5. Your Rights
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            You have the right to access, correct, or delete your personal information. You may also have the right to restrict 
            or object to certain processing of your information. To exercise these rights, please contact us using the information 
            provided below.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            6. Contact Us
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, color: themeSettings.text.secondary }}>
            If you have any questions about this Privacy Policy, please contact us at:
          </Typography>
          <Box sx={{ mt: 2, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: themeSettings.text.primary }}>
              Email: privacy@rwafi.sa
            </Typography>
            <Typography variant="body1" sx={{ color: themeSettings.text.secondary }}>
              Phone: +966 50 123 4567
            </Typography>
            <Typography variant="body1" sx={{ color: themeSettings.text.secondary }}>
              Address: Riyadh, Saudi Arabia
            </Typography>
          </Box>
        </Paper>

        <Divider sx={{ my: 4 }} />

        {/* Terms of Service Section */}
        <Paper
          id="terms-of-service"
          sx={{
            p: { xs: 3, md: 5 },
            mb: 6,
            borderRadius: 3,
            boxShadow: 3,
            bgcolor: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <GavelIcon sx={{ 
              fontSize: 40, 
              color: themeSettings.secondary.main 
            }} />
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 'bold',
                color: themeSettings.text.primary,
              }}
            >
              Terms of Service
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: themeSettings.text.secondary }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            By accessing and using Rwafi's services, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service. These terms apply to all visitors, users, 
            and others who access or use the service.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            2. Services Description
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            Rwafi provides business setup and logistics services in Saudi Arabia, including but not limited to company registration, 
            licensing, compliance support, and logistics solutions. Our services are designed to help businesses establish and grow 
            their presence in the Saudi market.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            3. User Responsibilities
          </Typography>
          <List sx={{ mb: 3 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <InfoIcon sx={{ color: themeSettings.secondary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Accurate Information"
                secondary="You must provide accurate, current, and complete information when using our services."
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: themeSettings.text.secondary }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <WarningIcon sx={{ color: themeSettings.secondary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Compliance"
                secondary="You must comply with all applicable laws and regulations in Saudi Arabia."
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: themeSettings.text.secondary }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: themeSettings.secondary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Cooperation"
                secondary="You must cooperate with our team and provide necessary documentation when requested."
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: themeSettings.text.secondary }}
              />
            </ListItem>
          </List>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            4. Payment Terms
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            All fees are payable in advance unless otherwise agreed in writing. Payment must be made in Saudi Riyals (SAR) unless 
            otherwise specified. We reserve the right to suspend or terminate services for non-payment of fees.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            5. Limitation of Liability
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            To the maximum extent permitted by law, Rwafi shall not be liable for any indirect, incidental, special, consequential, 
            or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
            resulting from your use of our services.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            6. Termination
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
            including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            7. Governing Law
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: themeSettings.text.secondary }}>
            These Terms shall be interpreted and governed by the laws of the Kingdom of Saudi Arabia. Any disputes arising from 
            these terms or our services shall be subject to the exclusive jurisdiction of the courts in Riyadh, Saudi Arabia.
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: themeSettings.text.primary }}>
            8. Contact Information
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, color: themeSettings.text.secondary }}>
            For questions about these Terms of Service, please contact us at:
          </Typography>
          <Box sx={{ mt: 2, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: themeSettings.text.primary }}>
              Email: legal@rwafi.sa
            </Typography>
            <Typography variant="body1" sx={{ color: themeSettings.text.secondary }}>
              Phone: +966 50 123 4567
            </Typography>
            <Typography variant="body1" sx={{ color: themeSettings.text.secondary }}>
              Address: Riyadh, Saudi Arabia
            </Typography>
          </Box>
        </Paper>

        {/* Back to Top Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Box
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 4,
              py: 2,
              bgcolor: themeSettings.primary.main,
              color: 'white',
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 2,
              '&:hover': {
                bgcolor: themeSettings.primary.dark,
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Back to Top
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyTerms; 