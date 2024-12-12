import { Card, CardContent, IconButton, Modal, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import CardEvolucionPlanilla from './CardEvolucionPlanilla'
import PostAddIcon from '@mui/icons-material/PostAdd';
import HealingIcon from '@mui/icons-material/Healing';
import RecetaDigital from '../forms/RecetaDigital';
import PedidoLaboratorio from '../forms/PedidoLaboratorio';
import { format } from 'date-fns';

function CardEvolucion({ evoluciones, nombreDiagnostico }) {
    const [modalRecetaDigital, setModalRecetaDigital] = useState(false);
    const [modalPedidoLab, setModalPedidoLab] = useState(false);
    const [idEvolucion, setIdEvolucion] = useState(0);
    const handleModalRecetaDigital = (stateBool) => {
        setModalRecetaDigital(stateBool);
    }

    const handleModalPedidoLab = (stateBool) => {
        setModalPedidoLab(stateBool);
    }
    const actions = [
        { icon: <PostAddIcon />, name: 'Pedido de Laboratorio', handleModal: handleModalPedidoLab },
        { icon: <HealingIcon />, name: 'Receta Dígital', handleModal: handleModalRecetaDigital },
    ];


    return (
        <>
            {
                evoluciones.map((item, index) => (
                    <Card key={index} sx={{width:'100%'}}>
                        <CardContent>
                            <Typography variant="caption" component="p" textAlign='end'>~ID: {item.id}</Typography>
                            {
                                item.informe ?
                                    <>
                                        <Typography variant='body1' color='primary.main'>Evolución con texto libre</Typography>
                                        <Typography sx={{ color: 'text.secondary', ml:'2em' }}>{item.informe}</Typography>
                                    </>
                                    :
                                    <CardEvolucionPlanilla evolucionPlantilla={item.plantilla} />                                       
                            }
                            <Typography variant="caption">~Medico: {item.medico.apellido}, {item.medico.nombre}</Typography>
                            <Typography variant="caption" component="p">~Fecha de evolucion: {format(new Date(item.fechaHora), 'dd/MM/yyyy HH:mm')}</Typography>
                            
                        </CardContent>
                        {
                            (!item.pedidoLaboratorio && !item.recetaDigital) && (
                                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                                    {actions.map((action) => (
                                        <Tooltip key={action.name} title={action.name}>

                                            <IconButton
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => {
                                                    action.handleModal(true);
                                                    setIdEvolucion(item.id);
                                                }}
                                            >
                                                {action.icon}
                                            </IconButton>
                                        </Tooltip>
                                    ))}
                                </div>
                            )
                        }

                        <Modal open={modalRecetaDigital} onClose={() => handleModalRecetaDigital(false)}>
                            <RecetaDigital descripcion={nombreDiagnostico} idEvolucion={idEvolucion} />
                        </Modal>

                        <Modal open={modalPedidoLab} onClose={() => handleModalPedidoLab(false)}>
                            <PedidoLaboratorio descripcion={nombreDiagnostico} idEvolucion={idEvolucion} />
                        </Modal>
                    </Card>


                ))

            }
            
        </>
    )
}

export default CardEvolucion