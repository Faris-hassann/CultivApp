import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  useTheme,
  Avatar,
  Chip,
} from '@mui/material';
import { Person, Email, Phone, LocationOn } from '@mui/icons-material';

// Dummy data for members
const dummyMembers = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    position: 'Senior Software Engineer',
    description: 'Experienced full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about creating scalable and user-friendly applications.',
    email: 'ahmed.hassan@company.com',
    phone: '+966 50 123 4567',
    location: 'Riyadh, Saudi Arabia',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    department: 'Engineering',
    experience: '8 years'
  },
  {
    id: 2,
    name: 'Fatima Al-Zahra',
    position: 'Product Manager',
    description: 'Strategic product leader with a track record of launching successful digital products. Focuses on user-centered design and data-driven decision making.',
    email: 'fatima.alzahra@company.com',
    phone: '+966 55 987 6543',
    location: 'Jeddah, Saudi Arabia',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    department: 'Product',
    experience: '6 years'
  },
  {
    id: 3,
    name: 'Omar Khalil',
    position: 'UX/UI Designer',
    description: 'Creative designer specializing in user experience and interface design. Creates intuitive and beautiful digital experiences that users love.',
    email: 'omar.khalil@company.com',
    phone: '+966 54 456 7890',
    location: 'Dammam, Saudi Arabia',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    department: 'Design',
    experience: '5 years'
  },
  {
    id: 4,
    name: 'Layla Mohammed',
    position: 'Data Scientist',
    description: 'Analytical expert with deep knowledge in machine learning and statistical analysis. Transforms complex data into actionable business insights.',
    email: 'layla.mohammed@company.com',
    phone: '+966 56 789 0123',
    location: 'Riyadh, Saudi Arabia',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    department: 'Analytics',
    experience: '7 years'
  },
  {
    id: 5,
    name: 'Youssef Ibrahim',
    position: 'DevOps Engineer',
    description: 'Infrastructure specialist focused on automation, scalability, and reliability. Ensures smooth deployment and operation of critical systems.',
    email: 'youssef.ibrahim@company.com',
    phone: '+966 57 321 0987',
    location: 'Jeddah, Saudi Arabia',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    department: 'Operations',
    experience: '9 years'
  },
  {
    id: 6,
    name: 'Aisha Rahman',
    position: 'Marketing Specialist',
    description: 'Digital marketing expert with expertise in social media, content strategy, and brand development. Drives growth through innovative marketing campaigns.',
    email: 'aisha.rahman@company.com',
    phone: '+966 58 654 3210',
    location: 'Dammam, Saudi Arabia',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    department: 'Marketing',
    experience: '4 years'
  },
  {
    id: 7,
    name: 'Khalid Mansour',
    position: 'Business Analyst',
    description: 'Strategic thinker who bridges the gap between business needs and technical solutions. Specializes in process optimization and requirements analysis.',
    email: 'khalid.mansour@company.com',
    phone: '+966 59 012 3456',
    location: 'Riyadh, Saudi Arabia',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    department: 'Business',
    experience: '6 years'
  },
  {
    id: 8,
    name: 'Nour El-Din',
    position: 'Quality Assurance Engineer',
    description: 'Dedicated QA professional ensuring software quality through comprehensive testing strategies. Committed to delivering bug-free, user-friendly applications.',
    email: 'nour.eldin@company.com',
    phone: '+966 50 789 4561',
    location: 'Jeddah, Saudi Arabia',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    department: 'Quality',
    experience: '5 years'
  }
];

function Members() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Card */}
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 3,
          mb: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Our Team Members
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Meet the talented professionals who make our company successful
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={`${dummyMembers.length} Members`} color="primary" />
            <Chip label="Active Team" color="success" />
          </Box>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <Grid container spacing={3}>
        {dummyMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRadius: 3,
                boxShadow: 2,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              {/* Member Photo */}
              <Box sx={{ position: 'relative', p: 2, pb: 0 }}>
                <Avatar
                  src={member.photo}
                  alt={member.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    border: `4px solid ${theme.palette.primary.main}`,
                    boxShadow: 2,
                  }}
                />
                <Chip
                  label={member.department}
                  size="small"
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontSize: '0.75rem',
                  }}
                />
              </Box>

              {/* Member Info */}
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 2 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {member.name}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 'medium',
                    mb: 2,
                    fontSize: '0.9rem'
                  }}
                >
                  {member.position}
                </Typography>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 3,
                    lineHeight: 1.6,
                    fontSize: '0.85rem'
                  }}
                >
                  {member.description}
                </Typography>

                {/* Contact Info */}
                <Box sx={{ textAlign: 'left', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {member.email}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {member.phone}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {member.location}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {member.experience} experience
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Members; 