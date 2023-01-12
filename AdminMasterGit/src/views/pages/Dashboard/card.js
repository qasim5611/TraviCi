import { Typography, Box, makeStyles, } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({

    main: {
        
         backgroundColor: theme.palette.primary.main,
         display:'flex',
         flexDirection:'column',
         alignItems:'center',
         justifyContent:'center',
         height: '200px',
         borderRadius: '20px',
         color:'#ffff',
         padding: "0 20px",
         textAlign: "center",
         WebkitTransform:'0.3s',
         MozTransform: '0.3s',
         msTransform: '0.3s',
         OTransform: '0.3s',
         transition: '0.3s',
         '&:hover': {
            WebkitTransform: 'translateY(-9px)',
            MozTransform: 'translateY(-9px)',
            msTransform: 'translateY(-9px)',
            OTransform: 'translateY(-9px)',
            transform:' translateY(-9px)',
            // WebkitTransform: 'all .3s ease-all .3s',
            // MozTransform:' all .1s ease-in-out .3s',
            // msTransform: 'all .1s ease-in-out .3s',
            // OTransform: 'all .1s ease-in-out .3s',
            // transition: 'all .1s ease-in-out .3s',
       },
    }
}));

const Card = ({title,amount,icon}) => {
    const classes = useStyles();
    return <Box  className={classes.main} style={{background:'background: linear-gradient(124deg, #2f5995cf 18.76%, #C54C82 43.13%, #313b48 96.83%)'}} >
        {icon}
       <Typography variant='h4' style={{marginTop:'10px'}}>{title}</Typography>
       <Typography variant='h4'>{amount}</Typography>
    </Box>
}

export default Card;