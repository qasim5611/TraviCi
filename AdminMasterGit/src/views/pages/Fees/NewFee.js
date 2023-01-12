import React from 'react'
import { Typography,Box,Container,Grid, TextField,Button,Paper, FilledInput } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {Link} from 'react-router-dom'
const useStyles = makeStyles({
    btn:{
        backgroundColor:"#1273eb",
        color:"white",
        borderRadius:"40px",
        width:"130px",
        height:"6vh"
    },
    btn2:{

        backgroundColor:"#686869",
        color:"white",
        borderRadius:"40px",
        width:"130px",
        height:"6vh"
    }
    
  
      
    });
    
    


const NewFee = () => {
    const classes=useStyles();
    return (
        <Container maxWidth="md">         <Box>
       <Paper elevation={10} style={{margin:"40px ",padding:"30px 10px",paddingBottom:'50px'}}  >
           <Box pl={5}  px={2}> <Typography variant="h3" style={{fontWeight:"1000"}}>  New Fee </Typography>  </Box>
        <Box  mt={4} px={2}>
            <Grid container spacing={4}>
               <Grid item xs={12}> 
                    <Grid  container spacing={1} >

                       <Grid item md={3} xs={12}>  <Typography style={{fontWeight:"500"}}>  Fee Name   </Typography>   </Grid> 
                       <Grid item md={9} xs={12}>  <OutlinedInput fullWidth placeholder="Fee Name" disableUnderline={true} style={{  height:"5vh",borderRadius:"50px"}} />   </Grid>
                    </Grid>
               
               
               
               </Grid>
              
               <Grid item xs={12}> 
                    <Grid  container spacing={1} >

                       <Grid item md={3} xs={12}>  <Typography style={{fontWeight:"500"}}>  Fee Type   </Typography>   </Grid> 
                       <Grid item md={9} xs={12}><OutlinedInput fullWidth placeholder="Fee Type" disableUnderline={true}  style={{ height:"5vh",borderRadius:"50px" }} /> </Grid> 
                    </Grid>
               
               
               
               </Grid>

               <Grid item xs={12}> 
                    <Grid  container spacing={1} >

                       <Grid item md={3} xs={12}>  <Typography style={{fontWeight:"500"}}>  Fee Percentage %   </Typography>   </Grid> 
                       <Grid item md={9} xs={12}><OutlinedInput fullWidth placeholder="Fee Percentage % " disableUnderline={true} style={{ height:"5vh",borderRadius:"50px"  }} /> </Grid>
                    </Grid>
               
               
               
               </Grid>
               <Grid item xs={12}> 
                    <Grid  container spacing={1} alignItems="center" justify="center">

                       <Grid item >  <Button type="submit" className={classes.btn} variant="contained" > Submit</Button>   </Grid> 
                       <Grid item > <Link to="Fee-List" style={{textDecoration:"none"}}><Button type="submit" className={classes.btn2} variant="contained" > Cancel</Button> </Link>  </Grid>
                    </Grid>
               
               
               
               </Grid>










            </Grid>
            </Box>
       </Paper>
</Box>
</Container>
    )
}

export default NewFee;
