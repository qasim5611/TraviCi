import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import Logo from "src/component/Logo";
// import Footer from "@/layouts/DashboardLayout/Footer";

const useStyles = makeStyles((theme) => ({

  content: {
    height: "80vh",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    paddingTop: " 50px",
    // alignItems: "center",
    [theme.breakpoints.down('xs')]: {
      height: "70vh",
    },
  },
  imgbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#C54C82",
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
    "& img": {
      maxWidth: "100%",
    },
  },

  left: {
    background: "url(/images/BlueBG.png) no-repeat",
    backgroundPosition: "center right",
    height: "84.9vh",
    [theme.breakpoints.down("sm")]: {
      height: "60vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "50vh",
    },
    "@media(max-width:340px)": { height: "60vh" },
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container style={{ backgroundColor: "#f7f7f9" }}>
        <Grid className={classes.container} item xs={12} sm={12} md={6}>
          <Container maxWidth="sm"><Box mt={2}><Logo /></Box></Container>
          <Container maxWidth="sm">
            <Box className={classes.content}>
              <Box style={{ width: "100%" }}>{children}</Box>
            </Box>
          </Container>
          {/* <Box className={classes.content}>{children}</Box> */}
        </Grid>
        <Grid item xs={true} sm={true} md={6} >
          <Box
            className={classes.imgbox}
          >
            <Box>
              <img src="images/smart-contracts.jpeg" alt="dd" width="300" />
              <Box pl={15} pr={15} mt={5}>
                <Typography variant="h3" style={{ color: "#f7f7f9" }} paragraph>
                  Simple Is Key
                </Typography>
                <Typography
                  variant="subtitle2"
                  style={{ color: "#f7f7f9" }}
                  width="100"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent imperdiet nec diam in venenatis.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* <Footer /> */}
    </>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
