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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "wouter";
import { getAllFAQ } from "../Services/FAQ"; // Adjust path as needed

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getAllFAQ();
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header />
      <Container sx={{ pt: 12, pb: 6, maxWidth: 800 }}>
        <Box
          component={Link}
          href="/"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            mb: 4,
            textDecoration: "none",
            transition: "0.2s",
            "&:hover": { color: "text.primary" },
          }}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography variant="body2" fontWeight={500}>
            Back to Home
          </Typography>
        </Box>

        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(to right, #3b82f6, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 4,
          }}
        >
          Frequently Asked Questions
        </Typography>

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
                border: "1px solid rgba(59, 130, 246, 0.2)", // primary/20
                borderRadius: 2,
                boxShadow: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 2,
                  py: 1,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                <Typography variant="subtitle1">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 2,
                  py: 2,
                  backgroundColor: "rgba(59, 130, 246, 0.05)", // primary/5
                  color: "text.secondary",
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
