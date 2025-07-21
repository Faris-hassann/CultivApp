import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowBack,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
// import { signup } from "../services/auth"; // Optional: your signup API service
import { saveAuth } from "../utils/auth"; // Optional: if saving auth data locally

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [, navigate] = useLocation();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignup = async (data) => {
    setIsSignupLoading(true);
    try {
      const { confirmPassword, ...signupData } = data;

      // Fake response from backend or call your real signup API here
      const response = {
        userId: "1234",
        fullname: signupData.fullName,
        userEmail: signupData.email,
        token: "fake-jwt-token",
        companyID: null,
        subCompanyID: null,
        branchID: null,
        role: "user",
      };

      // Save to localStorage
      saveAuth(response);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f9fafe",
        py: 8,
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={4} sx={{ maxWidth: 500, width: "100%", p: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton href="/">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" ml={1}>
            Back to Home
          </Typography>
        </Box>

        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Join us to streamline your logistics operations
          </Typography>
        </Box>

        <form onSubmit={form.handleSubmit(handleSignup)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                fullWidth
                {...form.register("fullName")}
                error={!!form.formState.errors.fullName}
                helperText={form.formState.errors.fullName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                fullWidth
                {...form.register("email")}
                error={!!form.formState.errors.email}
                helperText={form.formState.errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...form.register("password")}
                error={!!form.formState.errors.password}
                helperText={form.formState.errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                {...form.register("confirmPassword")}
                error={!!form.formState.errors.confirmPassword}
                helperText={form.formState.errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSignupLoading}
              >
                {isSignupLoading ? "Creating account..." : "Create Account"}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Divider sx={{ my: 4 }}>Or continue with</Divider>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width={20}
                />
              }
            >
              Google
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={
                <img
                  src="https://www.svgrepo.com/show/475700/facebook-color.svg"
                  alt="Facebook"
                  width={20}
                />
              }
            >
              Facebook
            </Button>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            Already have an account? <a href="/signin">Sign in</a>
          </Typography>
        </Box>

        <Box mt={2} textAlign="center">
          <Typography variant="caption" color="textSecondary">
            By creating an account, you agree to our{" "}
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
