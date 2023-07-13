import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MenuBar } from './ResponsiveAppBar.styles';
import { Link } from 'react-router-dom';

export default function ResponsiveAppBar() {
  return (
    <Box >
       <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            Task Tracker
          </Typography>
          <MenuBar>
          <Button color="inherit" component={Link} to="/">
            Tasks
          </Button>
          <Button color="inherit" component={Link} to="/add">
            Add Tasks
          </Button>
          </MenuBar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}