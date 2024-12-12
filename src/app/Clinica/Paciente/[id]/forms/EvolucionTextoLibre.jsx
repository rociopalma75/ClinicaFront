import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material';
import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
import { useSnackbar } from 'notistack';
import axios from 'axios';

function EvolucionTextoLibre({ descripcion, idPaciente, handleClose}) {
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState({
        informe: '',
    })

    const dataForm = {
        title: 'Informe de la evolución', type:'text', name: 'informe', required: true
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = idPaciente;
        try {
            const response = await axios.post(`/api/paciente/${id}/diagnostico/${descripcion}`, data);
            console.log(response.data);
            if (response.data.status == 200) {
                enqueueSnackbar("Evolucion creada exitosamente", { variant: "success" });
                handleClose();
                setTimeout(() => {
                    window.location.reload();
                }, 500); // 2000 ms = 2 seconds
            }
        } catch (error) {
            console.log("Error al hacer el POST: ", error)
        }
    }


    return (
        <>
            <Box sx={style} component='form' onSubmit={handleSubmit}>
                <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                    Crear nueva evolucion de texto libre
                </Typography>
                {
                   
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel>{dataForm.title}</InputLabel>
                        <Input fullWidth type={dataForm.type} name={dataForm.name} required onChange={handleChange} />
                        <FormHelperText></FormHelperText>
                    </FormControl>
                    
                }
                <Grid container justifyContent='center' sx={{ mt: 5 }}>
                    <Button variant='contained' color='success' sx={{ width: '40%' }} type='submit' >Confirmar</Button>
                </Grid>
            </Box>
        </>
    )
}

export default EvolucionTextoLibre