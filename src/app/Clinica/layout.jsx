'use client';

import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { alpha, AppBar, Box, Divider, Drawer, IconButton, InputBase, List, ListItem, ListItemText, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid2'

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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  }

  return (
    <>
      <AppBar position='relative' sx={{ mb: '1em' }} >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            <Box bgcolor='InfoBackground' sx={{ minHeight: '100vh' }} width='20vw'>
              {
                ['Pacientes', 'Medicos'].map((item, index) => (
                  <List key={index}>
                    <ListItem>
                      <ListItemText primary={item} />
                    </ListItem>
                  </List>
                ))
              }
            </Box>
          </Drawer>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Buscar paciente' />
          </Search>



          <IconButton size='large' color='inherit'
            aria-controls={open ? 'basic-perfil' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu id="basic-perfil" anchorEl={anchorEl} open={open} onClose={handleClose} >
            <Typography ml='1em'>Perfil</Typography>
            <Divider />
            <MenuItem>Cerrar Sesión</MenuItem>
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