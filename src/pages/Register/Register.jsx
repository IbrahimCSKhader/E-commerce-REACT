import { Box, Button, Link ,TextField,Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React from 'react'
import axios from "axios";

export default function Register() {
  const {register , handleSubmit}= useForm({

  })
    const registerForm= async(values)=>{
    console.log(values);
    try {
     const res=  await axios.post(`https://knowledgeshop.runasp.net/api/Auth/Account/Register`,values)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box className='register-form'>
      <Typography variant="h1"  component='h1'>Registar page</Typography>

    <Box onSubmit={handleSubmit(registerForm)} variant="form" component='form' sx={{alignItems:'center', display:'flex' , flexDirection:'column ',gap:2, }}>
      <TextField {...register('userName')} label='username' name="userName" fullWidth variant="outlined" />
      <TextField {...register('fullName')} label='full name' name="fullName" fullWidth variant="outlined" />
      <TextField {...register('email')} label='email' name="email" fullWidth variant="outlined" />
      <TextField {...register('phoneNumber')} label='phone number' name="phoneNumber"  fullWidth variant="outlined" />
      <TextField {...register('password')} label='password' name="password" fullWidth variant="outlined" />
      <Button variant="contained" type="submit"  >Add</Button>
    </Box>

    </Box>
  )
}
