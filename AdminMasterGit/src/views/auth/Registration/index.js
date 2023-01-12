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
import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import * as yep from "yup";
import { Link as RouterLink } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Page from "src/component/Page";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { KeyboardDatePicker } from "@material-ui/pickers";
export default function (props) {
  const [showPassword, setShowPassword] = useState(false);
  const [otpPop, setOtpPop] = useState(false);
  const [otpverifyPop, setotpverifyPop] = useState(false);
  const openOTPpop = () => {
    setOtpPop(true);
  };
  const closeOTPpop = () => {
    setOtpPop(false);
  };
  const openOTPverifypop = () => {
    setotpverifyPop(true);
  };
  const closeOTPverifypop = () => {
    setotpverifyPop(false);
  };
  const sendOTP = async ({ email }) => {
    try {
      const response = await axios.post(ApiConfig.sendOTP, {
        email,
      });

      if (response.data.status !== 200) {
      } else if (response.data.status === 401) {
        alert(response.data.message);
      } else {
        // auth.userLogIn(true, response.data.data.token);
        // chk for 2fa in res data then open  popupwith with 3 options viz send sms , google auth , skip (in radio button)
        // set
        openOTPpop();
        console.log("response", response);
      }
    } catch (err) {
      console.error(err.response);
      //  setIsLoading(false);
    }
  };
  const confirmOTP = async ({ mobileNumber, otp }) => {
    try {
      const response = await axios.post(ApiConfig.verifyOTP, {
        mobileNumber,
        otp,
      });

      if (response.data.status !== 200) {
      } else if (response.data.status === 401) {
        alert("Email id or password incorrect");
      } else {
        // auth.userLogIn(true, response.data.data.token);
        // chk for 2fa in res data then open  popupwith with 3 options viz send sms , google auth , skip (in radio button)
        // set
        openOTPverifypop();
        console.log("response", response);
      }
    } catch (err) {
      console.error(err.response);
      //  setIsLoading(false);
    }
  };

  return (
    <Page title="Registration">
      <Box>
        <Typography variant="h2" paragraph>
          Register
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          imperdiet nec diam in venenatis. Vestibulum a nunc diam.
        </Typography>
        <Box
          p={10}
          pt={7}
          pb={0}
          mt={5}
          style={{ backgroundColor: "white", borderRadius: 10, height: "100%" }}
        >
          <Formik
            initialValues={{
              email: "",
              companyName: "",
              username: "",
              mobileNumber: "",
              password: "",
              dateOfBirth: "",
            }}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yep.object().shape({
              email: yep
                .string()
                .email("Please enter a valid email address")

                .required("Email address required"),
              mobileNumber: yep.number().required("Please enter mobile number"),
              password: yep
                .string()
                .required("Please Enter your password")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
              username: yep.string().required("Username is required"),
              companyName: yep.string().required("Company Name is required"),
              dateOfBirth: yep.string().required("DOB  is required"),
            })}
            onSubmit={async ({
              email,
              mobileNumber,
              password,
              username,
              dateOfBirth,
            }) => {
              try {
                console.log(  email,
                  mobileNumber,
                  password,
                  username,
                  dateOfBirth);
                const response = await axios.post(ApiConfig.signUp, {
                  username,
                  email,
                  mobileNumber,
                  password,
                  dateOfBirth,
                });

                if (response.data.status !== 200) {
                } else if (response.data.status === 401) {
                  alert("Email id or password incorrect");
                } else {
                  // auth.userLogIn(true, response.data.data.token);
                  // chk for 2fa in res data then open  popupwith with 3 options viz send sms , google auth , skip (in radio button)
                  sendOTP();
                  console.log("response", response);
                }
              } catch (err) {
                console.error(err.response);
                //  setIsLoading(false);
              }
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
                    <Typography paragraph>Company Name</Typography>
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      name="companyName"
                      value={values.companyName}
                      error={Boolean(touched.companyName && errors.companyName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.companyName && errors.companyName}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Typography paragraph>Mobile Number</Typography>
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      name="mobileNumber"
                      value={values.mobileNumber}
                      error={Boolean(
                        touched.mobileNumber && errors.mobileNumber
                      )}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.mobileNumber && errors.mobileNumber}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Typography paragraph>User Name</Typography>
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
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Typography paragraph>Password</Typography>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      size="small"
                      name="password"
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
                <Box mt={2}>
                  <FormControl fullWidth>
                    
                    <Typography paragraph>DOB</Typography>
                    <OutlinedInput
                      type="text" 
                      variant="outlined"
                      size="small"
                      name="dateOfBirth"
                      value={values.dateOfBirth}
                      error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                     
                    />
                    <FormHelperText error>
                      {touched.dateOfBirth && errors.dateOfBirth}
                    </FormHelperText>
                  </FormControl>
                  {/* <FormControl fullWidth>
                    <Typography>Date of birth</Typography>
                    <KeyboardDatePicker
                      placeholder="YYYY-MM-DD"
                      value={values.dateOfBirth}
                      onChange={(date) => {
                        setFieldValue("endDate", new Date(date));
                      }}
                      format="YYYY-MM-DD"
                      inputVariant="outlined"
                      margin="dense"
                      name="dateOfBirth"
                      error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                      helperText={touched.dateOfBirth && errors.dateOfBirth}
                    />
                    <FormHelperText error>
                      {touched.dateOfBirth && errors.dateOfBirth}
                    </FormHelperText>
                  </FormControl> */}
                </Box>
                <Box mt={3}>
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Create an Account
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Box textAlign="center" p={3}>
            <Link to="/" component={RouterLink}>
              <Typography>Login</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={otpPop}
        onClose={closeOTPpop}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter OTP sent to your registered mobile number
            <TextField placeholder="otp" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmOTP} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={otpverifyPop}
        onClose={closeOTPverifypop}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter OTP sent to your registered mobile number
            <TextField placeholder="otp" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmOTP} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}
