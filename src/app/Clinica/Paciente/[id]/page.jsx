'use client';

import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
import { Button, Card, CardContent, Fab, IconButton, Modal, Paper, SpeedDial, SpeedDialAction, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HealingIcon from '@mui/icons-material/Healing';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Diagnostico from './forms/Diagnostico';
import EvolucionTextoLibre from './forms/EvolucionTextoLibre';

function page() {
    const [modalDiagnostico, setModalDiagnostico] = useState(false);
    const [modalEvolTextoLibre, setModalEvolTextoLibre] = useState(false);
    const [modalEvolPlantilla, setModalEvolPlantilla] = useState(false);

    const actions = [
        { icon: <PostAddIcon />, name: 'Pedido de Laboratorio' },
        { icon: <HealingIcon />, name: 'Receta Dígital' },
      ];
    
    const handleModalEvolTextoLibre = (stateBool) => {
        setModalEvolTextoLibre(stateBool);
    }

    const handleModalEvolPlantilla = (stateBool) => {
        setModalEvolPlantilla(stateBool);
    }
    
      const actionsEvolucion = [
        { icon: <PostAddIcon />, name: 'Evolucion con Texto Libre', handleModal:handleModalEvolTextoLibre },
        { icon: <HealingIcon />, name: 'Evolucion con Plantilla', handleModal: handleModalEvolPlantilla },
      ];

    const handleModalDiag = (stateBool) => {
        setModalDiagnostico(stateBool);
    }



    return (
        <>
            <Paper variant='outlined' elevation={3} sx={{ mb: '1em', p:2}}> Datos del Paciente </Paper>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <Grid container  width='100%' justifyContent='space-between' alignItems='center' >
                        <Typography component='span'>Diagnósticos</Typography>
                        <IconButton onClick={() => handleModalDiag(true)}><AddCircleIcon/></IconButton>
                    </Grid>
                    <Button variant='contained' sx={{ p: '0.2em 0.5em' }}>Gripe</Button>
                    <Modal open={modalDiagnostico}>
                        <Diagnostico/>
                    </Modal>
                </Grid>
                <Grid size={3}>
                    <Typography sx={{ mb: '1em' }}>Evoluciones</Typography>
                    <Card>  
                        <CardContent>
                            <Typography sx={{ color: 'text.secondary' }}>Detalle de la evolución</Typography>
                            <Typography variant="subtitle2">Medico: Nombre del Médico</Typography>
                            <Typography variant="caption" component="p">~Fecha de evolucion</Typography>
                        </CardContent>
                    </Card>
                    <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{ position: 'absolute', bottom: 0, left:'48%'}}
                            icon={<SpeedDialIcon />}
                        >
                            {actionsEvolucion.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => action.handleModal(true)}
                            />
                            ))}
                        </SpeedDial>
                    
                    <Modal open={modalEvolTextoLibre}>
                        <EvolucionTextoLibre/>
                    </Modal>

                </Grid>
                <Grid size={6}>
                    <Typography sx={{ mb: '1em' }}>Plantillas</Typography>
                    <Grid container spacing={1}>
                        <Grid size={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant='body1'>Pedido de Laboratorio</Typography>
                                    <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>Detalle del pedido de laboratorio</Typography>
                                    <Typography variant="caption">~Medico: Nombre del Médico</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={6}>
                            <Card >
                                <CardContent>
                                    <Typography variant='body1'>Receta Dígital</Typography>
                                    <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>Detalle del pedido de laboratorio</Typography>
                                    <Typography variant="caption">~Medico: Nombre del Médico</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{ position: 'fixed', bottom: 0, right: 0 }}
                            icon={<SpeedDialIcon />}
                        >
                            {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                            ))}
                        </SpeedDial>
                     

                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default page