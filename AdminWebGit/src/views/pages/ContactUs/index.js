import {
  Typography,
  Box,
  Grid,
  makeStyles,
  FormControl,
  FormHelperText,
  TextField,
  Dialog,
  OutlinedInput,
  Button,
  Divider,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import React, { useState, useEffect } from "react";
import Page from "src/component/Page";
import { Formik } from "formik";
import * as yep from "yup";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Footer from "../../../layouts/DashboardLayout/TopBar/Footer";
import { values } from "lodash";

const useStyles = makeStyles((theme) => ({
  left: {
    borderRadius: 45,
    background: "url(/images/BlueBG.png) no-repeat",
    backgroundPosition: "center right",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  contactusBox: {
    marginRight: 100,
    marginTop: 25,
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      paddingbottom: "30px",
    },
  },
}));

export default function (props) {
  const classes = useStyles();
  const location = useLocation();
  const [isConfirm, setConfirm] = React.useState(false);
  const [isLoader, setisLoader] = React.useState(false);
  const openConfirm = () => setConfirm(true);
  const history = useHistory();
  const closeConfirm = () => {
    // location.reload();
    setConfirm(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  useEffect(
    (pages) => {
      setIsLoading(true);
      axios
        .get(
          ApiConfig.staticPageList,
          {
            headers: {
              token: accessToken,
            },
          }
        )
        .then((response) => {
          if (response.data.response_code !== 200) {
          } else {
            setIsLoading(false);
            // setDisplayname
            // console.log(result)
            setUsers(response?.data?.result.filter((data) =>
              data?.type === "ContactUs"
            ));
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
    <Page title="Contact Us">
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> {users && users[0]?.title}</strong>
        </Typography>
        <Typography style={{ marginBottom: "10px" }}>
          {users && users[0]?.description}
        </Typography>
        <Divider />
      </Box>

      <Grid
        container
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={7}>
          <Box >
            <Box className={classes.contactusBox}>
              <Formik
                initialValues={{
                  email: "",
                  username: "",
                  message: "",
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yep.object().shape({
                  email: yep
                    .string()
                    .email("Please enter a valid email address")
                    .matches(
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      "Please enter a valid email address"
                    )
                    .required("Email address is required"),
                  username: yep
                    .string()
                    .max(30, "Should not exceed 30 characters")
                    .required("Please enter your name"),

                  message: yep
                    .string()

                    
                    .min(15, "Should be 15 character long")
                    .max(500, "Should not exceed 500 characters")
                    .required("Message is required"),
                })}
                onSubmit={async ({ username, message, email }) => {
                  try {
                    setisLoader(true);
                    const response = await axios.post(ApiConfig.contactUs, {
                      name: username,
                      message,
                      email
                    });
                    console.log("response", response.data.response_code);

                    if (response.data.response_code === 200) {
                      setisLoader(false);
                      // openConfirm();
                      // history.push("/dashboard");
                      toast.success(response.data.response_message);
                    } else {
                      toast.warn(response.data.response_message);
                      setisLoader(false);

                    }
                  } catch (err) {
                    toast.error(err);
                    console.error(err.response);
                    setisLoader(false);
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
                        <Typography  >
                          <strong> Name :</strong>
                        </Typography>
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
                        <Typography

                        >
                          <strong> Email address :</strong>
                        </Typography>
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
                        <Typography

                        >
                          <strong>Message :</strong>
                        </Typography>
                        <OutlinedInput
                          type={"text"}
                          multiline
                          rows={5}
                          variant="outlined"
                          size="small"
                          name="message"
                          value={values.message}
                          error={Boolean(touched.message && errors.message)}
                          onBlur={handleBlur}
                          onChange={handleChange}

                        />
                        <FormHelperText error>
                          {touched.message && errors.message}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                    <Box mt={3} >
                      <Button
                        type="submit"
                        fullWidth
                        size="large"
                        disabled={isLoader}
                        variant="contained"
                        color="primary"
                      >
                        Send {isLoader && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        </Grid>



        <Dialog
          open={isConfirm}
          onClose={closeConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Message sent successfully
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={closeConfirm}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>




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
    </Page>
  );
}
