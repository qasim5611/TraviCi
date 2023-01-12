import React from "react";
import {
  Typography,
  Container,
  Button,
  makeStyles,
  Grid,
  Box,
  Card,
  CardMedia,
  TextField,
} from "@material-ui/core";
import ContactImg from "../../../Images/contactImg.jpg";
export default function () {
  const useStyles = makeStyles((theme) => ({
    lessround: {
      borderRadius: "4px",
      backgroundColor: "rgb(36,39,150)",
      color: "white",
    },
  }));

  const classes = useStyles();
  return (
    <Box display="flex" p={5}>
      <Grid container spacing={1}>
        <Grid item md={5}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="h1">Contact Us</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    Please feel free to speak to us if you have any questions
                  </Typography>
                  <Typography variant="body1">
                    We endeavour to answer within 24 hours
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                className="contact-form"
                direction="column"
                spacing={3}
              >
                <Grid item>
                  <Typography variant="h4">Name</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    xs={12}
                    fullWidth="true"
                    variant="outlined"
                    placeholder="Your Name"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h4">Email address..</Typography>
                </Grid>

                <Grid item>
                  <TextField
                    variant="outlined"
                    fullWidth="true"
                    placeholder="example@gmail.com"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h4">Message</Typography>
                </Grid>

                <Grid item>
                  <TextField
                    variant="outlined"
                    fullWidth="true"
                    multiline
                    rows={8}
                    placeholder="Write your message here....."
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth="true"
                    className={classes.lessround}
                  >
                    Send{" "}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={5}>
          <Container maxWidth="xs">
            <Card elevation={0}>
              <CardMedia
                component="img"
                alt="contactImage"
                image={ContactImg}
              />
            </Card>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
