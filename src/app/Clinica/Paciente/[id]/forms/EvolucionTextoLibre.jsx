import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material';
import React from 'react'
import Grid from '@mui/material/Grid2'

function EvolucionTextoLibre() {
    const data = {
        title: 'Informe de la evolución',type:'text', name: 'informe', required: true
    }

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

    return (
        <>
            <Box sx={style} >
                <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                    Crear nueva evolucion de texto libre
                </Typography>
                {
                   
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel>{data.title}</InputLabel>
                        <Input fullWidth type={data.type} name={data.name} required />
                        <FormHelperText></FormHelperText>
                    </FormControl>
                    
                }
                <Grid container justifyContent='space-between' sx={{ mt: 5 }}>
                    <Button variant='contained' color='warning' sx={{ width: '40%' }}>Cancelar</Button>
                    <Button variant='contained' color='error' sx={{ width: '40%' }} >Confirmar</Button>
                </Grid>
            </Box>
        </>
    )
}

export default EvolucionTextoLibre