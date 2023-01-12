import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { KeyboardDatePicker } from "@material-ui/pickers";
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
  MenuItem,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Page from "src/component/Page";
import { Editor } from '@tinymce/tinymce-react';
import JoditEditor from "jodit-react";

import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";


const EditPlan = (props) => {
  const location = useLocation();
  console.log("location.state.id", location.state.id);
  const [unit, setUnit] = React.useState("CORPORATE");
  const [isConfirm, setConfirm] = React.useState(false);
  const [bannerDescription, setbannerDescription] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);




  const planId = props?.location?.state?.id || null;
  const openConfirm = () => {
    setConfirm(true);
  };

  const closeConfirm = () => {
    setConfirm(false);
  };
  const history = useHistory();

  const accessToken = window.sessionStorage.getItem("creatturAccessToken");

  const statics = location.state.id;

  const [isEdit, setIsEdit] = React.useState(true);
  const [prodImg, setProductImgBuild] = useState(null);
  const [baseImg, setBaseImage] = useState(null);
  const [description, setDescription] = useState(statics?.description);
  const [isLoading, setIsLoading] = useState(false)

  console.log("description", description);
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };
  const editor = useRef(null);
  const config = {
    readonly: false,
  };

  const _onProfilePicChange = (e) => {
    console.log("eeee", e);
    const name = e.target.name;
    const value = URL.createObjectURL(e.target.files[0]);
    setProductImgBuild(value); //will give displayable image use it for preview also
    getBase64(e.target.files[0], (result) => {
      console.log("result", result);
      setBaseImage(result); //will give base64
      const temp = { ...formData, [name]: result };
      console.log("temp", temp);
      setFormData(temp);
    });
  };
  const [formData, setFormData] = useState({
    amount: statics?.description,
    title: statics?.title,
    // expiryDate: null,
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };

  const submitHandler = async () => {
    try {
      setIsLoading(true)
      const response = await axios.put(ApiConfig.editStaticPage, {
        _id: location.state.id._id,
        // amount: formData.amount,
        // expiryDate: formData.expiryDate,
        title: formData.title,
        description: bannerDescription,
      });

      if (response.data.responseCode !== 200) {
        // alert(response.data.response_message);
        toast.success(response.data.response_message);
        history.push("/static-content-management");
        setIsLoading(false)
      } else {
        openConfirm();
        console.log("response", response);
        toast.error(response.data.response_message);
        setIsLoading(false)

      }
    } catch (err) {
      console.error(err.response);
      toast.error(err);
      setIsLoading(false)

    }
  };
  useEffect(() => {
    if (statics) {
      setbannerDescription(statics?.description ? statics?.description : "")

    }

  }, [statics]);
  return (
    <Page title="Edit Static Cotent">
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> Edit Static</strong>
        </Typography>
        <Divider />
      </Box>

      <Box style={{ textAlign: "end" }}>
        <Button onClick={() => setIsEdit(!isEdit)}>
          <Typography variant="h5">Edit </Typography>
          <EditIcon fontSize="small" style={{ marginLeft: "5px" }} />
        </Button>
      </Box>

      <Box mt={2}>
        <FormControl style={{ width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant="body2">
                <strong> Enter Title :</strong>
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                disabled={isEdit}
                // placeholder={statics?.title}
                // disabled={true}
                required
                errorText={"this is required field"}
                name="title"
                value={formData.title}
                onChange={_onInputChange}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant="body2">
                <strong> Enter Description :</strong>
              </Typography>
              <JoditEditor
                ref={editor}

                // disabled={isEdit}
                value={bannerDescription}
                config={config}
                variant="outlined"
                fullWidth
                size="small"
                tabIndex={1}
                onBlur={(e) => setbannerDescription(e)}
                onChange={(newContent) => { }}
              />

            </Grid>

            <Grid item md={12} xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={{ marginRight: "10px" }}
                onClick={submitHandler}
              >
                Submit {isLoading && <ButtonCircularProgress />}
              </Button>
              <Button
                component={Link}
                to="/static-content-management"
                variant="contained"
                color="secondary"
                size="medium"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </FormControl>
        <ToastContainer />
      </Box>

      <Dialog
        open={isConfirm}
        onClose={closeConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Plan edited successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => history.push("/user")}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

export default EditPlan;
