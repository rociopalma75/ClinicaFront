'use client';

import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { alpha, AppBar,  Button, Divider, IconButton, InputBase, ListItemIcon, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid2'
import axios from 'axios';
import Logout from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


function layout({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profile, setProfile] = useState({});
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSession = async () => {
    try{
      const response = await axios.get('/api/auth/logout');
      console.log(response.data);
      if(response.data.status === 200){
        enqueueSnackbar("Sesión cerrada exitosamente", {variant:"success"});
        router.push('/');
      }
    }catch(error){
      console.error("Error al cerrar sesión: ", error);
    }
  }


  useEffect(() => {
    try{
      const fetchData = async () => {
        const response = await axios.get('/api/profile');
        const sessionData = JSON.parse(response.data.Sesion);
        setProfile(sessionData);
      }
      fetchData();
    }catch(error){
      console.log("Error al hacer el get: ", error);
    }
  },[])

  return (
    <>
      <AppBar position='relative' sx={{ mb: '1em' }} >
        <Toolbar sx={{ display: 'flex', justifyContent:'space-between' }}>
          <Grid container direction="row"  m='auto'> 
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Buscar paciente' />
            
          </Search>
          <Button variant='contained' sx={{backgroundColor:'background.paper', color:'black'}}>Buscar</Button>
          </Grid>


          <IconButton size='large' color='inherit'
            aria-controls={open ? 'basic-perfil' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu  id="basic-perfil" anchorEl={anchorEl} open={open} onClose={handleClose} >
            <Typography m='1em'>{profile.Apellido}, {profile.Nombre}</Typography>
            <Typography m='1em'>{profile.MatriculaMedica}</Typography>
            <Typography m='1em'>{profile.Especialidad}</Typography>
            <Typography m='1em'>{profile.Correo}</Typography>
            <Divider />
            <MenuItem onClick={handleCloseSession}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Grid sx={{m:'1.5em'}}>
        {children}
      </Grid>
    </>
  )
}

export default layout