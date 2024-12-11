'use client';

import { Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function page() {
    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'apellido', headerName: 'Apellido', width: 200 },
        { field: 'dni', headerName: 'DNI', width: 130 },
        { field: 'obraSocial', headerName: 'Obra Social', width: 130 },
        { field: 'fechaNacimiento', headerName: 'Fecha de Nacimiento', width: 250 },
        { field: 'actions', headerName:'Ver detalle', width:150, renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              sx={{p:'0.25em 1em'}}
            >
              Editar
            </Button>)
        }
    ];

    const rows = [
        {id:1, nombre: 'rocio', apellido: 'palma', dni:'44105560', obraSocial:'Sancor', fechaNacimiento:'26-03-2002'}
    ];
    const paginationModel = { page: 0, pageSize: 7 };
    return (
        <>
            <Paper sx={{ height:500, width: '80%', margin:'auto' }} >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    sx={{ border: 0 }}
                />
            </Paper>
        </>
    )
}

export default page