import { Box, Typography } from '@mui/material'
import React from 'react'

function CardEvolucionPlanilla({ evolucionPlantilla }) {
    if (!evolucionPlantilla) {
        return <Typography>No data available</Typography>;
    }
    return (
        <>
            <Typography variant='body2' color='primary.main'>Evolución con plantilla</Typography>
            {
                
                Object.keys(evolucionPlantilla).map((item, index) => (
                    <Box key={index}>
                        <Typography sx={{ color: 'text.secondary' , ml:'2em'}}>{item}: {evolucionPlantilla[item]}</Typography>
                    </Box>
                ))
            }
            
    </>
    )
}

export default CardEvolucionPlanilla