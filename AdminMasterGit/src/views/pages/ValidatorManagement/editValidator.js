import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
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
  Link,
  Dialog,
  TextField,
  FormHelperText,
  MenuItem,
  FormControl,
  Paper,
  OutlinedInput,
  makeStyles,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Page from "src/component/Page";
import * as yup from "yup";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import PageLoading from "src/component/PageLoading";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  btn: {
    backgroundColor: "#1273eb",
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
  const location = useLocation();

  const classes = useStyles();
  const [unit, setUnit] = React.useState("CORPORATE");
  const [isConfirm, setConfirm] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [firstName, setfirstName] = useState("");
  console.log("mobileNumber", firstName);

  const [mobileNumber, setmobileNumber] = useState("");
  const [idds, setIdd] = useState("");
  const [showdata, setshowdata] = React.useState([]);
  const [validShowData, setValidshowdata] = React.useState([]);
  const [amo, setamo] = useState("");
  const [Type, setType] = useState("");

  console.log("validShowData", validShowData);

  const validatorId = props?.location?.state?.id || null;
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

  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: null,
    countryCode: null,
    name: "",
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };

  function handleOnChange(value, countryObj) {
    console.log(countryObj);
    const phoneNum = value
      .replace(/[^0-9]/g, "")
      .substring(countryObj.dialCode.length);
    setFormData({
      ...formData,
      mobileNumber: phoneNum,
      countryCode: countryObj.dialCode,
    });
  }
  const addEditStaticContent = async (idd) => {
    // formData.append("staticId", idd);
    try {
      if (idd !== "") {
        await axios
          .put(
            ApiConfig.editValidator,
            {
              firstName: firstName,
              mobileNumber: mobileNumber,
              email: Type,
              _id: idds,
            },
            {
              headers: {
                token: `${accessToken}`,
              },
            }
          )
          .then(async (res) => {
            if (res.data.response_code == 200) {
              setamo(res.data.result);
              toast.success("added successfully");
              history.push("/validator-management");
              // setNumpages(res.data.result.pages);
              // setTotal(res.data.result);
              console.log("listnhjghj))))ft", res.data.result.docs);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const viewValidator = async (id) => {
    console.log("mydataid", id);
    await axios
      .get(ApiConfig.viewValidator, {
        params: {
          _id: id,
        },
        headers: {
          token: `${accessToken}`,
        },
      })
      .then(async (res) => {
        if (res.data.response_code === 200) {
          setValidshowdata(res.data.result);
          console.log("%%%44554%%%", res.data.result);
        }
      });
  };
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
      viewValidator(id);
    }
    if (validShowData) {
      setfirstName(validShowData?.firstName ? validShowData?.firstName : "");
      setmobileNumber(
        validShowData?.mobileNumber ? validShowData?.mobileNumber : ""
      );
      setType(validShowData?.email ? validShowData?.email : "");
    }
  }, [location, validShowData?.firstName]);
  return (
    <>
      <Container maxWidth="md">
        <Box>
          <Paper
            elevation={2}
            style={{
              padding: "30px 10px",
              paddingBottom: "50px",
            }}
          >
            <Box pl={5} mt={4} px={2}>
              {" "}
              <Typography variant="h3" style={{ fontWeight: "1000" }}>
                {" "}
                Edit External Validator
              </Typography>{" "}
            </Box>
            <Box mt={4} px={2}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item md={2} xs={12}>
                      {" "}
                      <Typography style={{ fontWeight: "500" }}>
                        {" "}
                        First Name
                      </Typography>{" "}
                    </Grid>
                    <Grid item md={10} xs={12}>
                      {" "}
                      <TextField
                        variant="outlined"
                        fullWidth
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                      // error={Boolean(
                      // 	touched.firstName && errors.firstName
                      // )}
                      />
                      {/* <FormHelperText error>
														{touched.firstName && errors.firstName}
													</FormHelperText> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item md={2} xs={12}>
                      {" "}
                      <Typography style={{ fontWeight: "500" }}>
                        {" "}
                        Validator Email
                      </Typography>{" "}
                    </Grid>

                    <Grid item md={10} xs={12}>
                      {" "}
                      <TextField
                        disabled
                        value={Type}
                        variant="outlined"
                        fullWidth
                        type="text"
                        placeholder="Validator Email"
                        onChange={(e) => setType(e.target.value)}
                        required
                        name="email"
                      // value={email}
                      // error={Boolean(
                      // 	touched.email && errors.email
                      // )}
                      />
                      {/* <FormHelperText error>
														{touched.email && errors.email}
													</FormHelperText> */}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item md={2} xs={12}>
                      {" "}
                      <Typography style={{ fontWeight: "500" }}>
                        {" "}
                        Mobile Number
                      </Typography>{" "}
                    </Grid>

                    <Grid item md={10} xs={12}>
                      {" "}
                      <TextField
                        variant="outlined"
                        fullWidth
                        onKeyDown={(event) => {
                          if (event.keyCode === 69 || event.keyCode === 189) {
                            event.preventDefault();
                          }
                        }}
                        type="number"
                        placeholder="Validator Mobile Number"
                        required
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setmobileNumber(e.target.value)}

                      // error={Boolean(
                      // 	touched.mobileNumber && errors.mobileNumber
                      // )}
                      />
                      <FormHelperText error>
                        {(mobileNumber === "" && "Please edit mobile number") ||
                          (mobileNumber.length > 10 &&
                            "mobileNumber digit should be Maximum 10")}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} className={classes.buttonIcon}>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item>
                      {" "}
                      <Button
                        type="submit"
                        className={classes.btn}
                        variant="contained"
                        onClick={addEditStaticContent}
                      >
                        {" "}
                        Submit
                        {loader1 && <PageLoading />}
                      </Button>{" "}
                    </Grid>
                    <Grid item>
                      {" "}
                      <Link
                        to="/validator-management"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          onClick={() => history.push("/validator-management")}
                          type="submit"
                          className={classes.btn2}
                          variant="contained"
                        >
                          {" "}
                          Cancel
                        </Button>
                      </Link>{" "}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default EditProduct;
