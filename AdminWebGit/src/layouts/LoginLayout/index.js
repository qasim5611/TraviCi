import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Box, Typography,Container } from "@material-ui/core";
import Logo from "src/component/Logo";
import Footer from "../DashboardLayout/TopBar/Footer";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "80vh",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    paddingTop:" 50px",
    // alignItems: "center",
    [theme.breakpoints.down('xs')]:{
      height: "70vh",
    },
  },
  headbox: {
    margin: "0",
    padding: "0",
  },
  imgbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#C54C82",
    [theme.breakpoints.down('sm')]:{
      display:"none",
    },
    "& img":{
      maxWidth:"100%",
    },
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.headbox}>
        <Grid
          container
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Container maxWidth="sm"> <Logo></Logo></Container>
            <Container maxWidth="sm">
            <Box className={classes.content}>
              <Box style={{width:"100%"}}>{children}</Box>
            </Box>
            </Container>
            
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            <Box className={classes.imgbox}>
              <img
                className={classes.images}
                src="images/login.png"
                alt="dd"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* <Footer /> */}
    </>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
