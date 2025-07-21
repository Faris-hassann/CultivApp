import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
  CircularProgress,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Removed react-router-dom Link import since we'll use a native anchor tag
import { getActiveFAQs } from "../Services/FAQ";

const themeSettings = {
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
  },
  text: {
    primary: "#1a1a1a",
    secondary: "#666666",
  },
};

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getActiveFAQs();
        setFaqs(data);
      } catch (error) {
        console.error("Failed to fetch FAQs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        pt: { xs: 8, lg: 10 },
      }}
    >
      <Header />
      <Container sx={{ pt: 10, pb: 6, maxWidth: 800 }}>
        <Box
          component="a"
          href="/"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: themeSettings.text.secondary,
            mb: 4,
            textDecoration: "none",
            transition: "0.2s",
            "&:hover": { color: themeSettings.primary.main },
          }}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography variant="body2" fontWeight={500}>
            Back to Home
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip
            label="Frequently Asked Questions"
            sx={{
              bgcolor: themeSettings.primary.light,
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              mb: 2,
              px: 2,
              py: 1,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: themeSettings.primary.main,
              mb: 2,
              fontSize: { xs: "2.2rem", md: "3rem" },
            }}
          >
            How can we help you?
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: themeSettings.text.secondary, maxWidth: 600, mx: "auto" }}
          >
            Find answers to the most common questions about our services and platform.
          </Typography>
        </Box>

        {loading ? (
          <Box textAlign="center" mt={6}>
            <CircularProgress />
            <Typography variant="body2" mt={2} color="text.secondary">
              Loading FAQs...
            </Typography>
          </Box>
        ) : faqs.length === 0 ? (
          <Typography variant="body2" align="center" color="text.secondary">
            No FAQs available.
          </Typography>
        ) : (
          faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                mb: 2,
                border: `1px solid ${themeSettings.primary.light}33`, // primary/20
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "#fff",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: themeSettings.primary.main }} />}
                sx={{
                  px: 2,
                  py: 1,
                  fontWeight: 600,
                  color: themeSettings.primary.dark,
                  borderRadius: 2,
                  '&.Mui-expanded': { bgcolor: themeSettings.primary.light, color: "#fff" },
                }}
              >
                <Typography variant="subtitle1">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 2,
                  py: 2,
                  backgroundColor: "#f9f9f9",
                  color: themeSettings.text.primary,
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Container>
    </Box>
  );
};

export default FAQ;
