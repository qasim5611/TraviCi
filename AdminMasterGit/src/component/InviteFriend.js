import React from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  FormControl,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CloseIcon from "@material-ui/icons/Close";

const validationSchema = Yup.object().shape({
  people: Yup.array().of(
    Yup.object().shape({
      email: Yup.string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email address"
        )
        .required("Email address required"),
      name: Yup.string().required("Name is required"),
    })
  ),
});

// const debug = true;

const useStyles = makeStyles((theme) => ({
  contactusBox: {
    marginRight: 100,
    marginLeft: 40,
    paddingBottom: 30,
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  left: {
    background: "url(/images/BlueBG.png) no-repeat",
    backgroundPosition: "center right",
    minHeight: 600,
    // height: '100%',
  },
  button: {
    fontSize: 22,
    color: "#a1a3af",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const InviteFriend = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent style={{ padding: 0, minHeight: 600 }}>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <Box pr={5}>
              <Box pt={5} pl={5} pb={2}>
                <Typography paragraph variant="h3">
                  Invite a friend to contract
                </Typography>

                <Typography paragraph>Lorem ipsum doler sit amet</Typography>
              </Box>
              <Box className={classes.contactusBox}>
                <Grid container spacing={2}>
                  <Grid item md={5} sm={5} xs={12}>
                    <Typography paragraph>Email Address</Typography>
                  </Grid>
                  <Grid item md={7} sm={7} xs={12}>
                    <Typography paragraph>Name</Typography>
                  </Grid>
                </Grid>

                <Formik
                  initialValues={{
                    people: [
                      {
                        id: Math.random(),
                        email: "",
                        name: "",
                      },
                    ],
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    // console.log('onSubmit', JSON.stringify(values, null, 2));
                    console.log("Done");
                  }}
                >
                  {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    isValid,
                  }) => (
                    <Form noValidate autoComplete="off">
                      <FieldArray name="people">
                        {({ push, remove }) => (
                          <div>
                            {values.people.map((p, index) => {
                              const email = `people[${index}].email`;
                              const touchedEmail = getIn(touched, email);
                              const errorEmail = getIn(errors, email);

                              const name = `people[${index}].name`;
                              const touchedName = getIn(touched, name);
                              const errordName = getIn(errors, name);

                              return (
                                <Grid container spacing={2} key={p.id}>
                                  <Grid item md={5} sm={5} xs={12}>
                                    <Box>
                                      <FormControl fullWidth>
                                        <TextField
                                          type="text"
                                          variant="outlined"
                                          size="small"
                                          name={email}
                                          value={p.email}
                                          required
                                          error={Boolean(
                                            touchedEmail && errorEmail
                                          )}
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        />
                                        <FormHelperText error>
                                          {touchedEmail && errorEmail
                                            ? errorEmail
                                            : ""}
                                        </FormHelperText>
                                      </FormControl>
                                    </Box>
                                  </Grid>
                                  <Grid item md={7} sm={7} xs={12}>
                                    <Box display="flex">
                                      <Box>
                                        <FormControl fullWidth>
                                          <TextField
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            name={name}
                                            value={p.name}
                                            required
                                            error={Boolean(
                                              touchedName && errordName
                                            )}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                          />
                                          <FormHelperText error>
                                            {touchedName && errordName
                                              ? errordName
                                              : ""}
                                          </FormHelperText>
                                        </FormControl>
                                      </Box>
                                      <Box pl={1}>
                                        <Button
                                          className={classes.button}
                                          margin="normal"
                                          type="button"
                                          color="secondary"
                                          //   variant="outlined"
                                          onClick={() => remove(index)}
                                        >
                                          x
                                        </Button>
                                      </Box>
                                    </Box>
                                  </Grid>
                                  {/* <Grid item md={2} sm={2} xs={12}>
                                    <Box mt={6}></Box>
                                  </Grid> */}
                                </Grid>
                              );
                            })}
                            <Button
                              type="button"
                              //   variant="outlined"
                              color="primary"
                              onClick={() =>
                                push({
                                  id: Math.random(),
                                  email: "",
                                  name: "",
                                })
                              }
                            >
                              <AddCircleOutlineOutlinedIcon
                                style={{ marginRight: 5 }}
                              />{" "}
                              Add New Or Add Multiple at Once
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                      {/* <Divider style={{ marginTop: 20, marginBottom: 20 }} /> */}

                      <Box mt={3} display="flex" justifyContent="start">
                        <Box width="50%">
                          <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                          >
                            Send Invitation
                          </Button>
                        </Box>
                      </Box>

                      {/* <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                      {debug && (
                        <>
                          <pre style={{ textAlign: 'left' }}>
                            <strong>Values</strong>
                            <br />
                            {JSON.stringify(values, null, 2)}
                          </pre>
                          <pre style={{ textAlign: 'left' }}>
                            <strong>Errors</strong>
                            <br />
                            {JSON.stringify(errors, null, 2)}
                          </pre>
                        </>
                      )} */}
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5} className={classes.left}>
            {/* <Hidden mdDown> */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <img src="images/Contactus.png" width="350" alt="" />
            </Box>
            {/* </Hidden> */}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default InviteFriend;
