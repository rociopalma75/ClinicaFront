'use client';
import {Button, Fab, FormControl, FormHelperText, Input, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid2"
import NavigationIcon from '@mui/icons-material/Navigation';
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function Home() {
    const dataForm = [
        {label:'Nombre', name:'nombre', type:'text', required:true},
        {label:'Apellido', name:'apellido', type:'text', required:true},
        {label:'Matricula Medica', name:'matriculaMedica', type:'text', required:true},
        {label:'Especialidad', name:'especialidad', type:'text', required:true},
        {label:'Correo', name:'correo', type:'email', required:true},
        {label:'Clave', name:'clave', type:'password', required:true}
    ]
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [data, setData] = useState(
        dataForm.reduce((acc, item) =>{
            acc[item.name] = '';
            return acc;
        }, {})
    )
    const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try{
      const response = await axios.post('/api/auth/register', data);
      if(response.data.status == 200){
        enqueueSnackbar("Medico/a creado exitosamente", {variant:"success"});
        router.push("/");
      }
      if(response.data.status == 400){
        enqueueSnackbar(`${response.data.message?.errors ? "Ingreso datos incorrectos" : response.data.message}`, {variant:"warning"});
      }
      if(response.data.message?.errors){
        const resErrors = response.data.message.errors;
        const keyErrors = Object.keys(resErrors);
        setErrors(
          keyErrors.reduce((acc, item) => {
            const keyItem = item.toLowerCase();
            acc[keyItem] = resErrors[item][0];
            return acc;
          },{})
        )
        console.log(errors);
      }


    }catch(error){
      console.log("Error al hacer el POST: ", error);
    }

  }

  return (
    <>
      <Grid container size={12} justifyContent='center' sx={{minHeight:'100vh', bgcolor:'#00001a'}} alignContent='center' >
        <Grid container component='form' onSubmit={handleSubmit}  sx={{
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
                    <Input type={item.type} name={item.name} required onChange={handleChange} error={!!errors[item.name] }/>
                    <FormHelperText>{errors[item.name] ?? errors[item.name]}</FormHelperText>
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
