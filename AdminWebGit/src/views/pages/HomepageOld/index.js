import { Typography, Box,Grid, CardContent } from "@material-ui/core";
import React from "react";
import Page from "src/component/Page";
import ContactA from '../../../Images/contactA.jpg';
import ContactB from '../../../Images/contactB.jpg';
import ContactC from '../../../Images/contactC.jpg';
import NewContact from '../../../Images/newContact.jpg';
import GreenCheck from '../../../Images/greenCheck.jpg';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
export default function (props) {
  return (
    <Box p={5}>
    <Page  title="Home Page">

     
    <Grid container className='home-section' direction='column'>
        <Grid item > <Typography variant='h1' >Home</Typography></Grid>
    
         <Box className='tasks' mt={3}>  
        
         <Grid container >
              <Grid item md={8} xs={5}> <Typography variant='h4'>Task Due Soon </Typography></Grid> 
              <Grid item> <Typography variant='h4'> See All my tasks</Typography> </Grid> 
         </Grid>
           

          <Box mt={2}>
            <Grid container direction='column'>

              <Grid item>
              <Grid container>
                     <Grid item > <img  src={GreenCheck} width='75%' alt='greenCheck' /></Grid>
                     <Grid item md={4} xs={5}> <Typography variant='h4' >Contract Name</Typography></Grid>
                     <Grid item md={2} xs={6}> <Typography variant='h4'>Contract Name</Typography></Grid>
                     <Grid item md={2} xs={4}> <Typography variant='h4'>Status</Typography></Grid>
                     <Grid item xs={1}> <Typography variant='h4'>Today</Typography></Grid>
                     <Grid item> <Typography variant='h4'>3:30 pm</Typography></Grid>
                </Grid> 

              </Grid>

           <Grid item>
    
          <Grid container >
            <Grid item xs={0}><img src={GreenCheck} width='75%' alt='greenCheck' /></Grid>
            <Grid item xs={4}> <Typography variant='h4' >Contract Name</Typography></Grid>
            <Grid item xs={2}> <Typography variant='h4'>Contract Name</Typography></Grid>
            <Grid item xs={2}> <Typography variant='h4'>Status</Typography></Grid>
            <Grid item xs={1}> <Typography variant='h4'>Today</Typography></Grid>
            <Grid item> <Typography variant='h4'>3:30 pm</Typography></Grid>
           </Grid> 

        </Grid>
            </Grid>
          </Box>     
      </Box>
  
    </Grid>
    
    
    <Grid container direction='column' spacing={1} className='favourites'>
    <Grid item> <Typography variant='h4'>Favourites</Typography> </Grid>
      <Grid item>

     <Grid container spacing={2}>
          <Grid item> 
            <Card elevation={0}>
                 <CardMedia component='img' alt='cardA' image={ContactA} />
                 <CardContent>
                 <Typography variant='h5'>Contract A</Typography>
                 <Typography variant='p'>Lorem ipsum </Typography>
                 </CardContent>
           </Card>
           </ Grid>
           <Grid item> 
            <Card elevation={0}>
                 <CardMedia component='img' alt='cardA' image={ContactB} />
                 <CardContent>
                 <Typography variant='h5'>Contract B</Typography>
                 <Typography variant='p'>Lorem ipsum </Typography>
                 </CardContent>
           </Card>
           </ Grid>
           <Grid item> 
            <Card elevation={0}>
                 <CardMedia component='img' alt='cardA' image={ContactC} />
                 <CardContent>
                 <Typography variant='h5'>Contract C</Typography>
                 <Typography variant='p'>Lorem ipsum </Typography>
                 </CardContent>
           </Card>
           </ Grid>                   
          </Grid>        
        </Grid>
      </Grid>
   

 <Box pt={5}>

    <Grid container direction='column' spacing={1} className='favourites'>
    <Grid item> <Typography variant='h4'>Recent Contracts</Typography> </Grid>
      <Grid item>

     <Grid container spacing={2}>
          <Grid item >
          <Card elevation={0}>
                 <CardMedia component='img' alt='cardA' image={ContactA} />
                 <CardContent>
                 <Typography variant='h5'>Contract A</Typography>
                 <Typography variant='p'>Lorem ipsum </Typography>
                 </CardContent>
           </Card>
          </Grid>
          <Grid item>
          <Card elevation={0}>
                 <CardMedia component='img' alt='cardB' image={ContactB} />
                 <CardContent>
                 <Typography variant='h5'>Contract B</Typography>
                 <Typography variant='p'>Lorem ipsum </Typography>
                 </CardContent>
           </Card>
            </Grid>
          <Grid item>
          <Card elevation={0}>
                 <CardMedia component='img' alt='cardB' image={NewContact} />
                 <CardContent>
                 <Typography variant='h5'>Contract C</Typography>
                 <Typography variant='p'>Lorem ipsum </Typography>
                 </CardContent>
           </Card>
            </Grid>
           
        </Grid>

      </Grid>
    </Grid>

    </Box>
 
    </Page>
    </Box>
    
  );
}
