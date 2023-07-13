import { Box } from "@mui/material";


import { styled } from '@mui/system';


export const NavBar = styled(Box)`
   
margin-left: 1rem;
   width: 100%;             

   ${props => props.theme.breakpoints.down("sm")} {
    font-size: 0.25rem; 
    
  }               
  `;

export const MenuBar = styled(Box)`
   
margin-left: 1rem;
${props => props.theme.breakpoints.down("sm")} {
    font-size: 0.25rem;               
    margin: none;
    margin-left: 0.25rem
  }               

   `;