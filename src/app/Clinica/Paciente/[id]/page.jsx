'use client';

import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import { Button, Fab, IconButton, Modal, Paper, SpeedDial, SpeedDialAction, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HealingIcon from '@mui/icons-material/Healing';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Diagnostico from './forms/Diagnostico';
import EvolucionTextoLibre from './forms/EvolucionTextoLibre';
import axios from 'axios';
import CardEvolucion from './components/CardEvolucion';
import CardPedido from './components/CardPedido';
import CardReceta from './components/CardReceta';
import Link from 'next/link';
import NavigationIcon from '@mui/icons-material/Navigation';


function page({ params }) {
    const [modalDiagnostico, setModalDiagnostico] = useState(false);
    const [modalEvolTextoLibre, setModalEvolTextoLibre] = useState(false);
    const [modalEvolPlantilla, setModalEvolPlantilla] = useState(false);

    const [data, setData] = useState({});
    const unwrappedParams = React.use(params);

    const [display, setDisplay] = useState('none');
    const [dataEvol, setDataEvol] = useState([]);

    const [pedidos, setPedidos] = useState([]);
    const [nombreDiagnostico, setNombreDiagnostico] = useState("");

    const [activeButtonId, setActiveButtonId] = useState(null);

    const [update, setUpdate] = useState(false);    

    const handleModalEvolTextoLibre = (stateBool) => {
        setModalEvolTextoLibre(stateBool);
    }

    const handleModalEvolPlantilla = (stateBool) => {
        setModalEvolPlantilla(stateBool);
    }

    const actionsEvolucion = [
        { icon: <PostAddIcon />, name: 'Evolucion con Texto Libre', handleModal: handleModalEvolTextoLibre },
        { icon: <HealingIcon />, name: 'Evolucion con Plantilla', handleModal: handleModalEvolPlantilla },
    ];

    const handleModalDiag = (stateBool) => {
        setModalDiagnostico(stateBool);
    }

    const handleUpdate = () => {
        setUpdate(true);
    }

    useEffect(() => {     
        const id = unwrappedParams.id;   
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/paciente/${id}`);
                const dataResult = response.data.paciente;
                setData(dataResult);
            } catch (error) {
                console.log("Error en la petición GET: ", error);
            }
        };
        setUpdate(false);
        fetchData();
    }, [update])

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <Grid container width='100%' justifyContent='space-between' alignItems='center' >
                        <Typography component='span'>Diagnósticos</Typography>
                        <IconButton onClick={() => handleModalDiag(true)}><AddCircleIcon /></IconButton>
                    </Grid>
                    {
                        data.historiaClinica?.diagnosticos.map((item) => (
                            <Button key={item.id} 
                            variant={activeButtonId === item.id ? 'contained' : 'outlined'}
                            sx={{ p: '0.2em 0.5em', display:'block', mb:2 }} 
                            onClick={() => { 
                                setDisplay('flex'); 
                                setDataEvol(item.evoluciones);
                                setPedidos(item.evoluciones);
                                setNombreDiagnostico(item.descripcion);
                                setActiveButtonId(item.id);
                            }}
                            >{item.descripcion}</Button>
                        ) )
                    }
                    <Modal open={modalDiagnostico} onClose={() => handleModalDiag(false)}>
                        <Diagnostico updateList={handleUpdate} idPaciente={unwrappedParams.id} handleClose = {() => handleModalDiag(false)}/>
                    </Modal> 
                </Grid>
                <Grid size={3}>
                    <Typography sx={{ mb: '1em' }}>Evoluciones</Typography>
                    <Grid container display={display} spacing={2}>
                        <CardEvolucion evoluciones={dataEvol} nombreDiagnostico={nombreDiagnostico}/>
                    </Grid>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'fixed', bottom: 0, left: '48%' }}
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

                    <Modal open={modalEvolTextoLibre} onClose={() => handleModalEvolTextoLibre(false)}>
                        <EvolucionTextoLibre descripcion={nombreDiagnostico}/>
                    </Modal>

                </Grid>
                <Grid size={6}>
                    <Typography sx={{ mb: '1em' }}>Plantillas</Typography>
                    <Grid container spacing={1}>
                        <Grid container size={6} display={display} direction='column'>
                            <CardPedido nombreDiagnostico={nombreDiagnostico} pedidosPorDiagnostico={pedidos}/>
                        </Grid>
                        <Grid container size={6} display={display} direction='column'>
                            <CardReceta nombreDiagnostico={nombreDiagnostico} recetaPorDiagnostico={dataEvol}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Fab variant="extended" sx={{position:'absolute', top:'5px', left:'5px', backgroundColor:'secondary.main', color:'white', '&:hover':{backgroundColor:'primary.main'}}}>
                <NavigationIcon sx={{ mr: 1 }} />
                <Link href="/Clinica/Paciente">Volver</Link>
            </Fab>
        </>
    )
}

export default page