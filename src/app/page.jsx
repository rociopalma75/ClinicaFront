'use client';
import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid2"
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useSnackbar } from "notistack";

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
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

      try{
          const response = await axios.post('/api/auth/login', credentials);
          
          if(response.status == 200){
              enqueueSnackbar("Medico/a inicio sesión correctamente", {variant:"success"});
              router.push("/Clinica/Paciente");
          }
          
      }catch(error){
          if(error.response){
            setError(error.response.data);
          }else{
            setError("Error al hacer el POST");
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
