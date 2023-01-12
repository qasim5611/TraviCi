import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  smartContract: {
    color: "#C54C82",
    fontWeight: 500,
    fontSize: 22,
    paddingBottom: 0,
    paddingLeft: "10px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  logoBox: {
    display: "flex",
    // marginTop: "-20px",
    "& img":{
      width:"50px"
    },
    [theme.breakpoints.down("xs")]: {
      // marginTop: "0px",
    },
  },
}));

const Logo = (props) => {
  const classes = useStyles();

  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Box className={classes.logoBox} alignItems="center">
        <img
          className={classes.img}
          src="images/Logo.png"
          alt="Logo"
          width={150}
          {...props}
        />
        <Typography className={classes.smartContract}>SOLIDIS</Typography>
      </Box>
    </Link>
  );
};

export default Logo;
