'use client';
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid2"
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function Home() {
  const [credentials, setCredentials] = useState({
    correo: '',
    clave: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value
    })
  };
  const [error, setError] = useState()

  const router = useRouter();

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(credentials);

      try{
          const response = await axios.post('/api/auth/login', credentials);
          
          if(response.status == 200){
              router.push("/Clinica");
              console.log(response);
          }
          
      }catch(error){
          if(error.response){
            setError(error.response.data);
          }else{
            setError("Post mal hecho");
          }
      }
  }


  return (
    <>
      <Grid container size={12} justifyContent='center' sx={{minHeight:'100vh', bgcolor:'#00001a'}} alignContent='center' >
        <Grid container component='form' onSubmit={handleSubmit} sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            width:500,
            height:'auto',
            padding:'4em'
          }} 
          flexDirection='column' spacing={5}>
          <Typography textAlign='center' variant="h5" color="primary.main">Inciar Sesión</Typography>
          <FormControl>
            <InputLabel>Correo</InputLabel>
            <Input type='email' name='correo' required onChange={handleChange}/>
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>Contraseña</InputLabel>
            <Input type='password' name='clave' required onChange={handleChange}/>
            <FormHelperText></FormHelperText>
          </FormControl>
          <Typography variant="caption" color="primary.main" margin='2px'>No tenes una cuenta?<Link href='/Registrar'> Registrarse aquí</Link></Typography>
          <Typography variant="caption" color="warning">{error}</Typography>
          <Button variant="contained" type="submit" >Iniciar Sesión</Button>
        </Grid>

      </Grid>
    </>
  );
}
