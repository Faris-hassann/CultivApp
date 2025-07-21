import React, { useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from "react-router-dom";
import { ToastContext } from "../../App";
import { isAuthenticated, getAccountById } from "../../Services/Employee";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Container, Card, CardContent, useTheme } from "@mui/material";

export default function Profile() {
  const { id } = useParams();
  const showToast = React.useContext(ToastContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getAccountById(id);

        const transformedProfile = {
          id: userData.Id,
          firstName: userData.FirstName,
          lastName: userData.LastName,
          phone: userData.PhoneNumber,
          birthdate: new Date(userData.DOB),
          nationalId: userData.NationalID,
          company: userData.CompanyID,
          subCompany: userData.SubCompanyID,
          branch: userData.BranchID,
          avatarUrl: userData.ProfileImageUrl,
          email: userData.Email
        };

        setProfile(transformedProfile);
        setOriginalProfile(transformedProfile);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        showToast('Error', 'Failed to load profile data');
      }
    };

    fetchUserProfile();
  }, [id, showToast]);

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setProfile(originalProfile);
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/User/UpdateUser/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          FirstName: profile.firstName,
          LastName: profile.lastName,
          PhoneNumber: profile.phone,
          DOB: profile.birthdate.toISOString(),
          NationalID: profile.nationalId,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setOriginalProfile(profile);
      setEditMode(false);
      showToast('Success', 'Profile updated successfully');
    } catch (err) {
      showToast('Error', 'Failed to update profile');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleBirthdateChange = (date) => {
    setProfile(prev => ({ ...prev, birthdate: date }));
    setShowCalendar(false);
  };

  const handleAvatarClick = () => {
    if (editMode && fileInputRef.current) fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`/api/User/UploadProfileImage/${profile.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const result = await response.json();
        setProfile(prev => ({ ...prev, avatarUrl: result.imageUrl }));
        showToast('Success', 'Profile image updated');
      } catch (err) {
        showToast('Error', 'Failed to upload image');
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, borderRadius: 2, boxShadow: 3, m: 5 }}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={4}>
            <Box position="relative" display="inline-block">
              <IconButton onClick={handleAvatarClick} sx={{ position: "absolute", bottom: 0, right: 0 }}>
                {editMode && <EditIcon color="primary" />}
              </IconButton>
              <Avatar
                alt="Profile"
                src={profile.avatarUrl}
                sx={{ width: 100, height: 100, margin: "0 auto", fontSize: 40 }}
                onClick={handleAvatarClick}
              >
                {!profile.avatarUrl && profile.firstName[0]}
              </Avatar>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleAvatarChange}
                disabled={!editMode}
              />
            </Box>
            <Typography variant="h5" mt={2} color={theme.palette.text.primary}>
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {profile.email}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {[
              ["First Name", "firstName"],
              ["Last Name", "lastName"],
              ["Phone Number", "phone"],
              ["Birthdate", "birthdate"],
              ["Egyptian National ID", "nationalId"],
              ["Company", "company"],
              ["Sub-Company", "subCompany"],
              ["Branch", "branch"],
            ].map(([label, name]) => (
              <Grid item xs={12} sm={6} key={name}>
                {name === "birthdate" ? (
                  <>
                    <TextField
                      label={label}
                      name={name}
                      value={profile.birthdate.toLocaleDateString()}
                      onFocus={() => editMode && setShowCalendar(true)}
                      InputProps={{ readOnly: true }}
                      disabled={!editMode}
                      fullWidth
                    />
                    {showCalendar && editMode && (
                      <Box mt={1} position="absolute" zIndex={1000}>
                        <CalendarMonthIcon
                          mode="single"
                          selected={profile.birthdate}
                          onSelect={handleBirthdateChange}
                          initialFocus
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <TextField
                    label={label}
                    name={name}
                    value={profile[name]}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    fullWidth
                  />
                )}
              </Grid>
            ))}
          </Grid>

          <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
            {!editMode ? (
              <Button variant="contained" onClick={handleEdit} startIcon={<EditIcon />} sx={{ color: '#fff' }}>Edit</Button>
            ) : (
              <Box display="flex" gap={2}>
                <Button color="success" variant="contained" onClick={handleSave} startIcon={<SaveIcon />} sx={{ color: '#fff' }}>Save</Button>
                <Button variant="outlined" onClick={handleCancel} startIcon={<CancelIcon />} sx={{ color: '#fff', borderColor: theme.palette.primary.main, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>Cancel</Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" color="error" onClick={handleLogout} startIcon={<LogoutIcon />} sx={{ color: '#fff' }}>Logout</Button>
      </Box>
    </Container>
  );
}
