import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  useTheme,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Material Icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import GavelIcon from '@mui/icons-material/Gavel';

const services = [
  {
    title: 'Create User',
    icon: <PersonAddIcon fontSize="large" />,
    path: '/Users',
  },
  {
    title: 'Deactivate User',
    icon: <PersonOffIcon fontSize="large" />,
    path: '/deactivate-user',
  },
  {
    title: 'Topping Up',
    icon: <AccountBalanceWalletIcon fontSize="large" />,
    path: '/topping-up',
  },
  {
    title: 'Transfer Request',
    icon: <CompareArrowsIcon fontSize="large" />,
    path: '/transfer-request',
  },
  {
    title: 'Complaint',
    icon: <ReportProblemIcon fontSize="large" />,
    path: '/complaint',
  },
  {
    title: 'Government Affairs',
    icon: <GavelIcon fontSize="large" />,
    path: '/government-affairs',
  },
];

function Index() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 3,
          mb: 3,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            Internal Services Forms
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3} justifyContent="center">
        {services.map((service) => (
          <Grid item key={service.title}>
            <Box
              onClick={() => navigate(service.path)}
              sx={{
                cursor: 'pointer',
                width: '18rem',
                height: '13rem',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
            >
              <Card
                sx={{
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  borderRadius: 3,
                  height: '100%',
                  boxShadow: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Box sx={{ mb: 2 }}>{service.icon}</Box>
                <Typography variant="h6" fontSize="1.2rem">
                  {service.title}
                </Typography>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container >
  );
}

export default Index;
