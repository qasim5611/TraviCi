import {
  Typography,
  Box,
  FormControl,
  Button,
  FormHelperText,
  TextField,
  Link,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  OutlinedInput,
  Tooltip,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import * as yep from "yup";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import ApiConfig from "src/Config/APIconfig";
import Page from "src/component/Page";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { AuthContext } from "src/context/Auth";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import PageLoading from "src/component/PageLoading";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
const useStyles = makeStyles(() => ({
  headsectionbox: {

    padding: "56px",
    paddingTop: "56px",
    paddingBotton: "0px",
    marginTop: "40px",
    backgroundColor: "white",
    borderRadius: 10,
    height: "100%",
    "@media(max-width:410px)": { padding: "35px" },
  },
}));
export default function (props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [token, setToken] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();

  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  if (accessToken) {
    history.push("/dashboard");
    return <div></div>;
  }
  return (
    <Page title="Login">
      <Box pb={2}>
        <Typography
          style={{ textAlign: "center", color: "#52565c " }}
          variant="h2"
          paragraph
        >
          Log In
        </Typography>
        {/* <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          imperdiet nec diam in venenatis. Vestibulum a nunc diam.
        </Typography> */}

        <Box className={classes.headsectionbox}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yep.object().shape({
              email: yep
                .string()
                .matches(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  "Please enter a valid email address"
                )
                .required("Email address required"),
              password: yep.string().required("Password required"),
              //   password: yep
              //     .string()
              //     .required("Please Enter your password")
              //     .matches(
              //       "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
              //       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              //     ),
            })}
            onSubmit={async ({ email, password }) => {
              setLoader(true);
              try {
                const response = await axios.post(ApiConfig.adLogin, {
                  email: email,
                  password: password,
                });

                if (response.data.response_code !== 200) {
                  setLoader(false);

                  // setIserror(true);
                  // setIsSuccess(false);
                  // setAlertMsg(response.data.message);
                  console.log(response.data.response_message);
                  setErrorMessage(response.data.response_message);
                  toast.error(response.data.response_message)
                  // handleClickOpen();
                } else {
                  setLoader(false);
                  auth.userLogIn(true, response.data.result.token);
                  setToken(response.data.result.token);
                  // window.sessionStorage.setItem(
                  //   "tokenNew",
                  //   response.data.result.token
                  // );
                  // setIsUpdating(false);

                  console.log("Done");

                  history.push("/dashboard");
                }
              } catch (err) {
                setLoader(false);

                console.error(err.response);
                //  setIsLoading(false);
                // setIserror(true);
                // setIsSuccess(false);
                // setIsUpdating(false);
                // setAlertMsg(err.response.data.message);
              }
            }}
          // onSubmit={() => {
          //   history.push("/dashboard");
          // }}
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
                  <FormControl fullWidth>
                    <Box className="tooltiptext">
                      <Typography>
                        <strong>  Email Address :<sup style={{ color: "#FF0000" }}>*</sup></strong>
                      </Typography>
                      <Tooltip
                        describeChild
                        title="There must be only one @ symbol between user name and domain. There should not be any blank space." placement="top"
                      >
                        <InfoOutlinedIcon />
                      </Tooltip>
                    </Box>
                    {/* <Typography paragraph>
                      Email Address :<span style={{ color: "red" }}>*</span>
                    </Typography> */}
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      name="email"
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.email && errors.email}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Typography paragraph>
                      Password :<span style={{ color: "red" }}>*</span>
                    </Typography>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      name="password"
                      margin="dense"
                      value={values.password}
                      error={Boolean(touched.password && errors.password)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error>
                      {touched.password && errors.password}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box textAlign="right">
                  <Link to="/forgot-password" component={RouterLink}>
                    Forgot Password?
                  </Link>
                </Box>
                <Box style={{ paddingTop: "20px", paddingBottom: "30px" }}>
                  <Button
                    style={{ marginBottom: "20px" }}
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={loader}
                  >
                    Login{" "}
                    {loader && (
                      <Box color="white" pl={1.5} display="flex">
                        {/* <CircularProgress /> */}
                        <ButtonCircularProgress />
                        {/* <PageLoading/> */}
                      </Box>
                    )}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          {/* <Box textAlign="center" p={3}>
						<Link to="/registration" component={RouterLink}>
							<Typography>Create Account</Typography>
						</Link>
					</Box> */}
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Page>
  );
}
