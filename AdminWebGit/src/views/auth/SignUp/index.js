import React from "react";

import {
  Grid,
  makeStyles,
  Link,
  TextField,
  Box,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // mainBg:{
  //   backgroundColor:'#f0f0f0',
  //   height:'100vh'
  // },

  inputs: {
    backgroundColor: "#FFFFFF",
  },

  trimmedButtons: {
    borderBottom: "1px Solid",
    borderRadius: "none",
  },

  lessround: {
    borderRadius: "4px",
    backgroundColor: "rgb(36,39,150)",
    color: "white",
  },
}));

export default function (props) {
  const classes = useStyles();
  return (
    <>
      <Box mt={4} pl={2} className="nav">
        ( Nav Logo ){" "}
      </Box>
      <Box display="flex" p={4} alignItems="center" justifyContent="center">
        <Box display="flex" flexDirection="column" className="loggin-wrapper">
          <Grid container direction="column" calssName="login-text" spacing={2}>
            <Grid item>
              <Typography variant="h2">Register</Typography>
            </Grid>
            <Grid item>
              <Typography>
                Lorem ipsum Manage your info, privacy, and security{" "}
              </Typography>
            </Grid>
          </Grid>

          <Box
            display="flex"
            flexDirection="column"
            p={3}
            //mt={3}
            className={classes.inputs}
          >
            <Grid container direction="column" spacing={}>
              <Grid item>
                <Typography variant="h6">Email address</Typography>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  fullWidth="true"
                  placeholder="Enter your Email"
                ></TextField>
              </Grid>
             
              <Grid item>
                <Typography variant="h6">User Name</Typography>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  fullWidth="true"
                  placeholder="john Doe"
                ></TextField>
              </Grid>
              <Grid item>
                <Typography variant="h6">Password</Typography>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  fullWidth="true"
                  placeholder="*******"
                ></TextField>
              </Grid>

              <Box pt={6}>
                <Grid
                  container
                  spacing={8}
                  className="buttons"
                  direction="column"
                  alignItems="center"
                >
                  <Box width={"90%"}>
                    <Button
                      variant="contained"
                      fullWidth="true"
                      className={classes.lessround}
                    >
                      Create an Account
                    </Button>
                  </Box>
                  <Grid item>
                    <Typography variant="body2">
                    Already have an account?
                      <Link href="./" underline="always" color={"primary"}>
                        Log In
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
