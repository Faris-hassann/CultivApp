import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Divider,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const primaryBlue = '#1976d2';
const cardGray = '#e9eef6';
const fontFamily = 'Roboto, "Open Sans", Arial, sans-serif';

const initialUser = {
  firstName: 'Ahmed',
  lastName: 'Hassan',
  email: 'ahmed.hassan@email.com',
  nationalId: '1234567890',
  photo: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState(user);
  const [photoPreview, setPhotoPreview] = useState(user.photo);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setForm(user);
    setPhotoPreview(user.photo);
    setEditMode(false);
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target.result);
        setForm({ ...form, photo: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    setUser(form);
    setEditMode(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, #f5f7fa 0%, ${cardGray} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        py: 6,
      }}
    >
      <Card
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 5,
          boxShadow: 6,
          bgcolor: '#fff',
          minWidth: 340,
          maxWidth: 420,
          width: '100%',
        }}
      >
        {/* Back to Home Button */}
        <Box
          component="a"
          href="/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: '#666666',
            mb: 3,
            textDecoration: 'none',
            transition: '0.2s',
            fontWeight: 500,
            fontSize: '1rem',
            '&:hover': { color: primaryBlue },
          }}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography variant="body2" fontWeight={500} sx={{ fontFamily }}>
            Back to Home
          </Typography>
        </Box>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={photoPreview}
              alt={user.firstName + ' ' + user.lastName}
              sx={{ width: 100, height: 100, mb: 2, border: `3px solid ${primaryBlue}` }}
            />
            {editMode && (
              <>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-photo-upload"
                  type="file"
                  onChange={handlePhotoChange}
                />
                <label htmlFor="profile-photo-upload">
                  <IconButton color="primary" component="span">
                    <EditIcon />
                  </IconButton>
                </label>
              </>
            )}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: primaryBlue,
                mb: 1,
                fontFamily,
                letterSpacing: 0.5,
              }}
            >
              Profile
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: primaryBlue, fontWeight: 600, fontSize: '1.1rem', mb: 0.5, fontFamily }}>First Name</Typography>
              {editMode ? (
                <TextField
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 2, bgcolor: '#f5f7fa', borderRadius: 2 }}
                />
              ) : (
                <Typography variant="body1" sx={{ color: '#222', fontSize: '1.1rem', mb: 2, fontFamily }}>{user.firstName}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: primaryBlue, fontWeight: 600, fontSize: '1.1rem', mb: 0.5, fontFamily }}>Last Name</Typography>
              {editMode ? (
                <TextField
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 2, bgcolor: '#f5f7fa', borderRadius: 2 }}
                />
              ) : (
                <Typography variant="body1" sx={{ color: '#222', fontSize: '1.1rem', mb: 2, fontFamily }}>{user.lastName}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: primaryBlue, fontWeight: 600, fontSize: '1.1rem', mb: 0.5, fontFamily }}>Email</Typography>
              {editMode ? (
                <TextField
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 2, bgcolor: '#f5f7fa', borderRadius: 2 }}
                />
              ) : (
                <Typography variant="body1" sx={{ color: '#222', fontSize: '1.1rem', mb: 2, fontFamily }}>{user.email}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: primaryBlue, fontWeight: 600, fontSize: '1.1rem', mb: 0.5, fontFamily }}>National ID</Typography>
              {editMode ? (
                <TextField
                  name="nationalId"
                  value={form.nationalId}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{ mb: 2, bgcolor: '#f5f7fa', borderRadius: 2 }}
                />
              ) : (
                <Typography variant="body1" sx={{ color: '#222', fontSize: '1.1rem', mb: 2, fontFamily }}>{user.nationalId}</Typography>
              )}
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            {editMode ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{ textTransform: 'none', bgcolor: primaryBlue, borderRadius: 3, px: 4 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ textTransform: 'none', color: primaryBlue, borderColor: primaryBlue, borderRadius: 3, px: 4 }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{ textTransform: 'none', bgcolor: primaryBlue, borderRadius: 3, px: 4 }}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
