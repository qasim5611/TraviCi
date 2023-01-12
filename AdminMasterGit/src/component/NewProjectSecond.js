import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Typography,
  Box,
  Button,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { Formik } from "formik";
import * as yep from "yup";
import { KeyboardDatePicker } from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  left: {
    background: "url(/images/BlueBG.png) no-repeat",
    backgroundPosition: "center right",
    // height: '100%',
  },
  contactusBox: {
    marginRight: 100,
    marginLeft: 40,
    paddingBottom: 30,
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function NewProjectSecond({ open, handleClose }) {
  const classes = useStyles();

  const [editotData, setEditotData] = useState("");

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent style={{ padding: 0 }}>
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
              <Box pt={5} pl={5}>
                <Typography paragraph variant="h3">
                  New Contract tttt
                </Typography>

                <Typography paragraph>Fill Out Details</Typography>
              </Box>
              <Box className={classes.contactusBox}>
                <Formik
                  initialValues={{
                    username1: "",
                    username2: "",
                    email1: "",
                    email2: "",
                    startDate: null,
                    endDate: null,
                    fileDocument: null,
                    description: "",
                    amount: "",
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={yep.object().shape({
                    username1: yep.string().required("Please Enter name"),
                    username2: yep.string().required("Please Enter name"),
                    email1: yep
                      .string()
                      .matches(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        "Please enter  valid email id"
                      )
                      .required("Email address required"),
                    email2: yep
                      .string()
                      .matches(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        "Please enter  valid email id"
                      )
                      .required("Email address required"),
                    startDate: yep.date().required("Start date is required"),
                    endDate: yep.date().required("End date is required"),
                    description: yep
                      .string()
                      .required("Please add description"),
                    amount: yep.string().required("Please select the amount"),
                  })}
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                  ) => {
                    console.log("Done", values);
                    handleClose();
                  }}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    touched,
                    values,
                    setFieldValue,
                  }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={2}>
                            <FormControl fullWidth>
                              <Typography paragraph>
                                Validatore Email Address{" "}
                              </Typography>
                              <TextField
                                type="text"
                                variant="outlined"
                                size="small"
                                name="email1"
                                placeholder="example@gmail.com"
                                value={values.email1}
                                error={Boolean(touched.email1 && errors.email1)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText error>
                                {touched.email1 && errors.email1}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={2}>
                            <FormControl fullWidth>
                              <Typography paragraph>
                                Validatore Username{" "}
                              </Typography>
                              <TextField
                                type="text"
                                variant="outlined"
                                size="small"
                                name="username1"
                                value={values.username1}
                                error={Boolean(
                                  touched.username1 && errors.username1
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText error>
                                {touched.username1 && errors.username1}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={2}>
                            <Typography paragraph>
                              Client Email Address{" "}
                            </Typography>
                            <FormControl fullWidth>
                              <TextField
                                type="text"
                                variant="outlined"
                                size="small"
                                name="email2"
                                placeholder="example@gmail.com"
                                value={values.email2}
                                error={Boolean(touched.email2 && errors.email2)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText error>
                                {touched.email2 && errors.email2}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={2}>
                            <Typography paragraph>Client Username </Typography>
                            <FormControl fullWidth>
                              <TextField
                                type="text"
                                variant="outlined"
                                size="small"
                                name="username2"
                                value={values.username2}
                                error={Boolean(
                                  touched.username2 && errors.username2
                                )}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <FormHelperText error>
                                {touched.username2 && errors.username2}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box mt={1}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Typography>Add Description</Typography>
                          </Grid>
                          <Grid item md={12}>
                            {/* <TextField
                              fullWidth
                              multiline
                              name="description"
                              rows={4}
                              variant="outlined"
                              value={values.description}
                              error={Boolean(
                                touched.description && errors.description
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            > */}
                            <FroalaEditorComponent
                              model={values.description}
                              name="description"
                              onModelChange={handleChange}
                              // value={values.description}
                              error={Boolean(
                                touched.description && errors.description
                              )}
                              onBlur={handleBlur}
                              attribution="false"
                            />

                            <FormHelperText error>
                              {touched.description && errors.description}
                            </FormHelperText>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box mt={1}>
                        <Grid container spacing={2} direction="column">
                          <Grid item>
                            <Typography>Enter Amount</Typography>
                          </Grid>
                          <Grid item md={4}>
                            <TextField
                              fullWidth
                              type="number"
                              name="amount"
                              size="small"
                              variant="outlined"
                              value={values.amount}
                              error={Boolean(touched.amount && errors.amount)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.amount && errors.amount}
                            </FormHelperText>
                          </Grid>
                        </Grid>
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={2}>
                            <FormControl fullWidth>
                              <Typography>Start Date</Typography>
                              <KeyboardDatePicker
                                placeholder="YYYY-MM-DD"
                                value={values.startDate}
                                onChange={(date) => {
                                  setFieldValue("startDate", new Date(date));
                                }}
                                format="YYYY-MM-DD"
                                inputVariant="outlined"
                                margin="dense"
                                name="startDate"
                                minDate={new Date()}
                                error={Boolean(
                                  touched.startDate && errors.startDate
                                )}
                                helperText={
                                  touched.startDate && errors.startDate
                                }
                              />
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={2}>
                            <FormControl fullWidth>
                              <Typography>Targeted End Date</Typography>
                              <KeyboardDatePicker
                                placeholder="YYYY-MM-DD"
                                value={values.endDate}
                                onChange={(date) => {
                                  setFieldValue("endDate", new Date(date));
                                }}
                                format="YYYY-MM-DD"
                                inputVariant="outlined"
                                margin="dense"
                                name="endDate"
                                minDate={new Date()}
                                error={Boolean(
                                  touched.endDate && errors.endDate
                                )}
                                helperText={touched.endDate && errors.endDate}
                              />
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box mt={2}>
                        <FormControl fullWidth>
                          <Button
                            variant="outlined"
                            component="label"
                            style={{ justifyContent: "flex-start" }}
                          >
                            {"+ Add Document"}
                            <input type="file" hidden />
                          </Button>
                        </FormControl>
                      </Box>

                      <Box mt={3} display="flex" justifyContent="center">
                        <Box width="75%">
                          <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                          >
                            New Contract
                          </Button>
                        </Box>
                      </Box>
                    </form>
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
}
