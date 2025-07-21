"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Card, CardContent, IconButton, Grid, Button } from "@mui/material"
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "@mui/icons-material"

const partnerCompanies = [
  {
    id: 1,
    name: 'Saudi Aramco',
    logo: 'https://via.placeholder.com/200x100/1e40af/ffffff?text=Aramco',
    description: 'Leading energy company'
  },
  {
    id: 2,
    name: 'SABIC',
    logo: 'https://via.placeholder.com/200x100/059669/ffffff?text=SABIC',
    description: 'Global chemicals company'
  },
  {
    id: 3,
    name: 'STC',
    logo: 'https://via.placeholder.com/200x100/dc2626/ffffff?text=STC',
    description: 'Telecommunications leader'
  },
  {
    id: 4,
    name: 'Al Rajhi Bank',
    logo: 'https://via.placeholder.com/200x100/7c3aed/ffffff?text=Al+Rajhi',
    description: 'Islamic banking services'
  },
  {
    id: 5,
    name: 'Maaden',
    logo: 'https://via.placeholder.com/200x100/ea580c/ffffff?text=Maaden',
    description: 'Mining and metals'
  },
  {
    id: 6,
    name: 'NEOM',
    logo: 'https://via.placeholder.com/200x100/0891b2/ffffff?text=NEOM',
    description: 'Future city project'
  },
  {
    id: 7,
    name: 'Red Sea Global',
    logo: 'https://via.placeholder.com/200x100/be123c/ffffff?text=Red+Sea',
    description: 'Tourism development'
  },
  {
    id: 8,
    name: 'Qiddiya',
    logo: 'https://via.placeholder.com/200x100/166534/ffffff?text=Qiddiya',
    description: 'Entertainment destination'
  }
];

const PartnerCompanies = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

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
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === partnerCompanies.length - 4 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === partnerCompanies.length - 4 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? partnerCompanies.length - 4 : prevIndex - 1))
  }

  return (
    <Box
      id="partners"
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "3rem" },
              fontWeight: "bold",
              mb: 2,
              background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trusted by Leading Companies
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
            We partner with the most respected companies across Saudi Arabia and beyond, delivering exceptional
            logistics solutions that drive business success.
          </Typography>
        </Box>

        {/* Carousel Container */}
        <Box sx={{ position: "relative", maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 } }}>
          {/* Navigation Buttons */}
          <IconButton
            onClick={prevSlide}
            sx={{
              position: "absolute",
              left: { xs: 0, md: 0 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "white",
              border: `2px solid ${themeSettings.primary.main}`,
              color: themeSettings.primary.main,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
                bgcolor: themeSettings.primary.light,
                color: themeSettings.primary.dark,
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            sx={{
              position: "absolute",
              right: { xs: 0, md: 0 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "white",
              border: `2px solid ${themeSettings.primary.main}`,
              color: themeSettings.primary.main,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
                bgcolor: themeSettings.primary.light,
                color: themeSettings.primary.dark,
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Carousel Track */}
          <Box sx={{ overflow: 'hidden', borderRadius: 3, pb: 1, width: '100%', maxWidth: 1200, mx: 'auto', pl: { xs: 2, md: 4 }, pr: { xs: 2, md: 4 }, boxSizing: 'border-box' }}>
            <Box
              sx={{
                display: "flex",
                minWidth: "100%",
                width: "100%",
                transform: `translateX(-${currentIndex * 25}%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {partnerCompanies.map((company) => (
                <Box
                  key={company.id}
                  sx={{
                    minWidth: "25%",
                    px: 1,
                  }}
                >
                  <Card
                    sx={{
                      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      transition: "transform 0.3s ease",
                      bgcolor: "white",
                      boxShadow: 1,
                      borderRadius: 4,
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 120,
                          height: 60,
                          mb: 2,
                          overflow: "hidden",
                          borderRadius: 2,
                          bgcolor: "#f5f7fa",
                          border: "1px solid #e0e7ef",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={`${company.name} logo`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: "8px",
                          }}
                        />
                      </Box>
                      <Typography variant="h5" fontWeight="bold" color={themeSettings.text.primary} sx={{ mb: 1 }}>
                        {company.name}
                      </Typography>
                      <Typography variant="body1" color={themeSettings.text.secondary}>
                        {company.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Pagination Dots */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1 }}>
            {Array.from({ length: Math.ceil(partnerCompanies.length / 4) }).map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentIndex(index * 4)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: Math.floor(currentIndex / 4) === index ? themeSettings.primary.main : "#e0e7ef",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: themeSettings.primary.main,
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Mobile Grid */}
        <Grid container spacing={2} sx={{ mt: 6, display: 'none' }}>
          {partnerCompanies.slice(0, 8).map((company) => (
            <Grid item xs={6} sm={4} md={3} key={company.id}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 30,
                    mx: "auto",
                    mb: 1,
                    overflow: "hidden",
                    borderRadius: 1,
                    bgcolor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "4px",
                    }}
                  />
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {company.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Card sx={{ p: 4, maxWidth: 800, mx: "auto", borderRadius: 5, boxShadow: 3, bgcolor: "white" }}>
            <Typography variant="h3" fontWeight="bold" color={themeSettings.text.primary} sx={{ mb: 2 }}>
              Ready to Partner with Rwafi?
            </Typography>
            <Typography variant="h6" color={themeSettings.text.secondary} sx={{ mb: 3, fontSize: "1.2rem" }}>
              Join our network of trusted partners and experience seamless logistics solutions that drive your business
              forward in the Saudi Arabian market.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button variant="contained" size="large" sx={{ textTransform: "none", fontSize: "1.1rem", bgcolor: themeSettings.primary.main, color: "white", borderRadius: 3, px: 4, '&:hover': { bgcolor: themeSettings.primary.dark } }}>
                Become a Partner
              </Button>
              <Button variant="outlined" size="large" sx={{ textTransform: "none", fontSize: "1.1rem", borderColor: themeSettings.primary.main, color: themeSettings.primary.main, borderRadius: 3, px: 4, bgcolor: "white", '&:hover': { borderColor: themeSettings.primary.dark, color: themeSettings.primary.dark, background: themeSettings.primary.light + '11' } }}>
                Learn More
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}

export default PartnerCompanies
