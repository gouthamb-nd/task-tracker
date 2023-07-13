import { Box, FormControl } from "@mui/material";
import { styled } from '@mui/system';


export const FormContainer = styled(Box)`
                
                color: darkslategray;
                width: 100%;
                
                padding: ${({theme})=> theme.spacing(3)};
               
                border-radius: 0.25rem;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.3);
                box-sizing: border-box;
                ${props => props.theme.breakpoints.down("sm")} {
                        
                        margin: none;
                       
                      }
                `;

export const StyledFormControl = styled(FormControl)`
                width: 100%;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                
                
`               

export const ErrorBox = styled(Box)`
        
        min-height: 1.5rem;
        color: red;
        font-size: 1rem;
        margin-top: 0.25rem;
        margin-bottom: 0.5rem;
        text-align: left;

`




  
  

 

  