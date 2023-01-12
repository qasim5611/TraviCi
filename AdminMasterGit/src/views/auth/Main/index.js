import React from 'react';
import Page from 'src/component/Page';
import {
  Box,
  Typography,
  Container,
  makeStyles,
  Button,
  Grid,
} from '@material-ui/core';
import Logo from 'src/component/Logo';

const useStyles = makeStyles((theme) => ({
  header: {
    background: '#ffffff',
    padding: '10px 20px',
  },
  link: {
    color: '#fafafa',
  },
  mobileCenter: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));

function LoginMain(props) {
  const classes = useStyles();
  return (
    <Page title="Login">
      <Box className={classes.header}>
        <Grid container>
          <Grid item xs={12} sm={12} md={3}>
            <Box className={classes.mobileCenter} style={{ paddingTop: '5px' }}>
              <Logo />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Box textAlign="right" className={classes.mobileCenter}>
              <Button variant="text" className={classes.link} size="large">
                Login
              </Button>
              <Button variant="text" className={classes.link} size="large">
                Signup
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}

export default LoginMain;
