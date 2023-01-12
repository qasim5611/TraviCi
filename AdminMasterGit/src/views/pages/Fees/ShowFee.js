import React from 'react'
import {Paper,Typography,Box,Grid,Button,Container} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

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
      // backgroundColor:"#686869",
      // color:"white",
      borderRadius:"40px",
      width:"130px",
      height:"6vh"
  },
      
    });
    



const Row = ({ field, value }) => (
    <Grid item container >
      <Grid item sm={6} xs={12}>
        <Box display="flex" justifyContent="space-between" pr={4}>
          <Typography variant="h5"><strong>{field}</strong></Typography>
        </Box>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Grid>
  );
  
  const ShowFee = () => {
      const classes=useStyles();
    return (
      <Container maxWidth="md">
       <Paper style={{margin:'25px',padding:'10px',paddingBottom:'50px' }} elevation={2} >
           <Box pl={5} mt={4}> <Typography variant="h3" style={{fontWeight:"1000"}}>  View Fee </Typography> </Box>

       <Box mt={8} pl={5}>
       

      <Grid container item  direction="column" spacing={5}>
        <Row field="Fee Name" value="Top fee" />
        <Row field="Fee Type" value="Top fee" />
        <Row field="Fee Percentage" value="40%" />
        
        
        
      </Grid>
      <Box mt={2}>        <Grid container  justify="center" spacing={2}> 
       <Grid item > <Link to="/Edit-Fee" style={{textDecoration:"none"}}><Button type="submit" className={classes.btn} variant="contained" > Edit</Button> </Link>  </Grid>

     <Grid item>   <Link to="/Fee-List" style={{textDecoration:"none"}}><Button type="submit" className={classes.btn2} variant="outlined" > Back</Button> </Link> </Grid>
     

        </Grid>
        </Box>

      {/* <Link href='/user'>
      <Button variant='contained' size='large' color='primary' style={{marginTop:'30px'}}>Back</Button>
      </Link>
    */}
      </Box>
      </Paper>
      </Container>
    );
  };























// const Show = () => {
//     return (
        
//             <Box mt={4}>           <Paper style={{margin:"20px ",padding:"30px 10px"}}>
//                 <Box pl={2}> <Typography variant="h3" style={{fontWeight:"1000"}}>  View User </Typography> </Box>

//                <Box mt={4} pl={2}>         
//                <Grid container direction="column" spacing={3}>
//                    <Grid item>
//                              <Grid container  spacing={7}>
//                                 <Grid item>    <Typography style={{fontWeight:"800"}}>  Display Name   </Typography>       </Grid> 
//                                 <Grid item>    <Typography >  Rose   </Typography>       </Grid> 
 
//                              </Grid>







//                    </Grid> 



                 
//                    <Grid item>
//                              <Grid container spacing={7}>
//                                 <Grid item>    <Typography style={{fontWeight:"800"}}>   Custom URl  </Typography>       </Grid> 
//                                 <Grid item>    <Typography >  stevecom   </Typography>       </Grid> 
 
//                              </Grid>







//                    </Grid> 
                   
//                    <Grid item>
//                              <Grid container spacing={7}>
//                                 <Grid item>    <Typography style={{fontWeight:"800"}}>   Bio  </Typography>       </Grid> 
//                                 <Grid item>    <Typography  >  Steven Paul Jobs was an American business magnate, industrial designer, investor, and media proprietor   </Typography> </Grid> 
 
//                              </Grid>







//                    </Grid> 


//                    <Grid item>
//                              <Grid container spacing={7}>
//                                 <Grid item>    <Typography style={{fontWeight:"800"}}>   Twitter Username </Typography>       </Grid> 
//                                 <Grid item>    <Typography  >  Steve   </Typography> </Grid> 
 
//                              </Grid>







//                    </Grid> 
                   
                 

//                    <Grid item>
//                              <Grid container spacing={7}>
//                                 <Grid item>    <Typography style={{fontWeight:"800"}}>   Verified </Typography>       </Grid> 
//                                 <Grid item>    <Typography  >  true   </Typography> </Grid> 
 
//                              </Grid>







//                    </Grid> 
                   
                   
                 
                   
                 
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
//                    </Grid>       






























                {/* <Grid container spacing={7} >



                    
                    <Grid item  > 
                    
                    <Grid container direction="column" spacing={4}  >  
                        <Grid item >  <Typography style={{fontWeight:"800"}}>  Display Name   </Typography>   </Grid>
                        <Grid item>  <Typography style={{fontWeight:"800"}}>  Custom URL   </Typography>   </Grid>
                        <Grid item>  <Typography style={{fontWeight:"800"}}>  Bio   </Typography>   </Grid>
                        <Grid item>  <Typography style={{fontWeight:"800"}}>  Twitter Username   </Typography>   </Grid>
                        <Grid item>  <Typography style={{fontWeight:"800"}}>  Verified   </Typography>   </Grid>


                    </Grid>


                    </Grid>
                    
                     
                     
                     <Grid item    >
                                <Grid container direction="column" spacing={4}  >
                                <Grid item>  <Typography>  	Rose   </Typography>   </Grid>
                        <Grid item>  <Typography>  stevecom   </Typography>   </Grid>
                        <Grid item>  <Typography>  	Steven Paul Jobs was an American business magnate, industrial designer, investor, and media proprietor

</Typography>   </Grid>
                        <Grid item>  <Typography>  rose   </Typography>   </Grid>
                        <Grid item>  <Typography>  true   </Typography>   </Grid>


                                  </Grid>
                     </Grid>
           


    </Grid> */}
               
               
//                  </Box> 


//             </Paper>

//             </Box>
 
        
//     )
// }

export default ShowFee;
