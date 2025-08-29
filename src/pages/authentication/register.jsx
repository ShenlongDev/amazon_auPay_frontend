import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Material-UI
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ReactLoading from 'react-loading'; // Ensure you have this imported

// Project import
import AuthWrapper from './AuthWrapper';
import AuthRegister from './auth-forms/AuthRegister';

// ================================|| REGISTER ||================================ //

export default function Register() {
  return (

    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">新規登録</Typography>
            <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              既に登録済みの方
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>

  );
}