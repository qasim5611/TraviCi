import {
  Typography,
  Box,
  FormControl,
  Button,
  FormHelperText,
  TextField,
  Link,
  Tooltip,
  // makeStyles,
  // Typography,
  // Box,
  // FormControl,
  // Button,
  // FormHelperText,
  // TextField,
  // Link,
  IconButton,
  InputAdornment,
  OutlinedInput,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yep from "yup";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { useHistory } from "react-router-dom";
import Page from "src/component/Page";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { calculateTimeLeft } from "src/utils";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  otp: {
    width: 50,
    height: 35,
    textAlign: "center",
    marginLeft: 10,
    // marginBottom: 10,
    border: "0.8px solid #ccc",
    borderRadius: "3px",
    fontSize: 20,
    "@media (max-width:767px)": {
      width: 45,
    },
  },
}));
export default function (props) {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [OtpSuccess, setOtpSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mail, setMail] = useState("");
  const [isVerified, setIsverified] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isLoadingVer, setisLoadingVer] = useState(false);
  const [isLoaderSubmit, setisLoaderSubmit] = useState(false);
  const [otpTime, setForgetPassworData] = useState();
  const [minuteTimer, setMinuteTimer] = useState();

  console.log("otpTime", minuteTimer);
  const redirect = () => {
    history.push({
      pathname: "/reset-password",
      search: "?query=abc",
      state: { email: mail },
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(
    (element) => {
      if (!otp && deletData === 8) {
        element.current.focus();
      }
    },
    [otp]
  );

  const classes = useStyles();
  const handleOtp = (element, index) => {
    // if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //focus next element
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  // const setOtp = (e) => {
  //   setOTP(e.target.value);
  // };

  const verifyOtp = async (email) => {
    const vari = otp.toString();
    setErrorMessage("");
    setisLoadingVer(true);
    try {
      const response = await axios.post(ApiConfig.verifyOTP, {
        email: mail,
        otp: parseInt(vari.replace(/,/g, "")),
      });

      if (response.data.response_code !== 200) {
        toast.error(response.data.response_message);
        setErrorMessage(response.data.response_message);
        setisLoadingVer(false);
      } else {
        console.log("response", response);
        setOtpSuccess(response.data.response_message);
        toast.success(response.data.response_message);

        setIsverified(true);
        // setOpen1(true);
        // handleClickOpen();
        history.push("/reset-password");
      }
    } catch (err) {
      console.error(err.response);
      //  setIsLoading(false);
    }
  };
  const sendOTP = async () => {
    try {
      const response = await axios.post(ApiConfig.sendOTP, {
        email: mail,
      });

      if (response.data.response_code !== 200) {
        toast.error(response.data.response_message);
      } else if (response.data.response_code === 401) {
        setIsLoading(false);
        toast.error(response.data.response_message);
        alert(response.data.message);
      } else {
        setEndtime(moment().add(5, "m").unix());
        setMinuteTimer(60);
        toast.success(response.data.response_message);
        setIsLoading(false);
        // openOTPpop();
        console.log("response", response);
      }
    } catch (err) {
      toast.error(err);
      console.error(err.response);
      //  setIsLoading(false);
    }
  };
  const openError = () => {
    setError(true);
  };
  const [deletData, setDeletData] = useState("");
  const _onBackSpace = (e) => {
    const keyCode = e.keyCode;
    const prev = e.target.previousSibling;
    if (keyCode === 8 && prev !== null) {
      setTimeout(() => {
        prev.focus();
      });
    }
  };
  const [timeLeft, setTimeLeft] = useState();
  console.log("deletData", timeLeft);

  // useEffect(() => {
  //   if (open) {
  //     let timeout;
  //     if (minuteTimer && minuteTimer >= 0) {
  //       timeout = setTimeout(() => {
  //         setMinuteTimer(
  //           calculateTimeLeft(new Date(parseInt(minuteTimer) * 1000))
  //         );
  //       }, 1000);
  //     } else {
  //       setMinuteTimer();
  //       clearTimeout(timeout);
  //     }
  //   }
  // });
  const [endTime, setEndtime] = useState();
  useEffect(() => {
    if (open && endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });
  console.log("timeLeft******", timeLeft);
  return (
    <Page title="Forgot Password">
      <Box align="center">
        <Typography variant="h2" paragraph>
          Forgot Password
        </Typography>
        <Typography variant="body2">
          Enter your Email address below and you will receive an OTP
        </Typography>
      </Box>
      <Box
        mt={5}
        style={{
          backgroundColor: "white",
          padding: "45px",
          borderRadius: 10,
          height: "100%",
        }}
      >
        <Formik
          initialValues={{
            email: mail,
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
          })}
          onSubmit={async ({ email }) => {
            setisLoaderSubmit(true);
            try {
              const response = await axios.post(ApiConfig.forgotPassword, {
                email,
              });
              localStorage.setItem("userMailForPaswword", email);
              if (response.data.response_code !== 200) {
                setisLoaderSubmit(false);
                toast.error(response.data.response_message);
              } else {
                setMinuteTimer(60);
                setisLoaderSubmit(false);
                toast.success(response.data.response_message);
                setMinuteTimer(300);
                setForgetPassworData(response.data.result.otpTime);
                console.log("timerTime******", response.data.result.otpTime);
                console.log("response", response);
                handleClickOpen();
                setEndtime(moment().add(5, "m").unix());
              }
            } catch (err) {
              setisLoaderSubmit(false);

              toast.error(err);
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
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Box>
                <FormControl fullWidth>
                  <Box className="tooltiptext">
                    <Typography paragraph>
                      <strong>Email Address :</strong>
                    </Typography>
                    <Tooltip
                      describeChild
                      title="There must be only one @ symbol between user name and domain. There should not be any blank space."
                      placement="top"
                    >
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </Box>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    name="email"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setMail(e.target.value);
                    }}
                  />
                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box mt={3}>
                <Link to="/reset-password">
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    disabled={isLoaderSubmit}
                    color="primary"
                  >
                    Submit{isLoaderSubmit && <ButtonCircularProgress />}
                  </Button>
                </Link>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={verifyOtp}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box align="center">
                <Typography variant="h4">Enter your OTP</Typography>
              </Box>

              <Box mt={3} mb={1} align="center">
                {otp &&
                  otp?.map((data, index) => {
                    return (
                      <input
                        type="text"
                        name="otp"
                        maxLength="1"
                        className={classes.otp}
                        key={index}
                        value={data}
                        onChange={(e) => handleOtp(e.target, index)}
                        onKeyDown={_onBackSpace}
                      // onKeyUp={(e)=> setDeletData(e.keyCode)}
                      // error={isSubmit && otp === ''}
                      // helperText={isSubmit && otp === '' && 'Enter OTP'}
                      // onFocus={(e) => e.target.select()}
                      />
                    );
                  })}

                <Box textAlign="start" mt={1}>
                  {timeLeft && (
                    <Typography variant="body1" style={{ textAlign: "center" }}>
                      {timeLeft && timeLeft.seconds >= 0 ? (
                        <>
                          <Typography variant="body1" style={{ color: "red", fontSize: "13px", fontWeight: 500 }}
                          // onClick={sendOTP}
                          // disabled={timeLeft && timeLeft.seconds > 0}
                          >
                            Your OTP will expire in {timeLeft?.minutes} m : {timeLeft?.seconds} s
                          </Typography>{" "}
                          {/* <span style={{  color:"red" }}>
                      {` in ${timeLeft?.minutes}
                                    m : ${timeLeft?.seconds} s`}
                    </span> */}
                        </>
                      ) : (
                        <Button
                          onClick={sendOTP}
                          disabled={timeLeft && timeLeft.seconds > 0}
                        >
                          {" "}
                          Resend OTP{" "}
                        </Button>
                      )}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Typography
                style={{ color: "green" }}
                variant="body1"
                align="center"
              >
                {/* {OtpSuccess} */}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={verifyOtp}
              type="submit"
              disabled={isLoadingVer}
              color="primary"
            >
              {" "}
              Verify{isLoadingVer && <ButtonCircularProgress />}
            </Button>

            {/* {isVerified ? (
            <Button onClick={redirect} color="primary">
              Ok
            </Button>
          ) : (
            <Button onClick={verifyOtp} disabled={isLoadingVer} color="primary">
              {" "}
              Verify {isLoadingVer && <ButtonCircularProgress />}
            </Button>
          )} */}
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            <Typography
              variant="h4"
              style={{ color: "#52565c", marginBottom: "10px" }}
            >
              Enter your OTP
            </Typography>
            <Formik
              initialValues={{
                // email: "",
                // agencyTeam: "",
                // firstName: "",
                // lastName: "",
                // userName: "",
                // mobileNumber: phone,
                password: "",
                conformPassword: "",
                // dateOfBirth: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                password: yep
                  .string()
                  .required("Please enter your password")
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
                  ),
                // firstName: yep.string().required("First Name is required"),
                // lastName: yep.string().required("Last Name is required"),
                // // companyName: yep.string().required("Company Name is required"),
                // dateOfBirth: yep.string().required("DOB  is required"),
              })}
              onSubmit={async ({
                email,
                // mobileNumber,
                // agencyTeam,
                password,
                // firstName,
                // userName,
                // lastName,
                // dateOfBirth,
              }) => {
                // setEmail(email);
                setIsLoading(true);
                try {
                  const response = await axios.post(ApiConfig.signUp, {
                    // firstName,
                    // lastName,
                    // userName,
                    // email,
                    // mobileNumber: mobileNumber.slice(countryCode.length),
                    password,
                    // dateOfBirth,
                    // countryCode,
                    // agencyTeam,
                  });
                  // setfield e will tell what its returning
                  if (response.data.response_code !== 200) {
                    toast.error(response.data.response_message);
                    setIsLoading(false);
                    setErrorMsg(response.data.response_message);
                    openError();
                  } else {
                    toast.success(response.data.response_message);
                    // setEmail(email);
                    setIsLoading(false);
                    // openOTPpop();
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
                  <Box mt={1}>
                    <FormControl fullWidth>
                      <Typography variant="body1">
                        Password<sup style={{ color: "#FF0000" }}>*</sup>
                      </Typography>
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {/* <FormHelperText error>
                        {touched.password && errors.password}
                      </FormHelperText> */}
                    </FormControl>
                  </Box>

                  <Box mt={1}>
                    <FormControl fullWidth>
                      <Typography variant="body1">
                        Password<sup style={{ color: "#FF0000" }}>*</sup>
                      </Typography>
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {/* <FormHelperText error>
                        {touched.password && errors.password}
                      </FormHelperText> */}
                    </FormControl>
                  </Box>
                  <Box mt={3}>
                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      Confirm {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isVerified ? (
            <Button onClick={redirect} color="primary">
              Ok
            </Button>
          ) : (
            <Button onClick={verifyOtp} color="primary">
              {" "}
              Verify
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Page>
  );
}
