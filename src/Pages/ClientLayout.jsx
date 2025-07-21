"use client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useHomePageMode, ColorModeContext } from "./theme"
import { useEffect, useState } from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }) {
  const [theme, colorMode] = useHomePageMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              fontSize: "18px",
            }}
          >
            Loading...
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  )
}
