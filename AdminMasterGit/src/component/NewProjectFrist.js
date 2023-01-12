import React from "react";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from "@material-ui/core/FormLabel";
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

// const list = [
//   {
//     id: 1,
//     name: "In Draft",
//   },
//   {
//     id: 2,
//     name: "In Review",
//   },
//   {
//     id: 3,
//     name: "Live / Active",
//   },
//   {
//     id: 4,
//     name: "Validation",
//   },
//   {
//     id: 5,
//     name: "Completed",
//   },
// ];

export default function NewProjectFrist({
  open,
  handleClose,
  setNewProjectSecondHandler,
}) {
  const classes = useStyles();
  const [Rvalue, setRValue] = React.useState("female");

  const handleRChange = (event) => {
    setRValue(event.target.value);
  };
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
                  New Contract
                </Typography>

                <Typography paragraph>Fill Out Details</Typography>
              </Box>
              <Box className={classes.contactusBox}>
                <Formik
                  initialValues={{
                    username: "",
                    team: "",
                    privacy: "",
                  }}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={yep.object().shape({
                    username: yep.string().required("Please Enter name"),
                    team: yep.string().required("Please select team"),
                    privacy: yep.string().required("Please select privacy"),
                  })}
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                  ) => {
                    console.log("Done");
                    setNewProjectSecondHandler();
                  }}
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
                      <Box pb={3} display="flex" alignItems="center">
                        <Typography variant="body1">Status :</Typography>
                        <Typography variant="h6" style={{ marginLeft: "10px" }}>
                          In Draft
                        </Typography>
                        {/* <FormControl component="fieldset">
                          <FormLabel component="legend" style={{marginBottom:'10px'}}>Status</FormLabel>
                          <RadioGroup
                            aria-label="In Draft"
                            name="status"
                            value={Rvalue}
                            onChange={handleRChange}
                          >
                            <Grid container spacing={3}>
                              <Grid item>
                                <FormControlLabel
                                  value="In Review"
                                  control={<Radio />}
                                  label="In Review"
                                />
                              </Grid>
                              <Grid item>
                                <FormControlLabel
                                  value="Live / Active"
                                  control={<Radio />}
                                  label="Live / Active"
                                />
                              </Grid>
                              <Grid item>
                                <FormControlLabel
                                  value="Validation"
                                  control={<Radio />}
                                  label="Validation"
                                />
                              </Grid>
                              <Grid item>
                                <FormControlLabel
                                  value="Completed"
                                  control={<Radio />}
                                  label="Completed"
                                />
                              </Grid>
                            </Grid>
                          </RadioGroup>
                        </FormControl> */}
                        {/* {list.map((data, i) => {
                          return (
                            <div id="ck-button" key={i}>
                              <label>
                                <input type="checkbox" value="1" />
                                <span>
                                  <Typography>{data.name}</Typography>
                                </span>
                              </label>
                            </div>
                          );
                        })} */}
                      </Box>
                      <Box>
                        <FormControl fullWidth style={{ marginTop: 24 }}>
                          <Typography paragraph>Contract Name</Typography>
                          <TextField
                            type="text"
                            variant="outlined"
                            size="small"
                            name="username"
                            value={values.username}
                            error={Boolean(touched.username && errors.username)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error>
                            {touched.username && errors.username}
                          </FormHelperText>
                        </FormControl>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={3}>
                            <FormControl fullWidth variant="outlined">
                              <Typography paragraph>Agency Team</Typography>
                              <Select
                                fullWidth
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                margin="dense"
                                name="team"
                                error={Boolean(touched.team && errors.team)}
                                value={values.team}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Mobiloitte"}>
                                  Mobiloitte Technologies
                                </MenuItem>
                                <MenuItem value={"XYZ"}>Company XYZ</MenuItem>
                              </Select>
                              <FormHelperText error>
                                {touched.team && errors.team}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12}>
                          <Box mt={3}>
                            <FormControl fullWidth variant="outlined">
                              <Typography paragraph>Privacy</Typography>
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
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Private</MenuItem>
                                <MenuItem value={20}>Public</MenuItem>
                              </Select>
                              <FormHelperText error>
                                {touched.privacy && errors.privacy}
                              </FormHelperText>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box mt={3} display="flex" justifyContent="center">
                        <Box width="75%">
                          <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                          >
                            Next
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
