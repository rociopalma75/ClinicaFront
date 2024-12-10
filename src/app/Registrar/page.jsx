'use client';
import {Button, Fab, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid2"
import NavigationIcon from '@mui/icons-material/Navigation';

export default function Home() {
    const dataForm = [
        {label:'Nombre', name:'nombre', type:'text', required:true},
        {label:'Apellido', name:'apellido', type:'text', required:true},
        {label:'Matricula Medica', name:'matriculaMedica', type:'text', required:true},
        {label:'Especialidad', name:'especialidad', type:'text', required:true},
        {label:'Correo', name:'correo', type:'email', required:true},
        {label:'Clave', name:'clave', type:'password', required:true}
    ]

    const [data, setData] = useState(
        dataForm.reduce((acc, item) =>{
            acc[item.name] = '';
            return acc;
        }, {})
    )

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value
    })
  };



  return (
    <>
      <Grid container size={12} justifyContent='center' sx={{minHeight:'100vh', bgcolor:'#00001a'}} alignContent='center' >
        <Grid container component='form'   sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            width:500,
            height:'auto',
            padding:'4em'
          }} 
          flexDirection='column' spacing={2} >
          <Typography textAlign='center' variant="h5" color="primary.main">Crear nueva cuenta</Typography>
          {
            dataForm.map((item, index) => (
                <FormControl key={index}>
                    <InputLabel>{item.label}</InputLabel>
                    <Input type={item.type} name={item.name} required onChange={handleChange}/>
                    <FormHelperText></FormHelperText>
                </FormControl>
            ))
          }
          <Button variant="contained" type="submit" >Registrar</Button>
        </Grid>

      </Grid>
      <Fab variant="extended" sx={{position:'absolute', top:'2px', right:'5px', backgroundColor:'secondary.main', color:'white', '&:hover':{backgroundColor:'primary.main'}}}>
        <NavigationIcon sx={{ mr: 1 }} />
        <Link href="/">Volver</Link>
      </Fab>
    </>
  );
}
