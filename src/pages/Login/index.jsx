import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid }} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));

    if (!data.payload) {
      return alert('Authorization failed');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } 
  };

  // React.useEffect();

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Log into account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type='email'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          { ...register('email', { required: 'Input email'})}
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="password"
          type='password'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth 
          { ...register('password', { required: 'Input password'})}
          />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Log in
        </Button>
      </form>
    </Paper>
  );
};
