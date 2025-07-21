"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Container,
} from "@mui/material"
import { Menu as MenuIcon, Close as CloseIcon, Person as PersonIcon } from "@mui/icons-material"

const Header = () => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

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
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  }

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Partners", href: "#partners" },
    { name: "About", href: "#about" },
    { name: "Members", href: "/Members" },
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "/faq" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else if (href.startsWith("/")) {
      // Navigate to a different page using React Router
      navigate(href)
    }
    setMobileOpen(false)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              bgcolor: themeSettings.primary.main,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
              R
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: themeSettings.primary.main }}>
            Rwafi
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navigation.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={() => scrollToSection(item.href)}>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontSize: "1.1rem",
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          boxShadow: isScrolled ? 1 : 0,
          transition: "all 0.3s ease",
          borderBottom: isScrolled ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: { xs: 40, lg: 52 },
                  height: { xs: 40, lg: 52 },
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid white",
                  boxShadow: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: themeSettings.primary.main,
                    fontWeight: "bold",
                    fontSize: { xs: "1.3rem", lg: "1.8rem" },
                  }}
                >
                  R
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    background: `linear-gradient(45deg, ${themeSettings.primary.main}, ${themeSettings.primary.light})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "1.5rem", lg: "1.8rem" },
                  }}
                >
                  Rwafi
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: themeSettings.text.secondary,
                    display: { xs: "none", sm: "block" },
                    fontSize: "0.9rem",
                  }}
                >
                  Logistics Solutions
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1 }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  sx={{
                    color: themeSettings.text.primary,
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    fontSize: "1.1rem",
                    "&:hover": {
                      color: themeSettings.primary.main,
                      bgcolor: "rgba(25, 118, 210, 0.04)",
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* Desktop Avatar */}
            <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}>
              <IconButton onClick={handleMenuClick}>
                <Avatar sx={{ bgcolor: themeSettings.primary.main }}>
                  <PersonIcon sx={{ color: "white" }} />
                </Avatar>
              </IconButton>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { lg: "none" }, color: themeSettings.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawer}
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
      </Menu>
    </>
  )
}

export default Header