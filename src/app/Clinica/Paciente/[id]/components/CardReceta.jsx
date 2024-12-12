import { Card, CardContent, Typography } from '@mui/material'
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'

function CardReceta({ recetaPorDiagnostico, nombreDiagnostico }) {
    const [recetas, setRecetas] = useState([]);
    

    useEffect(() => {
        const recetaResult = [];

        recetaPorDiagnostico.forEach(evolucion => {
            if (evolucion.recetaDigital) {
                let result = evolucion.recetaDigital;
                result['id'] = evolucion.id;
                recetaResult.push(result);
            }
        })

        setRecetas(recetaResult);
    }, [recetaPorDiagnostico])


    return (
        <>
            {
                recetas.map((item, index) => (
                    <Card key={index} sx={{ width: '100%' }}>
                        <CardContent>
                            <Typography variant="caption" component="p" textAlign='end'>~ID evolución: {item.id}</Typography>
                            <Typography variant='body1' color='primary'>Receta Dígital</Typography>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary', ml: '2em' }}>Medicamentos:</Typography>
                            {item.medicamentos.map((medicamento, index) => (
                                <div key={index}>
                                    <Typography variant='subtitle2' sx={{ color: 'text.secondary', ml: '2em' }}>{medicamento.descripcion} - {medicamento.formato}</Typography>
                                </div>
                            
                            )
                            )}
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary' , ml:'2em'}}>Observaciones: {item.observacionesMedicas}</Typography>
                            <Typography variant="caption" component="p" >~Diagnóstico: {nombreDiagnostico}</Typography>
                            <Typography variant="caption">~Medico: {item.medico.apellido}, {item.medico.nombre}</Typography>
                            <Typography variant="caption" component="p">~Fecha de receta: {format(new Date(item.fechaHora), 'dd/MM/yyyy HH:mm')}</Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}

export default CardReceta