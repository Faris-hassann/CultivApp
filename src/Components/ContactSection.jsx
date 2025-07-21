"use client"
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import { Phone as PhoneIcon, Email as EmailIcon, LocationOn as LocationIcon } from "@mui/icons-material"

const ContactSection = () => {
  // Get the home page theme settings for light mode
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
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  }

  return (
    <Box
      id="contact"
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: { xs: 'auto', md: '80vh' } }}>
        <Box sx={{ textAlign: "center", mb: 8, width: '100%' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3rem" },
              fontWeight: "bold",
              mb: 2,
              color: themeSettings.primary.main,
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: themeSettings.text.secondary,
              maxWidth: 800,
              mx: "auto",
              fontSize: "1.3rem",
              lineHeight: 1.6,
            }}
          >
            Ready to start your business journey in Saudi Arabia? Contact us today for a free consultation and personalized service plan.
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 1000, mx: "auto", width: "100%", display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ p: { xs: 2, md: 4 }, boxShadow: 3, borderRadius: 5, bgcolor: 'white', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={6} justifyContent="center" alignItems="center">
              {/* Contact Info, Email, Location - responsive */}
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="h4" fontWeight="bold" color={themeSettings.text.primary} sx={{ mb: 3 }}>
                  Contact Information
                </Typography>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: themeSettings.primary.main, width: 48, height: 48 }}>
                        <PhoneIcon sx={{ color: 'white' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="+966 50 123 4567"
                      secondary="24/7 Support"
                      primaryTypographyProps={{ fontWeight: "bold", fontSize: "1.1rem", color: themeSettings.text.primary }}
                      secondaryTypographyProps={{ fontSize: "1rem", color: themeSettings.text.secondary }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="h4" fontWeight="bold" color={themeSettings.text.primary} sx={{ mb: 3 }}>
                  Email
                </Typography>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: themeSettings.primary.main, width: 48, height: 48 }}>
                        <EmailIcon sx={{ color: 'white' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="info@rwafi.sa"
                      secondary="Business Inquiries"
                      primaryTypographyProps={{ fontWeight: "bold", fontSize: "1.1rem", color: themeSettings.text.primary }}
                      secondaryTypographyProps={{ fontSize: "1rem", color: themeSettings.text.secondary }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Typography variant="h4" fontWeight="bold" color={themeSettings.text.primary} sx={{ mb: 3 }}>
                  Location
                </Typography>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: themeSettings.primary.main, width: 48, height: 48 }}>
                        <LocationIcon sx={{ color: 'white' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Riyadh, Saudi Arabia"
                      secondary="Main Office"
                      primaryTypographyProps={{ fontWeight: "bold", fontSize: "1.1rem", color: themeSettings.text.primary }}
                      secondaryTypographyProps={{ fontSize: "1rem", color: themeSettings.text.secondary }}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color={themeSettings.text.primary} sx={{ mb: 3 }}>
                  Send us a Message
                </Typography>
                <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, px: { xs: 0, md: 1 }, alignItems: 'center', width: '100%' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        label="Your Name" 
                        variant="outlined"
                        InputProps={{
                          style: { fontSize: "1.1rem", color: themeSettings.text.primary },
                          sx: {
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: themeSettings.primary.main,
                              borderRadius: 3,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: themeSettings.primary.dark,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: themeSettings.primary.main,
                            },
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: "1.1rem", color: themeSettings.text.primary }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        label="Your Email" 
                        type="email" 
                        variant="outlined"
                        InputProps={{
                          style: { fontSize: "1.1rem", color: themeSettings.text.primary },
                          sx: {
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: themeSettings.primary.main,
                              borderRadius: 3,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: themeSettings.primary.dark,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: themeSettings.primary.main,
                            },
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: "1.1rem", color: themeSettings.text.primary }
                        }}
                      />
                    </Grid>
                  </Grid>
                  <TextField 
                    fullWidth 
                    label="Your Message" 
                    multiline 
                    rows={5} 
                    variant="outlined"
                    InputProps={{
                      style: { fontSize: "1.1rem", color: themeSettings.text.primary },
                      sx: {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: themeSettings.primary.main,
                          borderRadius: 3,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: themeSettings.primary.dark,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: themeSettings.primary.main,
                        },
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: "1.1rem", color: themeSettings.text.primary }
                    }}
                  />
                  <Box sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",
                    mt: 4,
                    mb: 2,
                    width: "100%"
                  }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        textTransform: "none",
                        borderRadius: 3,
                        py: 2,
                        px: 8,
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        bgcolor: themeSettings.primary.main,
                        color: 'white',
                        boxShadow: 4,
                        minWidth: 250,
                        height: 56,
                        '&:hover': {
                          bgcolor: themeSettings.primary.dark,
                          transform: "translateY(-3px)",
                          boxShadow: 8,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}

export default ContactSection