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
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import Footer from "../../../layouts/DashboardLayout/TopBar/Footer";
export default function (props) {
  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [token, setToken] = useState(false);
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

  const accessToken = window.localStorage.getItem("creatturAccessToken");
  if (accessToken) {
    history.push("/dashboard");
    return <div></div>;
  }

  return (
    <Page title="Sign In" >
      <Box textAlign="center" >
        <Typography variant="h2" >
          Sign In
        </Typography>
        <Typography variant="body2"></Typography>
        <Box display="flex" justifyContent="center" mt={2}></Box>

        {value === 0 ? <UserLogin /> : null}
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
