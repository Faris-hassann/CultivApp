"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  InputAdornment,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material"
import {
  Search as SearchIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  AccountBalance as GovernmentIcon,
  LocalShipping as LogisticsIcon,
  People as HRIcon,
  TrendingUp as TrendingIcon,
  LocationOn as LocationIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material"

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isSearching, setIsSearching] = useState(false)

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
  const categories = [
    { id: "all", name: "All Services", icon: BusinessIcon },
    { id: "documentation", name: "Documentation", icon: DescriptionIcon },
    { id: "government", name: "Government Services", icon: GovernmentIcon },
    { id: "logistics", name: "Logistics", icon: LogisticsIcon },
    { id: "hr", name: "HR Services", icon: HRIcon },
  ]

  const popularSearches = [
    "Business Registration",
    "Visa Processing",
    "Customs Clearance",
    "Document Translation",
    "Work Permits",
    "Company Formation",
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    setIsSearching(true)

    setTimeout(() => {
      setIsSearching(false)
      console.log("Searching for:", searchQuery, "in category:", selectedCategory)
    }, 1000)
  }

  const handleQuickSearch = (query) => {
    setSearchQuery(query)
    console.log("Quick search for:", query)
  }

  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3.5rem" },
              fontWeight: "bold",
              mb: 2,
              background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Find the Right Service for Your Business
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1rem", md: "1.5rem" },
              fontWeight: "normal",
              color: themeSettings.text.secondary,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            Search through our comprehensive range of logistics and business services to find exactly what you need for
            your Saudi Arabian operations.
          </Typography>
        </Box>

        {/* Search Interface */}
        <Box sx={{ maxWidth: 1000, mx: "auto", mb: 6  }}>
          <Card sx={{ p: 4, boxShadow: 3, borderRadius: 3 , backgroundColor: "white" }}>
            <Box component="form" onSubmit={handleSearch}>
              {/* Category Selection */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Chip
                      key={category.id}
                      icon={<IconComponent />}
                      label={category.name}
                      onClick={() => setSelectedCategory(category.id)}
                      variant={selectedCategory === category.id ? "filled" : "outlined"}
                      color={selectedCategory === category.id ? "primary" : "default"}
                      sx={{
                        fontWeight: 500,
                        fontSize: "1.1rem",
                        px: 2.5,
                        py: 1.2,
                        borderRadius: "999px",
                        color: selectedCategory === category.id ? "white" : themeSettings.text.primary,
                        backgroundColor: selectedCategory === category.id ? themeSettings.primary.main : "white",
                        border: selectedCategory === category.id ? "none" : `1.5px solid #d1d5db`,
                        boxShadow: selectedCategory === category.id ? `0 2px 8px ${themeSettings.primary.main}22` : undefined,
                        transition: "all 0.2s",
                        '& .MuiChip-icon': {
                          color: selectedCategory === category.id ? 'white' : themeSettings.text.primary,
                        },
                      }}
                    />
                  )
                })}
              </Box>

              {/* Search Input */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services, documents, or requirements..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: themeSettings.text.secondary, fontSize: 28 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "18px",
                      fontSize: "1.2rem",
                      height: 56,
                      background: "#fff",
                      border: `2px solid ${themeSettings.primary.main}`,
                      boxShadow: "none",
                      px: 2,
                      "& fieldset": {
                        borderColor: themeSettings.primary.main,
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: themeSettings.text.secondary,
                      opacity: 1,
                      fontSize: "1.1rem",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSearching || !searchQuery.trim()}
                  sx={{
                    px: 4,
                    borderRadius: "18px",
                    textTransform: "none",
                    minWidth: 120,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    bgcolor: isSearching || !searchQuery.trim() ? "#e0e0e0" : themeSettings.primary.main,
                    color: isSearching || !searchQuery.trim() ? themeSettings.text.secondary : "white",
                    boxShadow: "none",
                  }}
                >
                  {isSearching ? <CircularProgress size={24} color="inherit" /> : "Search"}
                </Button>
              </Box>
            </Box>

            {/* Popular Searches */}
            <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 2, color: themeSettings.text.secondary }}>
                Popular Searches:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {popularSearches.map((search) => (
                  <Chip
                    key={search}
                    label={search}
                    variant="outlined"
                    size="small"
                    onClick={() => handleQuickSearch(search)}
                    sx={{
                      borderRadius: "999px",
                      fontSize: "1rem",
                      px: 2,
                      py: 1,
                      fontWeight: 500,
                      color: themeSettings.text.primary,
                      border: `1.5px solid #d1d5db`,
                      background: "#fff",
                      '&:hover': {
                        bgcolor: themeSettings.primary.light + '22',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Search Results Preview */}
        {searchQuery && (
          <Box sx={{ maxWidth: 1000, mx: "auto", mb: 6 }}>
            <Card sx={{ borderRadius: 5, boxShadow: "0 8px 32px rgba(60, 60, 60, 0.10)", bgcolor: "white", p: 3 }}>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: themeSettings.text.primary }}>
                  Search Results for "{searchQuery}"
                </Typography>
                <List disablePadding>
                  {[1, 2, 3].map((item) => (
                    <ListItem
                      key={item}
                      sx={{
                        bgcolor: "#f7f9fa",
                        borderRadius: 3,
                        mb: 2,
                        px: 3,
                        py: 2.5,
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "none",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: themeSettings.primary.main, width: 56, height: 56 }}>
                          <BusinessIcon sx={{ color: "white", fontSize: 32 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ color: themeSettings.text.primary, fontWeight: 600, fontSize: "1.2rem" }}>
                            {searchQuery} Service {item}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" sx={{ color: themeSettings.text.secondary, fontSize: "1rem" }}>
                            Comprehensive solution for {searchQuery.toLowerCase()} requirements
                          </Typography>
                        }
                        sx={{ ml: 2 }}
                      />
                      <ListItemSecondaryAction>
                        <Button
                          variant="outlined"
                          size="large"
                          sx={{
                            borderRadius: "999px",
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                            fontSize: "1rem",
                            borderColor: themeSettings.primary.main,
                            color: themeSettings.primary.main,
                            background: "white",
                            '&:hover': {
                              borderColor: themeSettings.primary.dark,
                              color: themeSettings.primary.dark,
                              background: themeSettings.primary.light + '11',
                            },
                          }}
                        >
                          Learn More
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mt: 4  }} justifyContent="center" alignItems="center" textAlign="center" flexDirection={{ xs: "column", md: "row" }}>
          {[
            {
              icon: TrendingIcon,
              title: "Smart Search",
              description: "AI-powered search that understands your business needs and suggests relevant services.",
            },
            {
              icon: LocationIcon,
              title: "Local Expertise",
              description: "Deep understanding of Saudi Arabian regulations and business requirements.",
            },
            {
              icon: SpeedIcon,
              title: "Comprehensive Solutions",
              description: "End-to-end services from initial setup to ongoing operations and compliance.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: themeSettings.primary.main,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <feature.icon sx={{ fontSize: 38, color: "white" }} />
                </Avatar>
                <Typography variant="h5" fontWeight="bold" color="black" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color= {themeSettings.text.secondary}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default SearchSection