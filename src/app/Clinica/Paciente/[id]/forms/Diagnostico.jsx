import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material';
import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
import axios from 'axios';
import { useSnackbar } from 'notistack';

function Diagnostico({updateList, idPaciente, handleClose}) {
    
    const [formData, setFormData] = useState({
        descripcion: ''
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name] : e.target.value
        })
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #0000',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const id = idPaciente;
        try{
            const response = await axios.post(`/api/paciente/${id}/diagnostico`, formData);
            if(response.data.status == 200){
                enqueueSnackbar("Diagnostico creado exitosamente", {variant:"success"});
                updateList();
                handleClose();
            }
        }catch(error){
            console.log("Error al hacer el POST: ", error);
        }
    }

    const dataEvolucionTextoLibre = [
        { title: 'Nombre del diagnóstico', type: 'text', name: 'descripcion', required: true }
    ];

    return (
        <>
            <Box sx={style} component="form" onSubmit={handleSubmit} >
                <Typography variant="h6" component="h2" sx={{mb:3}}>
                    Crear nuevo diagnostico
                </Typography>
                {
                    dataEvolucionTextoLibre.map((item, index) => (
                        <FormControl key={index} sx={{width:'100%'}}>
                            <InputLabel>{item.title}</InputLabel>
                            <Input fullWidth type={item.type} name={item.name} required onChange={handleChange} />
                            <FormHelperText></FormHelperText>
                        </FormControl>
                    ))
                }
                <Grid container justifyContent='center' sx={{mt:5}}>
                    <Button variant='contained' color='success' sx={{width:'40%'}} type='submit' >Confirmar</Button>
                </Grid>
            </Box>
        </>
    )
}

export default Diagnostico