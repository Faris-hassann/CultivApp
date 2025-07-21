"use client"
import { Box, Container, Typography, Button, Grid, Card, CardContent, Avatar, Chip, Paper } from "@mui/material"
import {
  ArrowForward as ArrowForwardIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Speed as SpeedIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate()

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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Box
      id="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        overflow: "hidden",
        pt: { xs: 4, lg: 6 },
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 80,
          left: 40,
          width: 400,
          height: 400,
          background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
          borderRadius: "50%",
          filter: "blur(40px)",
          opacity: 0.2,
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 160,
          right: 40,
          width: 400,
          height: 400,
          background: `linear-gradient(45deg, ${themeSettings.secondary.main}, ${themeSettings.secondary.light})`,
          borderRadius: "50%",
          filter: "blur(40px)",
          opacity: 0.2,
          animation: "pulse 4s ease-in-out infinite 2s",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={8} alignItems="center">
          {/* Content */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
              <Chip
                icon={<Box sx={{ width: 12, height: 12, bgcolor: themeSettings.primary.main, borderRadius: "50%" }} />}
                label="Leading Logistics Solutions in Saudi Arabia"
                sx={{
                  bgcolor: "rgba(249, 244, 244, 0.1)",
                  color: themeSettings.primary.main,
                  fontWeight: 500,
                  mb: 4,
                  fontSize: "1.2rem",
                  py: 1,
                  px: 2,
                  mt: 3, // Added margin top
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "5rem" },
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  color: themeSettings.text.primary,
                  mb: 4,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Simplify
                </Box>{" "}
                Your Business
                <br />
                Entry to Saudi Arabia
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: themeSettings.text.secondary,
                  mb: 6,
                  maxWidth: 600,
                  mx: { xs: "auto", lg: 0 },
                  fontSize: "1.5rem",
                  lineHeight: 1.6,
                }}
              >
                Your trusted partner for seamless business entry into the Saudi Arabian market. We handle all logistics
                complexities so you can focus on growth and success.
              </Typography>

              {/* CTA Buttons and Trust Indicators - aligned left together */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", lg: "flex-start" }, gap: 0 }}>
                {/* CTA Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 3,
                    justifyContent: { xs: "center", lg: "flex-start" },
                    mb: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate("/SignIn")}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: "1.3rem",
                      borderRadius: 3,
                      textTransform: "none",
                      bgcolor: themeSettings.primary.main,
                    }}
                  >
                    Get Started Today
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: "1.3rem",
                      borderRadius: 3,
                      border: `1px solid ${themeSettings.primary.main}`,
                      textTransform: "none",
                      color: themeSettings.primary.main,
                    }}
                  >
                    Watch Demo
                  </Button>
                </Box>
                {/* Trust Indicators */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: { xs: "center", lg: "flex-start" },
                    gap: 6,
                    pt: 0,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Box sx={{ display: "flex", ml: -1 }}>
                      {[1, 2, 3, 4].map((i) => (
                        <Avatar
                          key={i}
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: themeSettings.primary.main,
                            color: "white",
                            border: "3px solid white",
                            ml: -1,
                          }}
                        >
                          {i}
                        </Avatar>
                      ))}
                    </Box>
                    <Box>
                      <Typography variant="h5" fontWeight="bold" color="black">
                        500+ Companies
                      </Typography>
                      <Typography variant="h6" color={themeSettings.text.secondary}>
                        Trust Rwafi
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Avatar sx={{ bgcolor: themeSettings.success.light, width: 40, height: 40 }}>
                      <CheckCircleIcon sx={{ color: themeSettings.success.main, fontSize: "1.5rem" }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight="bold" color={themeSettings.success.main}>
                        99% Success Rate
                      </Typography>
                      <Typography variant="h6" color={themeSettings.text.secondary}>
                        Guaranteed Results
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Visual Element */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                position: "relative",
                maxWidth: 600,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 6, md: 8, lg: 0 }, // margin bottom for small/medium
                minHeight: { xs: 400, md: 450, lg: "auto" },
              }}
            >
              {/* Main Dashboard Card */}
              <Card
                sx={{
                  p: 4,
                  boxShadow: "0 8px 32px rgba(60, 60, 60, 0.10)",
                  borderRadius: 5,
                  bgcolor: "white",
                  minHeight: 320,
                  width: "100%",
                  maxWidth: 420,
                  cursor: { xs: "pointer", md: "pointer", lg: "default" },
                  transition: "transform 0.2s, box-shadow 0.2s",
                  '&:hover': {
                    transform: { xs: "scale(1.03)", md: "scale(1.03)", lg: "none" },
                    boxShadow: { xs: 6, md: 8, lg: "0 8px 32px rgba(60, 60, 60, 0.10)" },
                  },
                }}
                onClick={() => {
                  // Optional: Add navigation or modal open here for interactivity
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 4 }}>
                    {/* r icon */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: themeSettings.primary.main,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        color: "white",
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold">
                        R
                      </Typography>
                    </Box>
                    <Typography variant="h5" fontWeight="bold" color="black" sx={{ mb: 0.5 }}>
                      Rwafi Dashboard
                    </Typography>
                    <Typography variant="body1" color={themeSettings.text.secondary} sx={{ fontWeight: 400 }}>
                      Real-time tracking
                    </Typography>
                  </Box>

                  {/* Placeholder bars */}
                  <Box sx={{ mb: 4 }}>
                    {[70, 50, 85].map((width, index) => (
                      <Box
                        key={index}
                        sx={{
                          height: 12,
                          bgcolor: "#f2f4f8",
                          borderRadius: 2,
                          mb: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            width: `${width}%`,
                            bgcolor: "#e0e7ef",
                            borderRadius: 2,
                          }}
                        />
                      </Box>
                    ))}
                  </Box>

                  {/* Stats Section */}
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "#eaf3fe",
                          color: themeSettings.primary.main,
                          borderRadius: 3,
                          boxShadow: "none",
                        }}
                      >
                        <Typography variant="h3" fontWeight="bold" sx={{ color: themeSettings.primary.main, mb: 0.5 }}>
                          150+
                        </Typography>
                        <Typography variant="body1" sx={{ color: themeSettings.text.secondary, fontWeight: 400 }}>
                          Active Projects
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "#e6f7ef",
                          color: themeSettings.success.main,
                          borderRadius: 3,
                          boxShadow: "none",
                        }}
                      >
                        <Typography variant="h3" fontWeight="bold" sx={{ color: themeSettings.success.main, mb: 0.5 }}>
                          98%
                        </Typography>
                        <Typography variant="body1" sx={{ color: themeSettings.text.secondary, fontWeight: 400 }}>
                          Success Rate
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Floating Cards - Minimalist, no icons/avatars */}
              <Card
                sx={{
                  position: "absolute",
                  top: -38,
                  right: -38,
                  px: 4,
                  py: 2.5,
                  boxShadow: "0 4px 24px rgba(60, 60, 60, 0.10)",
                  borderRadius: 3,
                  bgcolor: "white",
                  zIndex: 2,
                  minWidth: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <SpeedIcon sx={{ color: themeSettings.primary.main, fontSize: "1.5rem" }} />
                <Typography variant="subtitle1" fontWeight="bold" color="black" sx={{ mb: 0.5 }}>
                  Fast Processing
                </Typography>
                <Typography variant="body2" sx={{ color: themeSettings.text.secondary, fontWeight: 400 }}>
                  24h response
                </Typography>
              </Card>

              <Card
                sx={{
                  position: "absolute",
                  bottom: -38,
                  left: -38,
                  px: 4,
                  py: 2.5,
                  boxShadow: "0 4px 24px rgba(60, 60, 60, 0.10)",
                  borderRadius: 3,
                  bgcolor: "white",
                  zIndex: 2,
                  minWidth: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <VerifiedIcon sx={{ color: themeSettings.primary.main, fontSize: "1.5rem" }} />
                <Typography variant="subtitle1" fontWeight="bold" color="black" sx={{ mb: 0.5 }}>
                  Verified
                </Typography>
                <Typography variant="body2" sx={{ color: themeSettings.text.secondary, fontWeight: 400 }}>
                  Government approved
                </Typography>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Hero