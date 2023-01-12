import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import{Box,Button,Typography,Container,Grid,Dialog,Slide,DialogActions,DialogContent,DialogContentText} from '@material-ui/core'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from "@material-ui/icons/Visibility";
function createData( Fee_Name, Fee_Type,Fee_Percent) {
  return { Fee_Name, Fee_Type,Fee_Percent};
}

const rows = [
  createData('Top fee','Top fee','40%'),
  createData('Top fee','Top fee','40%'),
  createData('Top fee','Top fee','40%'),
  createData('Top fee','Top fee','40%'),
  createData('Top fee','Top fee','40%'),
  
  
];
const useStyles = makeStyles({
  
     table: {
       minWidth: 500,
     },
     btn:{
         color:"white",
         backgroundColor:"#1273eb",
         
     },
     button: {
      minWidth: "initial",
      padding: "6px",
      marginLeft: "7px",
    },
    root: {
      '&:nth-of-type(odd)': {
      backgroundColor: '#e0e0e0',
      },
      },
   
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FeeList = () => {
    const classes=useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
                            <Box display="flex" justifyContent="space-between"> 
           <Box pl={5} mt={4}> <Typography variant="h3" style={{fontWeight:"1000"}}>  Fee List </Typography> </Box>
           <Box mt={4} pr={4}>  <Link  style={{ textDecoration: 'none' }} to='/New-Fee'> <Button type="submit" className={classes.btn} variant="contained"> New Fee</Button> </Link>  </Box>
           </Box>

           
        
    
    <Box mt={3} ml={4} mr={4}>        
    <TableContainer component={Paper}  >
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell 
            style={{ color: "white", backgroundColor: "#252d47" }}
            align="left"
          >
            Id
          </TableCell>
          <TableCell
            style={{ color: "white", backgroundColor: "#252d47",minWidth:"150px" }}
            align="left"
            
          >
            Fee Name
          </TableCell>
          <TableCell
            style={{ color: "white", backgroundColor: "#252d47" }}
            align="left"
            
            
          >
            Fee Type
          </TableCell>
          <TableCell
            style={{ color: "white", backgroundColor: "#252d47",minWidth:"100px" }}
            align="left"
          >
            Fee Percentage %
          </TableCell>
          

          <TableCell
            style={{ color: "white", backgroundColor: "#252d47",minWidth:"150px" }}
            align="center"
            
          >
            Action
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
            {rows.map((row,index) => (
               <TableRow key={index} className={classes.root}>
                <TableCell component="th" scope="row" >
                 {index+1}
                </TableCell> 
                {/* <TableCell align="left">{row.Id}</TableCell> */}
                <TableCell align="left">{row.Fee_Name}</TableCell>
                <TableCell align="left">{row.Fee_Type}</TableCell>
                <TableCell align="left">{row.Fee_Percent}</TableCell>
               
              

            
                <TableCell  align="left">
                  <Box display="flex" >
                   <Grid container justify="center">
                    <Grid item>
                    <Link to='/Show-Fee'>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                       <VisibilityIcon  style={{width:"25px"}} />
                      </Button>
                    </Link>
                    </Grid>
                   <Grid item>
                    <Link to="#">
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleClickOpen}
                        
                      >
                        <DeleteIcon  style={{width:"25px"}} /> 
                      </Button>
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/Edit-Fee">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        <EditIcon  style={{width:"25px"}} />           </Button>
                    </Link>
                  </Grid>
                    </Grid>
                    
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

      </Table>
 </TableContainer>
 </Box>
 <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
<DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
             Are you sure you want to delete the content?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
 

        </div>
    )
}

export default FeeList
