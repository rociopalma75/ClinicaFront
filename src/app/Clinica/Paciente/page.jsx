'use client';

import { Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function page() {
    const [ data , setData] = useState ([]);

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'apellido', headerName: 'Apellido', width: 200 },
        { field: 'dni', headerName: 'DNI', width: 130 },
        { field: 'obraSocial', headerName: 'Obra Social', width: 200 },
        { field: 'fechaNacimiento', headerName: 'Fecha de Nacimiento', width: 250 },
        { field: 'actions', headerName:'Ver detalle', width:150, renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              sx={{p:'0.25em 1em'}}
            >
              <Link href={`/Clinica/Paciente/${params.row.dni}`}>Editar</Link>
            </Button>)
        }
    ];

    const paginationModel = { page: 0, pageSize: 7 };


    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/paciente');
                const resData = response.data.pacientes;
                let dataResult = resData.map((item, index) => ({
                    id: index,
                    nombre: item.nombre,
                    apellido: item.apellido,
                    dni: item.dni,
                    obraSocial: `${item.obraSocialPaciente.codigo} - ${item.obraSocialPaciente.sigla}`,
                    fechaNacimiento: item.fechaNacimiento
                }))

                setData(dataResult);
            } catch (error) {
                console.log("Error en la petición GET: ", error);
            }
        };
        fetchData();

    }, [])


    return (
        <>
            <Paper sx={{ height:500, width: '80%', margin:'auto' }} >
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    sx={{ border: 0 }}
                />
            </Paper>
        </>
    )
}

export default page