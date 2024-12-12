import { Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';

function DatosPaciente({ data }) {
    return (
        <>
            <Typography variant='h6' color='primary.main' textTransform='uppercase' sx={{ mb: 3 }}>{data.apellido}, {data.nombre} - {data.dni}</Typography>
            <Grid container>
                <Grid size={6}>
                    <Typography>Fecha de Nacimiento: {data.fechaNacimiento}</Typography>
                    {data?.obraSocialPaciente && (
                        <Typography>
                            Obra Social: Código - {data.obraSocialPaciente.codigo},  Sigla - {data.obraSocialPaciente.sigla}
                        </Typography>
                    )}
                    <Typography>Cuil: {data.cuil}</Typography>
                </Grid>
                <Grid size={6}>
                    <Typography>Correo: {data.email}</Typography>
                    <Typography>Domicilio: {data.domicilio}</Typography>
                    <Typography>Teléfono: {data.telefono}</Typography>
                </Grid>
            </Grid>
            
        </>
    )
}

export default DatosPaciente