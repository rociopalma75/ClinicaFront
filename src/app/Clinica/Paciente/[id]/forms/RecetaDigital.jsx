import { Autocomplete, Box, Button, FormControl, FormHelperText, Input, InputLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useSnackbar } from 'notistack';

function RecetaDigital({descripcion, idEvolucion}) {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState({
        observaciones: '',
        medicamentos: ''
    });
    const [medicamento1, setMedicamento1] = useState("");
    const [medicamentos, setMedicamentos] = useState([]);
    const [selectedCodigo1, setSelectedCodigo1] = useState(null);
    const [selectedCodigo2, setSelectedCodigo2] = useState(null);


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (medicamento1) {
            const fetchMedicamentos = async () => {
                try {
                    const nombre = medicamento1;
                    const response = await axios.get(`/api/medicamentos/${nombre}`);
                    // console.log(response.data.medicamentos);

                    setMedicamentos(response.data.medicamentos);

                } catch (error) {
                    console.log("Error al hacer el GET: ", error)
                }

            }
            fetchMedicamentos();
        }
    }, [medicamento1]);

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

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (selectedCodigo1) {
            data.medicamentos = `${selectedCodigo1}`;
        }
        if (selectedCodigo2) {
            data.medicamentos += "," + selectedCodigo2;
        }
        console.log(data);
        try {
            const response = await axios.post(`/api/paciente/${id}/diagnostico/${descripcion}/evolucion/${idEvolucion}/receta`, data);
            if (response.data.status == 200) {
                enqueueSnackbar("Receta creada exitosamente", { variant: "success" });
                setTimeout(() => {
                    window.location.reload();
                }, 500); // 2000 ms = 2 seconds
            }
        } catch (error) {
            console.log("Error al hacer el POST: ", error)
        }

    }


    return (
        <>
            <Box sx={style} component='form' onSubmit={handleSubmit}>
                <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                    Registrar Receta Dígital
                </Typography>

                <Autocomplete
                    name="medicamento1"
                    id="medicamentos1"
                    disablePortal
                    options={medicamentos ? medicamentos : []}
                    getOptionLabel={(option) => option.descripcion || ""}
                    onChange={(event, newValue) => {
                        setSelectedCodigo1(newValue ? newValue.codigo : null);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setMedicamento1(newInputValue);
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.codigo} component='option' value={option.codigo}>
                            {option.descripcion} - {option.formato}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Medicamentos" required />}

                />

                <Autocomplete
                    disablePortal
                    sx={{ mt: 2 }}
                    id="medicamentos2"
                    options={medicamentos ? medicamentos : []}
                    getOptionLabel={(option) => option.descripcion || ""}
                    onInputChange={(event, newInputValue) => {
                        setMedicamento1(newInputValue);
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option.codigo}>
                            {option.descripcion} - {option.formato}
                        </li>
                    )}
                    onChange={(event, newValue) => {
                        setSelectedCodigo2(newValue ? newValue.codigo : null);
                    }}
                    renderInput={(params) => <TextField {...params} label="Agregar otro medicamento opcional" />}


                />

                <FormControl sx={{ width: '100%', mt: 2 }}>
                    <InputLabel>Observaciones</InputLabel>
                    <Input fullWidth type="text" name="observaciones" required onChange={handleChange} />
                    <FormHelperText></FormHelperText>
                </FormControl>


                <Grid container justifyContent='space-between' sx={{ mt: 5 }}>
                    <Button variant='contained' color='success' sx={{ width: '40%' }} type='submit' >Confirmar</Button>
                </Grid>
            </Box>
        </>
    )
}

export default RecetaDigital