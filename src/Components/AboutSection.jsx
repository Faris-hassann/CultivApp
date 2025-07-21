"use client"
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { 
  CheckCircle as CheckCircleIcon,
  Business as BusinessIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  AttachMoney as AttachMoneyIcon,
  Public as PublicIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Handshake as HandshakeIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material"
import { useState, useEffect } from "react"

const AboutSection = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about')
      if (element) {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        setAnimate(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const benefits = [
    {
      icon: <PublicIcon />,
      title: "Local Expertise & Knowledge",
      description: "Deep understanding of Saudi business culture, regulations, and market dynamics"
    },
    {
      icon: <HandshakeIcon />,
      title: "Government Relations",
      description: "Strong connections with local authorities for faster approvals and compliance"
    },
    {
      icon: <SpeedIcon />,
      title: "Fast Processing Times",
      description: "Streamlined processes that save you time and accelerate your business setup"
    },
    {
      icon: <SupportIcon />,
      title: "Comprehensive Support",
      description: "End-to-end assistance from initial consultation to ongoing business operations"
    },
    {
      icon: <AttachMoneyIcon />,
      title: "Competitive Pricing",
      description: "Transparent, value-driven pricing with no hidden costs or surprises"
    },
    {
      icon: <SecurityIcon />,
      title: "Trusted Partnership",
      description: "Long-term relationships built on trust, reliability, and proven results"
    }
  ]

  const stats = [
    { number: "10+", label: "Years Experience", icon: <TrendingUpIcon />, color: themeSettings.primary.main },
    { number: "1000+", label: "Projects Completed", icon: <CheckCircleIcon />, color: themeSettings.success.main },
    { number: "500+", label: "Happy Clients", icon: <StarIcon />, color: "#ff9800" },
    { number: "24/7", label: "Support Available", icon: <SupportIcon />, color: "#9c27b0" }
  ]

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 80%, rgba(25, 118, 210, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box 
          sx={{ 
            textAlign: "center", 
            mb: { xs: 6, md: 10 },
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease-out"
          }}
        >
          <Chip 
            label="About Us" 
            color="primary" 
            sx={{ 
              mb: 2, 
              px: 2, 
              py: 1, 
              fontSize: "1rem",
              fontWeight: "bold"
            }} 
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              fontWeight: "bold",
              mb: 3,
              background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            Your Gateway to Success in Saudi Arabia
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: themeSettings.text.secondary,
              maxWidth: 900,
              mx: "auto",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            We are a leading logistics and business services company in Saudi Arabia, dedicated to helping businesses
            establish and grow their presence in the region with our comprehensive solutions and local expertise.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 3,
              background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
              boxShadow: 3,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 6,
              },
              transition: "all 0.3s ease",
            }}
          >
            Learn More About Us
          </Button>
        </Box>

        {/* Stats Section - Full Width & Centered */}
        <Box 
          sx={{ 
            mb: { xs: 6, md: 10 },
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease-out 0.2s",
            width: "100vw",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
            py: 6,
            background: "linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: "center" }}>
            <Grid container spacing={4} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Card 
                    sx={{ 
                      textAlign: "center", 
                      p: { xs: 3, md: 4 }, 
                      borderRadius: 4, 
                      boxShadow: 4,
                      background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}25)`,
                      border: `2px solid ${stat.color}30`,
                      transition: "all 0.3s ease",
                      height: "100%",
                      maxWidth: 280,
                      mx: "auto",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 8,
                        border: `2px solid ${stat.color}60`,
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: stat.color, 
                        width: { xs: 50, md: 70 }, 
                        height: { xs: 50, md: 70 }, 
                        mx: "auto", 
                        mb: 2,
                        boxShadow: 3
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography 
                      variant="h2" 
                      fontWeight="bold" 
                      sx={{ 
                        mb: 1,
                        background: `linear-gradient(45deg, ${stat.color}, ${stat.color}dd)`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: { xs: "1.8rem", md: "3rem", lg: "3.5rem" }
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: themeSettings.text.secondary,
                        fontWeight: "medium",
                        fontSize: { xs: "0.8rem", md: "1.1rem" }
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={6} alignItems="center">
          {/* Left Column - About Content */}
          <Grid item xs={12} lg={4}>
            <Box 
              sx={{ 
                opacity: animate ? 1 : 0,
                transform: animate ? "translateX(0)" : "translateX(-30px)",
                transition: "all 0.8s ease-out 0.4s"
              }}
            >
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                sx={{ 
                  mb: 3,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your Trusted Partner in Saudi Arabia
              </Typography>
              <Typography 
                variant="h6" 
                color={themeSettings.text.secondary} 
                sx={{ 
                  mb: 4, 
                  lineHeight: 1.8, 
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  textAlign: "justify"
                }}
              >
                With over a decade of experience in the Saudi market, we understand the unique challenges and 
                opportunities that businesses face when entering this dynamic region. Our comprehensive services 
                ensure a smooth and successful business establishment, backed by our deep local knowledge and 
                strong government relationships.
              </Typography>

              <Button
                variant="outlined"
                size="large"
                startIcon={<BusinessIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: 3,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Explore Our Services
              </Button>
            </Box>
          </Grid>

          {/* Right Column - Why Choose Us (Wider) */}
          <Grid item xs={12} lg={8}>
            <Card 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                boxShadow: 4,  
                borderRadius: 4, 
                bgcolor: 'white',
                mt: { xs: 4, lg: 0 },
                opacity: animate ? 1 : 0,
                transform: animate ? "translateX(0)" : "translateX(30px)",
                transition: "all 0.8s ease-out 0.6s",
                "&:hover": {
                  boxShadow: 8,
                }
              }}
            >
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography 
                  variant="h3" 
                  fontWeight="bold" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                    background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Why Choose Rwafi?
                </Typography>
                <Typography 
                  variant="body1" 
                  color={themeSettings.text.secondary}
                  sx={{ fontSize: "1.1rem" }}
                >
                  Discover what makes us the preferred choice for businesses in Saudi Arabia
                </Typography>
              </Box>
              
              <Grid container spacing={4} justifyContent="center">
                {benefits.map((benefit, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        p: 3,
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "rgba(25, 118, 210, 0.05)",
                          transform: "translateY(-4px)",
                        },
                        opacity: animate ? 1 : 0,
                        transform: animate ? "translateY(0)" : "translateY(20px)",
                        transition: `all 0.5s ease-out ${0.8 + index * 0.1}s`,
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: themeSettings.primary.main, 
                          width: { xs: 60, sm: 70, md: 80 }, 
                          height: { xs: 60, sm: 70, md: 80 },
                          boxShadow: 3,
                          mb: 3,
                          "&:hover": {
                            transform: "scale(1.1)",
                            boxShadow: 4,
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        {benefit.icon}
                      </Avatar>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                          color: themeSettings.text.primary,
                          mb: 2,
                          textAlign: "center",
                          lineHeight: 1.3,
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: themeSettings.text.secondary,
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          lineHeight: 1.7,
                          textAlign: "center",
                          maxWidth: 280,
                          mx: "auto",
                        }}
                      >
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>

        
      </Container>
    </Box>
  )
}

export default AboutSection
