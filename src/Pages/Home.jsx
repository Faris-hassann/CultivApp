"use client"
import { Box } from "@mui/material"
import Header from "../Components/Header"
import Hero from "../Components/Hero"
import SearchSection from "../Components/SearchSection"
import PartnerCompanies from "../Components/PartnerCompanies"
import AboutSection from "../Components/AboutSection"
import ContactSection from "../Components/ContactSection"
import Footer from "../Components/Footer"

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />
      <Hero />
      <SearchSection />
      <PartnerCompanies />
      <AboutSection />
      <ContactSection />
      <Footer />
    </Box>
  )
}
