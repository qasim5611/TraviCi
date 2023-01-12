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
  OutlinedInput,
} from "@material-ui/core";
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

export default function (props) {
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [token, setToken] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();

  const accessToken = window.localStorage.getItem("creatturAccessToken");
  if (accessToken) {
    history.push("/dashboard");
    return <div></div>;
  }

  return (
    <Page title="Login">
      <Box>
        <Box
          // p={10}
          // pt={7}
          // pb={0}
          mt={5}
          style={{ backgroundColor: "white", borderRadius: 10, height: "100%" }}
        >
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
                .required("Email address is required"),
              password: yep.string().required("Please enter your password"),
            })}
            onSubmit={async ({ email, password }) => {
              try {
                const response = await axios.post(ApiConfig.adLogin, {
                  email: email,
                  password: password,
                });

                if (response.data.response_code !== 200) {
                  // setIserror(true);
                  // setIsSuccess(false);
                  // setAlertMsg(response.data.message);
                  console.log(response.data.response_message);
                  setErrorMessage(response.data.response_message);
                  handleClickOpen();
                } else {
                  // auth.userLogIn(true, response.data.data.token);
                  // chk for 2fa in res data then open  popupwith with 3 options viz send sms , google auth , skip (in radio button)
                  auth.userLogIn(
                    true,
                    response.data.result.token,
                    response.data.result.userType,
                    response.data.result.agencyTeam
                  );
                  setToken(response.data.result.token);
                  console.log("response", response);
                  console.log("response", token);
                  console.log("result on admin login", response.data.result);
                  // setIsUpdating(false);

                  console.log("Done");

                  // history.push("/dashboard");
                }
              } catch (err) {
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
                    <Typography paragraph>Email Address</Typography>
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
                    <Typography paragraph>Password</Typography>
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
                <Box textAlign="center" p={5}>
                  <Link to="/forgot-password" component={RouterLink}>
                    <Typography>Forgot Password?</Typography>
                  </Link>
                </Box>
                <Box>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Box textAlign="center" p={3}>
            <Link to="/registration" component={RouterLink}>
              <Typography>Create Account</Typography>
            </Link>
          </Box>
        </Box>
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
    </Page>
  );
}
