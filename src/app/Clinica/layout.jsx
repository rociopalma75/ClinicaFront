'use client';

import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { alpha, AppBar, Box, Drawer, IconButton, InputBase, List, ListItem, ListItemText, styled, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

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


function layout({children}) {
  const [openDrawer , setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  }

  return (
    <>
        <AppBar>
          <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
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
              <Box bgcolor='InfoBackground' color='white' sx={{minHeight:'100vh'}} width='20vw'>
              {
                ['Pacienes', 'Medicos'].map((item, index) => (
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
                <SearchIcon/>
                </SearchIconWrapper>              
              <StyledInputBase placeholder='Buscar paciente'/>
            </Search>

            

            <IconButton size='large' color='inherit'><AccountCircleIcon/></IconButton>
            
          </Toolbar>
        </AppBar>
        {children}
    </>
  )
}

export default layout