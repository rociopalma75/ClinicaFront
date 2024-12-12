'use client';

import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatosPaciente from './components/DatosPaciente'
import axios from 'axios';

function layout({params, children}) {
    const [data, setData] = useState({});
    const unwrappedParams = React.use(params);

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
        fetchData();
    }, [])


    return (
        <>
            <Paper variant='outlined' elevation={3} sx={{ mb: '1em', p: 2 }}>
                <DatosPaciente data={data} />
            </Paper>
            {children}
        </>
    )
}

export default layout