import React, { useContext } from "react";
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
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { Formik } from "formik";
import * as yep from "yup";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  left: {
    background: "url(/images/BlueBG.png) no-repeat",
    backgroundPosition: "center right",
    // height: '100%',
  },
  contactusBox: {
    marginRight: 50,
    marginLeft: 50,
    paddingBottom: 50,
    paddingTop: "50px",
    "& h3":{
      marginBottom:"10px",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 30,
      marginLeft: 30,
      paddingBottom: 30,
      paddingTop: "30px",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: 15,
      marginLeft: 15,
      paddingBottom: 15,
      paddingTop: "15px",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function NewProjectFrist({ open, handleClose, onSubmit }) {
  const classes = useStyles();
  const agencyTeam = window.localStorage.getItem("agencyTeam");

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
          <Grid item xs={12} sm={12} md={6}>
            <Box  className={classes.contactusBox}>
                <Typography  variant="h3">
                  New Contract
                </Typography>

                <Typography paragraph>Fill Out Details</Typography>
                &nbsp;
                <Formik
                  initialValues={{
                    contractName: window.localStorage.getItem("contractName")
                      ? window.localStorage.getItem("contractName")
                      : "",
                    agencyTeam,
                    privacy: window.localStorage.getItem("privacy")
                      ? window.localStorage.getItem("privacy")
                      : "",
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={yep.object().shape({
                    contractName: yep.string().required("Please enter name"),
                    privacy: yep.string().required("Please select privacy"),
                  })}
                  onSubmit={onSubmit}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    touched,
                    values,
                  }) => (
                    <form noValidate onSubmit={handleSubmit}>
                     
                      <Box>
                        <FormControl fullWidth >
                          <Typography paragraph><strong>Contract Name :</strong></Typography>
                          <TextField
                            type="text"
                            variant="outlined"
                            size="small"
                            name="contractName"
                            value={values.contractName}
                            error={Boolean(
                              touched.contractName && errors.contractName
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error>
                            {touched.contractName && errors.contractName}
                          </FormHelperText>
                        </FormControl>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={1}>
                            <FormControl fullWidth variant="outlined">
                              <Typography paragraph><strong>Agency Name :</strong></Typography>
                              <TextField
                              disabled
                                name="agencyTeam"
                                variant="outlined"
                                size="small"
                                value={agencyTeam}
                              />
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={1}>
                            <FormControl fullWidth variant="outlined">
                              <Typography paragraph><strong>Privacy :</strong></Typography>
                              <Select
                                fullWidth
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                margin="dense"
                                name="privacy"
                                error={Boolean(
                                  touched.privacy && errors.privacy
                                )}
                                value={values.privacy}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value={"PRIVATE"}>Private</MenuItem>
                                <MenuItem value={"PUBLIC"}>Public</MenuItem>
                              </Select>
                              <FormHelperText error>
                                {touched.privacy && errors.privacy}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box mt={3} align="center">
                          <Button
                            type="submit"
                            fullWidth
                            size="medium"
                            variant="contained"
                            color="primary"
                          >
                            Next
                          </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.left}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <img src="images/Contactus.png" width="350" alt="" />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
