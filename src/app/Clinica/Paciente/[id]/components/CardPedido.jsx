'use client';

import { Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function CardPedido({ pedidosPorDiagnostico, nombreDiagnostico }) {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const pedidoResult = [];

        pedidosPorDiagnostico.forEach(evolucion => {

            if (evolucion.pedidoLaboratorio) {
                let result = evolucion.pedidoLaboratorio;
                result['id'] = evolucion.id;
                pedidoResult.push(result);
            }

        })

        setPedidos(pedidoResult);
    }, [pedidosPorDiagnostico])

    return (
        <>
            {
                pedidos.map((item, index) => (
                    <Card key={index} sx={{width:'100%'}}>
                        <CardContent>
                            <Typography variant="caption" component="p" textAlign='end'>~ID evolución: {item.id}</Typography>
                            <Typography variant='body1' color='primary'>Pedido de Laboratorio</Typography>
                            <Typography variant='subtitle1' sx={{ color: 'text.secondary', ml:'2em' }}>{item.descripcion}</Typography>
                            <Typography variant="caption">~Diagnóstico: {nombreDiagnostico}</Typography>
                            <Typography variant="caption" component="p">~Medico: {item.medico.apellido}, {item.medico.nombre}</Typography>
                            
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}

export default CardPedido