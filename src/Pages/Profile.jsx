import React, { useState, useRef } from "react";
import {
  Avatar,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getAuth, clearAuth } from "../utils/auth";

export default function Profile() {
  const auth = getAuth();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    firstName: auth?.fullname?.split(" ")[0] || "First",
    lastName: auth?.fullname?.split(" ")[1] || "Last",
    phone: "+20 100 123 4567",
    birthdate: new Date(1995, 4, 15),
    nationalId: "29805150123456",
    company: auth?.companyID || "Rwafi Logistics",
    subCompany: auth?.subCompanyID || "Cargo Division",
    branch: auth?.branchID || "Cairo Branch",
    avatarUrl: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setProfile((prev) => ({ ...prev, ...getProfileFromAuth(auth) }));
    setEditMode(false);
  };

  const handleSave = () => {
    setEditMode(false);
    // You can optionally POST updated profile data to the backend here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    if (editMode && fileInputRef.current) fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile((prev) => ({ ...prev, avatarUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/";
  };

  const getProfileFromAuth = (authData) => ({
    firstName: authData?.fullname?.split(" ")[0] || "First",
    lastName: authData?.fullname?.split(" ")[1] || "Last",
    phone: "+20 100 123 4567",
    birthdate: new Date(1995, 4, 15),
    nationalId: "29805150123456",
    company: authData?.companyID || "Rwafi Logistics",
    subCompany: authData?.subCompanyID || "Cargo Division",
    branch: authData?.branchID || "Cairo Branch",
    avatarUrl: "",
  });

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        justifyContent: "center",
        bgcolor: "#f0f4ff",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={4} sx={{ maxWidth: 700, width: "100%", p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Box position="relative">
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar sx={{ width: 96, height: 96 }} src={profile.avatarUrl}>
                {profile.firstName[0]}
              </Avatar>
            </IconButton>
            {editMode && (
              <IconButton
                onClick={handleAvatarClick}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
              disabled={!editMode}
            />
          </Box>
          <Typography variant="h5" mt={2} fontWeight={600} textAlign="center">
            {profile.firstName} {profile.lastName}
          </Typography>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3}>
            {[
              "firstName",
              "lastName",
              "phone",
              "nationalId",
              "company",
              "subCompany",
              "branch",
            ].map((name) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  label={name
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  name={name}
                  value={profile[name]}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Birthdate"
                value={profile.birthdate}
                onChange={(newValue) =>
                  setProfile((prev) => ({ ...prev, birthdate: newValue }))
                }
                disabled={!editMode}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Box
          mt={4}
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          {!editMode ? (
            <Button onClick={handleEdit} startIcon={<EditIcon />}>
              Edit
            </Button>
          ) : (
            <Box display="flex" gap={2}>
              <Button onClick={handleSave} startIcon={<SaveIcon />}>
                Save
              </Button>
              <Button
                onClick={handleCancel}
                startIcon={<CancelIcon />}
                variant="outlined"
              >
                Cancel
              </Button>
            </Box>
          )}
          <Button
            onClick={handleLogout}
            color="error"
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
