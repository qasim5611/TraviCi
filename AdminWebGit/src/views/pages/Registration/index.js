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
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import React, { useState, useContext, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
import { useHistory } from "react-router-dom";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
import { toast } from "react-toastify";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { calculateTimeLeft } from "src/utils";

export default function (props) {
  console.log(props);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [otpPop, setOtpPop] = useState(false);
  const [otpverifyPop, setotpverifyPop] = useState(false);
  const [dob, setDob] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [countryCode, setCountryCode] = useState();
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [isSuccess, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState();
  const [token, setToken] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [OtpSuccess, setOtpSuccess] = useState("");
  const [isLoadingConform, setisLoadingConform] = useState(false);
  const [checkedApi, setCheckedApi] = useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const [otpTime, setForgetPassworData] = useState();

  console.log("checkedApi", checkedApi);

  const auth = useContext(AuthContext);
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
  // let email;
  // const emailHandler = (e) => {
  //   email = e.target.value;
  // };
  const classes = useStyles();
  const [isVerified, setIsverified] = useState(false);
  console.log("isVerified", isVerified);

  const redirect = () => {
    history.push({
      pathname: "/dashboard",
    });
  };
  const handleOtp = (element, index) => {
    // if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //focus next element
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  console.log("isLoading", isLoading);
  const closeSuccess = () => {
    setSuccess(false);
  };
  const openError = () => {
    setError(true);
    setOtpPop(false);
  };
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
  function handleInputChange(telNumber, selectedCountry) {
    console.log(
      "input changed. number: ",
      telNumber,
      "selected country: ",
      selectedCountry
    );
  }

  const handlePhoneChange = (phone) => {
    setPhone(phone);
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post(ApiConfig.sendOTP, {
        email: email,
      });

      if (response.data.response_code !== 200) {
        toast.error(response.data.response_message);
      } else if (response.data.response_code === 401) {
        setIsLoading(false);
        toast.error(response.data.response_message);
        alert(response.data.message);
      } else {
        setForgetPassworData(response.data.result.otpTime);
        setMinuteTimer(60);
        // setEndtime(moment().add(5, "m").unix());
        auth.setEndtime(moment().add(3, "m").unix());


        toast.success(response.data.response_message);
        setIsLoading(false);
        openOTPpop();
        console.log("response", response);
      }
    } catch (err) {
      toast.error(err);
      console.error(err.response);
      //  setIsLoading(false);
    }
  };
  const confirmOTP = async () => {
    const vari = otp.toString();
    setisLoadingConform(true);
    seterrorMessage("");
    try {
      const response = await axios.post(ApiConfig.verifyOTP, {
        email: email,
        otp: parseInt(vari.replace(/,/g, "")),
      });

      if (response.data.response_code !== 200) {
        toast.error(response.data.response_message);
        setisLoadingConform(false);
        seterrorMessage(response.data.response_message);
      } else if (response.data.response_code === 401) {
        setisLoadingConform(false);
        seterrorMessage(response.data.response_message);
        toast.error(response.data.response_message);

        // alert(response.data.response_message);
      } else {
        history.push("/dashboard");
        toast.success(response.data.response_message);

        setOtpSuccess(response.data.response_message);
        setisLoadingConform(false);
        setIsverified(true);
        // setToken(response.data.result.token);
        auth.userLogIn(
          true,
          response.data.result.token,
          response.data.result.userType,
          response.data.result.agencyTeam
        );
        setSuccessMsg(response.data.response_message);
        setSuccess(true);
        console.log("response", response);
      }
    } catch (err) {
      toast.error(err);

      console.error(err.response);
      //  setIsLoading(false);
    }
  };
  useEffect(() => {
    if (otpPop) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(new Date(parseInt(otpTime) * 1000)));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });
  const _onBackSpace = (e) => {
    const keyCode = e.keyCode;
    const prev = e.target.previousSibling;
    if (keyCode === 8 && prev !== null) {
      setTimeout(() => {
        prev.focus();
      });
    }
  };
  const [minuteTimer, setMinuteTimer] = useState();

  const [endTime, setEndtime] = useState();

  useEffect(() => {
    if (otpPop && endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  useEffect(
    (pages) => {
      setIsLoading(true);
      axios
        .get(ApiConfig.staticPageList, {
          headers: {
            token: accessToken,
          },
        })
        .then((response) => {
          if (response.data.response_code !== 200) {
          } else {
            setIsLoading(false);
            // setDisplayname
            // console.log(result)
            setUsers(
              response?.data?.result.filter((data) => data?.type === "T&C")
            );
            // setNumpages(response.data.result.pages);
            console.log(response);
          }
        })
        .catch((response) => {
          console.log("response", response);
        });
    },
    [pages]
  );

  return (
    <Page title="Registration">
      <Box textAlign="center">
        <Typography variant="h1">Sign Up</Typography>
      </Box>
      <Box
        // pt={7}
        pb={0}
        mt={5}
        style={{
          padding: "10px 40px",
          backgroundColor: "white",
          borderRadius: 10,
          // height: "65vh",
          marginBottom: "34px",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            agencyTeam: "",
            firstName: "",
            lastName: "",
            userName: "",
            mobileNumber: phone,
            password: "",
            dateOfBirth: new Date(),
          }}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={yep.object().shape({
            email: yep
              .string()
              .email("Please enter a valid email address")
              .required("Email address is required"),
            mobileNumber: yep.string().required("Mobile number is required"),
            // .matches(
            //   /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
            //   "Must be a valid mobilie"
            // ),
            password: yep
              .string()
              .required("Password is required")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must contain 8 characters, one uppercase, one lowercase, one number and one special character"
              ),
            userName: yep
              .string("Enter valid name")
              .required("First name is a required  ")
              .matches(/^\S*$/, "Enter valid name")
              .nullable()
              .max(20, "Should not exceed 20 digits"),

            // .string()
            // .required("User Name is required")

            // .min(5, "Should be 5 character long")
            // .max(20, "should not exceed 20 characters"),
            firstName: yep
              .string()
              .required("First name is required")

              .min(2, "Should be 2 character long")
              .max(30, "Should not exceed 30 characters")
              .matches(
                /^[A-Za-z]+$/,
                "Only alphabets are allowed for this field "
              ),
            // .matches(/^([A-Z][a-z]+)$/, " One upper case character and only alphabets are allowed for this field whitespaces are not. "),
            lastName: yep
              .string()
              .required("Last name is required")

              .min(2, "Should be 2 character long")
              .max(30, "Should not exceed 30 characters")
              .matches(
                /^[A-Za-z]+$/,
                "Only alphabets are allowed for this field "
              ),
            // .matches(/^([A-Z][a-z]+)$/, " One upper case character and only alphabets are allowed for this field whitespaces are not. "),

            agencyTeam: yep.string().max(75, "Should not exceed 75 characters"),
            dateOfBirth: yep
              .string()
              .required("DOB is required")
              .test(
                "DOB",
                "You must be 18 years old or above",
                (date) => moment().diff(moment(date), "years") >= 18
              ),
            // dateOfBirth: yep.string().required("DOB  is required"),
          })}
          onSubmit={async ({
            email,
            mobileNumber,
            agencyTeam,
            password,
            firstName,
            userName,
            lastName,
            dateOfBirth,
          }) => {
            setEmail(email);
            setIsLoading(true);
            if (checkedApi) {
              try {
                const response = await axios.post(ApiConfig.signUp, {
                  firstName,
                  lastName,
                  userName,
                  email,
                  mobileNumber: mobileNumber.slice(countryCode.length),
                  password,
                  dateOfBirth,
                  countryCode: `+${countryCode}`,
                  agencyTeam,
                });
                // setfield e will tell what its returning
                if (response.data.response_code !== 200) {
                  toast.error(response.data.response_message);
                  setIsLoading(false);
                  setErrorMsg(response.data.response_message);
                  openError();
                } else {

                  auth.setEndtime(moment().add(3, "m").unix());
                  // setEndtime(moment().add(5, "m").unix());

                  toast.success(response.data.response_message);
                  setForgetPassworData(response.data.result.otpTime);
                  setEmail(email);
                  setIsLoading(false);
                  openOTPpop();
                  console.log("response", response);
                }
              } catch (err) {
                console.error(err.response);
                //  setIsLoading(false);
              }
            } else {
              toast.error("Please select terms and conditions");
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
                <FormControl fullWidth style={{ paddingTop: "20px" }}>
                  <Box className="tooltiptext">
                    <Typography>
                      <strong>
                        {" "}
                        Email Address :<sup style={{ color: "#FF0000" }}>*</sup>
                      </strong>
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
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box mt={1}>
                <FormControl fullWidth>
                  <Typography variant="body1">
                    <strong> Agency Team :</strong>
                    <br />
                    <small>(Please leave empty if not a company)</small>
                  </Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    name="agencyTeam"
                    value={values.agencyTeam}
                    error={Boolean(touched.agencyTeam && errors.agencyTeam)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.agencyTeam && errors.agencyTeam}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box mt={1}>
                <FormControl fullWidth>
                  <Typography>
                    <strong>
                      {" "}
                      User Name :<sup style={{ color: "#FF0000" }}>*</sup>
                    </strong>
                  </Typography>

                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    name="userName"
                    value={values.userName}
                    error={Boolean(touched.userName && errors.userName)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.userName && errors.userName}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box mt={1}>
                <FormControl fullWidth>
                  <Typography>
                    <strong>
                      {" "}
                      Mobile Number :<sup style={{ color: "#FF0000" }}>
                        *
                      </sup>{" "}
                    </strong>
                  </Typography>

                  <PhoneInput
                    country={"us"}
                    name="mobileNumber"
                    value={values.mobileNumber}
                    error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                    onBlur={handleBlur}
                    // onChange={(phone) => handlePhoneChange(phone)}
                    onChange={(phone, e) => {
                      setCountryCode(e.dialCode);
                      setFieldValue("mobileNumber", phone);
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "45px",
                    }}
                  />
                  <FormHelperText error>
                    {touched.mobileNumber && errors.mobileNumber}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box mt={1}>
                <FormControl fullWidth>
                  <Typography>
                    <strong>
                      {" "}
                      First Name :<sup style={{ color: "#FF0000" }}>*</sup>
                    </strong>
                  </Typography>

                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    name="firstName"
                    value={values.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.firstName && errors.firstName}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box mt={1}>
                <FormControl fullWidth>
                  <Typography>
                    <strong>
                      {" "}
                      Last Name :<sup style={{ color: "#FF0000" }}>*</sup>
                    </strong>
                  </Typography>

                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    name="lastName"
                    value={values.lastName}
                    error={Boolean(touched.lastName && errors.lastName)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.lastName && errors.lastName}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box mt={1}>
                <FormControl fullWidth>
                  <Box className="tooltiptext">
                    <Typography>
                      <strong>
                        {" "}
                        Password : <sup style={{ color: "#FF0000" }}>*</sup>
                      </strong>
                    </Typography>
                    <Tooltip
                      describeChild
                      title="Must be at least 8 characters long, one uppercase letter, one lowercase letter,  One digit, one special character"
                      placement="top"
                    >
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </Box>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    size="small"
                    name="password"
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ height: "45px" }}
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

              <Box mt={1}>
                <FormControl fullWidth>
                  <Typography>
                    <strong>
                      {" "}
                      Date of Birth :<sup style={{ color: "#FF0000" }}>*</sup>
                    </strong>
                  </Typography>
                  <KeyboardDatePicker
                    placeholder="YYYY-MM-DD"
                    value={values.dateOfBirth}
                    onChange={(date) => {
                      setFieldValue("dateOfBirth", new Date(date));
                    }}
                    format="YYYY-MM-DD"
                    inputVariant="outlined"
                    disableFuture
                    margin="dense"
                    name="dateOfBirth"
                    error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                  />

                </FormControl>
                <Box>

                  <FormControlLabel
                    value={checkedApi}
                    color="primary"
                    control={<Checkbox />}
                    onChange={() => setCheckedApi(!checkedApi)}
                    label="Agree to terms & conditions"
                    labelPlacement="end"
                  />
                  <Link
                    target="_blank"
                    onClick={() =>
                      history.push({
                        pathname: "/terms-register",
                        state: {
                          id: users[0],
                        },
                      })
                    }
                    style={{
                      marginLeft: "-14px",
                      fontSize: "13px",
                      cursor: "pointer",
                      color: "#31159a",
                    }}
                  >
                    {users && users[0]?.title}
                  </Link>
                  {/* </FormControl> */}
                </Box>
              </Box>
              <Box mt={3}>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={isLoadingConform}
                >
                  Create an Account{isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Box textAlign="center" mt={3}>
          <Typography
            variant="body2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Already have an account? &nbsp;
            <Link to="/" component={RouterLink}>
              <Typography> Login </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>


      {otpPop &&
        <Dialog
          open={otpPop}
          onClose={closeOTPpop}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={confirmOTP}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box align="center">
                  <Typography
                    variant="h5"
                    style={{ color: "#52565c", marginBottom: "10px" }}
                  >
                    Enter OTP{" "}
                  </Typography>
                  <Typography variant="body2" style={{ color: "#52565c" }}>
                    Sent on your registered Email address
                  </Typography>
                </Box>
                <Box align="center" mb={1} mt={3}>
                  {otp.map((data, index) => {
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


                      />
                    );
                  })}
                  <Box textAlign="start" mt={1} align="center">
                    <Typography
                      style={{ color: "red" }}
                      variant="body1"
                      align="center"
                    >
                      {/* {errorMessage} */}
                    </Typography>
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
              <Box textAlign="start"  >
                {console.log(auth?.timeLeft, "82375984----error----")}
                {auth?.timeLeft && (
                  <Typography variant="body1" style={{ textAlign: "center", }}>

                    {auth?.timeLeft?.seconds >= 0 && auth?.timeLeft?.minutes >= 0 ? (
                      <>
                        <Typography
                          variant="body1"
                          style={{
                            color: "red",
                            fontSize: "13px",
                            fontWeight: 500,

                          }}

                        >
                          Your OTP will expire in {auth.timeLeft?.minutes} m :{" "}
                          {auth.timeLeft?.seconds} s
                        </Typography>{" "}

                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          sendOTP();
                          setOtpSent(true);
                          setTimeout(() => setOtpSent(false), 120000);
                        }}
                      >
                        {" "}
                        Resend OTP{" "}
                      </Button>
                    )}
                  </Typography>

                )}



              </Box>
              <Button
                type="submit"
                disabled={isLoadingConform}
                onClick={confirmOTP}
                color="primary"
              >
                Confirm{isLoadingConform && <ButtonCircularProgress />}
              </Button>

            </DialogActions>
          </form>
        </Dialog>

      }


    </Page>
  );
}
