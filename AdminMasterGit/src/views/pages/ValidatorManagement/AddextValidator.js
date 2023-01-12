import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import {
  Container,
  Divider,
  Box,
  Card,
  Grid,
  CardContent,
  Typography,
  Button,
  Dialog,
  TextField,
  FormHelperText,
  MenuItem,
  FormControl,
  Paper,
  OutlinedInput,
  makeStyles,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Page from "src/component/Page";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ApiConfig from "src/Config/APIconfig";
import PageLoading from "src/component/PageLoading";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const useStyles = makeStyles({
  form: {
    "& .MuiOutlinedInput-input": {
      padding: "13px 14px",
    },
  },
  btn: {
    backgroundColor: "#C54C82",
    color: "white",
    borderRadius: "40px",
    width: "130px",
    height: "6vh",
    "@media(max-width:768px)": {
      width: "87px",
      height: "50px",
    },
  },
  btn2: {
    backgroundColor: "#686869",
    color: "white",
    borderRadius: "40px",
    width: "130px",
    height: "6vh",
    "@media(max-width:768px)": {
      width: "87px",
      height: "50px",
    },
  },
  buttonIcon: {
    "@media(max-width:768px)": {
      display: "flex",
    },
  },
});

const EditProduct = (props) => {
  const classes = useStyles();

  const [unit, setUnit] = React.useState("CORPORATE");
  const [isConfirm, setConfirm] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [countryCode, setCountryCode] = useState();
  console.log("countryCode", countryCode);
  const openConfirm = () => {
    setConfirm(true);
  };

  const closeConfirm = () => {
    setConfirm(false);
  };
  const history = useHistory();
  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  const accessToken = window.sessionStorage.getItem("creatturAccessToken");

  return (
    <Page title="Create Plan">
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> Add Validator</strong>
        </Typography>
        <Divider />
      </Box>

      <Box>
        <Formik
          initialValues={{
            firstName: null,
            lastName: null,
            email: null,
            mobileNumber: null,
            password: null,
          }}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={yup.object().shape({
            firstName: yup
              .string("Enter valid name")
              .required("First name is a required  ")
              .nullable()
              .max(30, "Should not exceed 30 digits")
              .matches(
                /^([A-Z][a-z]+)$/,
                "Only alphabets are allowed for this field "
              ),
            lastName: yup
              .string()
              // .trim('The name cannot include leading and trailing spaces')
              // .strict(true)
              .required("Last name is required")
              .nullable()
              .min(2, "Please enter atleast 2 characters")
              .max(35, "You can enter only 35 characters")
              .matches(
                /^([A-Z][a-z]+)$/,
                "Only alphabets are allowed for this field "
              ),
            email: yup
              .string()
              .email("Enter valid email address")
              .required("Email address is a required  ")
              .nullable(),
            mobileNumber: yup
              .string()
              .required("Mobile number is required")
              .matches(
                /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                "Must be a valid mobile number"
              )
              .max(13, "should not exceed 12 digits")
              .min(10, "Must be only 8 digits")
              .nullable(),
            password: yup
              .string()
              .required("Please enter your password")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
              )
              .nullable(),
          })}
          onSubmit={async ({
            firstName,
            lastName,
            email,
            mobileNumber,
            password,
          }) => {
            try {
              setLoader1(true);
              const response = await axios.post(
                ApiConfig.addValidator,
                {
                  firstName,
                  lastName,
                  email,
                  mobileNumber,
                  password,
                  countryCode: `+${countryCode}`,
                },
                {
                  headers: {
                    token: accessToken,
                  },
                }
              );

              if (response.data.response_code === 200) {
                toast.success(response.data.response_message);
                history.push("/validatore-management");
                setLoader1(false);
                openConfirm();
                console.log("response", response);
              }
              if (response.data.response_code === 409) {
                toast.error(response.data.response_message);
                setLoader1(false);
              } else {
                setLoader1(false);
              }
            } catch (err) {
              toast.error(err);
              setLoader1(false);
              console.error(err.response);
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
            <form
              noValidate
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
              className={classes.form}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong> First name :</strong>
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    error={Boolean(touched.firstName && errors.firstName)}
                  />
                  <FormHelperText error>
                    {touched.firstName && errors.firstName}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong> Last name :</strong>
                  </Typography>

                  <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    error={Boolean(touched.lastName && errors.lastName)}
                  />
                  <FormHelperText error>
                    {touched.lastName && errors.lastName}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong> Validator email : </strong>
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    required
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                  />
                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Typography variant="body2">
                      <strong>Mobile number : </strong>
                    </Typography>
                    <PhoneInput
                      country={"us"}
                      name="mobileNumber"
                      // disableAreaCodes
                      // disableCountryCode
                      // disableDropdown
                      type="number"
                      required
                      value={values.mobileNumber}
                      error={Boolean(
                        touched.mobileNumber && errors.mobileNumber
                      )}
                      onBlur={handleBlur}
                      // onChange={(phone) => handlePhoneChange(phone)}
                      onChange={(phone, e) => {
                        setCountryCode(e.dialCode);
                        setFieldValue("mobileNumber", phone);
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "41px",
                      }}
                    // style={{ height: "51px" }}
                    />
                    <FormHelperText error>
                      {touched.mobileNumber && errors.mobileNumber}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    {" "}
                    <strong> Password :</strong>
                  </Typography>
                  <OutlinedInput
                    style={{ background: "#e8f0fe" }}
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    // size="small"
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
                </Grid>
                <Grid item xs={12} className={classes.buttonIcon}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    color="primary"
                    disabled={loader1}
                  >
                    Submit
                    {loader1 && <ButtonCircularProgress />}
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    component={Link}
                    to="/validator-management"
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Page>
  );
};

export default EditProduct;
