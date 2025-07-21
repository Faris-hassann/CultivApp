import React from 'react';
import {
  Box,
  Card,
  Typography,
  Container,
  Grid,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Dummy data for members
const members = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    position: 'Senior Software Engineer',
    description: 'Ahmed is a full-stack developer with a passion for scalable, user-friendly apps. He loves working with React and Node.js.',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    department: 'Engineering',
  },
  {
    id: 2,
    name: 'Fatima Al-Zahra',
    position: 'Product Manager',
    description: 'Fatima is a strategic leader focused on user-centered design and product success. She brings teams together for great results.',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    department: 'Product',
  },
  {
    id: 3,
    name: 'Omar Khalil',
    position: 'UX/UI Designer',
    description: 'Omar crafts beautiful and intuitive digital experiences, always putting the user first.',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    department: 'Design',
  },
  {
    id: 4,
    name: 'Layla Mohammed',
    position: 'Data Scientist',
    description: 'Layla transforms complex data into actionable business insights and loves machine learning.',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    department: 'Analytics',
  },
  {
    id: 5,
    name: 'Youssef Ibrahim',
    position: 'DevOps Engineer',
    description: 'Youssef is an automation and reliability specialist for critical systems and cloud infrastructure.',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    department: 'Operations',
  },
  {
    id: 6,
    name: 'Aisha Rahman',
    position: 'Marketing Specialist',
    description: 'Aisha drives growth through innovative digital marketing campaigns and creative content.',
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
    department: 'Marketing',
  },
  {
    id: 7,
    name: 'Khalid Mansour',
    position: 'Business Analyst',
    description: 'Khalid bridges business needs and technical solutions, specializing in process optimization.',
    photo: 'https://randomuser.me/api/portraits/men/23.jpg',
    department: 'Business',
  },
  {
    id: 8,
    name: 'Nour El-Din',
    position: 'QA Engineer',
    description: 'Nour ensures software quality through comprehensive testing and a keen eye for detail.',
    photo: 'https://randomuser.me/api/portraits/men/41.jpg',
    department: 'Quality',
  },
];

function Members() {
  // Custom color palette
  const primaryBlue = '#1976d2';
  const softGray = '#f5f7fa';
  const cardGray = '#e9eef6';
  const fontFamily = 'Roboto, "Open Sans", Arial, sans-serif';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: `linear-gradient(135deg, ${softGray} 0%, ${cardGray} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, md: 4 } }}>
        {/* Back to Home Button */}
        <Box
          component="a"
          href="/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: '#666666',
            mb: 4,
            textDecoration: 'none',
            transition: '0.2s',
            fontWeight: 500,
            fontSize: '1rem',
            '&:hover': { color: primaryBlue },
          }}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography variant="body2" fontWeight={500} sx={{ fontFamily }}>
            Back to Home
          </Typography>
        </Box>

        {/* Header Section */}
        <Box
          sx={{
            mb: 8,
            px: { xs: 2, md: 6 },
            py: { xs: 4, md: 6 },
            borderRadius: 5,
            background: `linear-gradient(90deg, ${softGray} 0%, #ffffff 100%)`,
            boxShadow: 3,
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto',
            fontFamily,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.2rem' },
              background: `linear-gradient(45deg, ${primaryBlue}, #42a5f5)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontFamily,
              letterSpacing: 0.5,
            }}
          >
            Meet Our Team
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: primaryBlue,
              mb: 0,
              fontWeight: 400,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              maxWidth: 600,
              mx: 'auto',
              fontFamily,
              letterSpacing: 0.2,
            }}
          >
            The people behind our success
          </Typography>
        </Box>

        {/* Members Grid */}
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {members.map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member.id} display="flex" justifyContent="center">
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 2,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: cardGray,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  fontFamily,
                  width: '100%',
                  maxWidth: 320,
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.04)',
                    boxShadow: 6,
                  },
                }}
              >
                <Avatar
                  src={member.photo}
                  alt={member.name}
                  sx={{
                    width: 90,
                    height: 90,
                    mb: 2,
                    boxShadow: 2,
                    border: `3px solid ${primaryBlue}`,
                  }}
                />
                <Chip
                  label={member.department}
                  size="small"
                  sx={{ mb: 1, fontWeight: 500, letterSpacing: 0.5, fontFamily, bgcolor: primaryBlue, color: '#fff' }}
                />
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, textAlign: 'center', fontSize: '1.25rem', color: primaryBlue, fontFamily }}>
                  {member.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, color: primaryBlue, fontSize: '1.1rem', fontFamily }}>
                  {member.position}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', fontSize: '1.05rem', color: '#333', fontFamily }}>
                  {member.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Members; 