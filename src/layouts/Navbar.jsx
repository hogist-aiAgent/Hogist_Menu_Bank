import { Avatar, Box, IconButton, Paper } from '@mui/material'
import { Outlet } from 'react-router-dom'
import companyLogo from '.././assets/CompanyLogos/red with white bck.png'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  return (
   <>
    <Paper elevation={3} color='none' sx={{
      display: "flex",
      justifyContent: "space-between",
      padding: "0 20px",
      alignItems: "center",
      position: "sticky",  
      top: 0,              
      zIndex: 1000,        
      width: "100%",       
      boxSizing: "border-box",
      mt:2 
    }}>
        <Avatar sx={{
            width: "180px",
            padding: "0px",
            marginLeft: "10px",
            border: "unset",
            borderRadius: "unset",
            height: "auto"
        }} variant='square' src={companyLogo} alt='Company Logo' />
        <IconButton sx={{
            height: "50px",
            width: "50px"
        }}>
            
        </IconButton>
    </Paper>

    <Outlet/>
   </>
  )
}

export default Navbar