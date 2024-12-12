import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
import { useSnackbar } from 'notistack';
import { useParams } from 'next/navigation';
import axios from 'axios';

//Recibe descripcion del diagnostico y el id de la evolucion
function PedidoLaboratorio({ descripcion, idEvolucion }) {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState({
        descripcion: '', //Descripcion del pedidod
    })

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
        console.log(data);

        try {
            const response = await axios.post(`/api/paciente/${id}/diagnostico/${descripcion}/evolucion/${idEvolucion}/pedido`, data);
            if (response.data.status == 200) {
                enqueueSnackbar("Pedido creado exitosamente", { variant: "success" });
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
                    Registrar Pedido de Laboratorio
                </Typography>
                <FormControl sx={{ width: '100%', mb: 2 }}>
                    <InputLabel>Pedido de Laboratorio</InputLabel>
                    <Input fullWidth type="text" name="descripcion" required onChange={handleChange} />
                    <FormHelperText></FormHelperText>
                </FormControl>
                <Grid container justifyContent='center' sx={{ mt: 5 }}>
                    <Button variant='contained' color='success' sx={{ width: '40%' }} type='submit' >Confirmar</Button>
                </Grid>
            </Box>
        </>
    )
}

export default PedidoLaboratorio