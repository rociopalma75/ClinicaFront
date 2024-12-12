import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function EvolucionPlantilla({descripcion, idPaciente, handleClose}) {
    const [plantillas, setPlantillas] = useState([]);
    const [selectedPlantilla, setSelectedPlantilla] = useState(null);
    const [campos, setCampos] = useState([]);
    const [formValues, setFormValues] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    
    const handleChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedPlantilla(parseInt(selectedId));
        const selectedPlantilla = plantillas.find(plantilla => plantilla.id === selectedId);
        setCampos(selectedPlantilla ? selectedPlantilla.campos : []);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };


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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/catalogoPlantillas");
                console.log("Datos obtenidos: ", response.data);
                setPlantillas(response.data.plantillas);
            } catch (error) {
                console.log("Error la obtener los datos: ", error);
            }
        }
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Formulario enviado: ", formValues);
        const id = idPaciente;
        console.log("Id plantilla: ", selectedPlantilla);
        try{
            const response = await axios.post(`/api/paciente/${id}/diagnostico/${descripcion}/plantilla/${selectedPlantilla}`, formValues);
            console.log(response.data);

            if(response.data.status == 200){
                enqueueSnackbar("Evolución creada exitosamente", { variant: "success" });
                handleClose();
                setTimeout(() => {
                    window.location.reload();
                }, 500); // 2000 ms = 2 seconds
            }

        }catch(error){
            console.log("Error en el POST: ", error);
        }

    }


    return (
        <>

            <Box sx={style}  >
                <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                    Crear nueva evolución con plantilla
                </Typography>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Plantilla</FormLabel>
                    <RadioGroup
                        name="plantilla"
                        value={selectedPlantilla}
                        onChange={handleChange}
                    >

                        {plantillas.map((plantilla) => (
                            <FormControlLabel
                                key={plantilla.id}
                                value={plantilla.id}
                                control={<Radio />}
                                label={plantilla.nombrePlantilla}
                            />
                        ))}

                    </RadioGroup>
                </FormControl>  
                {campos.length > 0 && (
                <Box sx={{ mt: 3 }} component='form' onSubmit={handleSubmit}>
                    {campos.map((campo, index) => (
                        <FormControl key={index} fullWidth sx={{ mb: 2 }}>
                            <TextField
                                label={campo}
                                name={campo}
                                value={formValues[campo] || ''}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </FormControl>
                    ))}

                <Grid container justifyContent='center' sx={{ mt: 5 }}>
                    <Button variant='contained' color='success' sx={{ width: '40%' }} type='submit' >Confirmar</Button>
                </Grid>

                </Box>
            )}


            </Box>
        </>
    )
}

export default EvolucionPlantilla