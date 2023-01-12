import React, { useState } from "react";
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
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import { isValidAlphabet, isValidationEmail, isValidContact } from '../../../Validation/Validation';

const EditPlan = (props) => {
  const location = useLocation();
  const [unit, setUnit] = React.useState("CORPORATE");
  const [isConfirm, setConfirm] = React.useState(false);

  const closeConfirm = () => {
    setConfirm(false);
  };
  const history = useHistory();

  const accessToken = window.sessionStorage.getItem("creatturAccessToken");

  //   const statics = location.state.id;



  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);


  const [formData, setFormData] = useState({
    question: "",
    answer: ""
    // expiryDate: null,
  });
  console.log("formData", formData);
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };


  const submitHandler = async () => {
    setIsSubmit(true)
    if (formData.question !== "" && formData.answer) {
      setIsLoading(true);

      const response = await axios({
        method: "POST",
        url: ApiConfig.addFaq,
        headers: {
          token: accessToken,
        },
        data: {
          question: formData.question,
          answer: formData.answer,
        },

      })
        .then((response) => {
          if (response.data.response_code !== 200) {
            if (response.data.response_code === 404) {
              setIsLoading(false);

              toast.error(response.data.response_message)

            }
          } else {
            toast.success(response.data.response_message)
            setIsLoading(false);

            history.push({
              pathname: "/Faq"
            })
          }
        })
        .catch((response) => {
          toast.error(response)
          setIsLoading(false);

        });
    }
  };
  return (
    <Page title="Create Plan">
      <Box mb={5}>
        <Typography variant="h3" style={{
          marginBottom: "8px",
        }}>
          <strong> Add FAQs</strong>
        </Typography>
        <Divider />
      </Box>



      <Box mt={2}>
        <FormControl style={{ width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant="body2">
                <strong> Enter Question :</strong>
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                // disabled={isEdit}
                // placeholder={statics?.title}
                // disabled={true}
                required
                errorText={"this is required field"}
                name="question"
                value={formData.question}
                onChange={_onInputChange}
              />
              <FormHelperText error>
                {isSubmit && formData.question === "" && <Box>Please fill the details</Box>}
              </FormHelperText>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant="body2">
                <strong> Enter Answer :</strong>
              </Typography>
              <TextField
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                type="text"
                // disabled={isEdit}
                // placeholder={statics?.description}
                required
                errorText={"this is required field"}
                name="answer"
                value={formData.answer}
                onChange={_onInputChange}
              // error={Boolean(
              //   touched.username1 && errors.username1
              // )}
              />
              <FormHelperText error>
                {isSubmit && formData.answer === "" && <Box>Please fill the details</Box>}
              </FormHelperText>
            </Grid>

            <Grid item md={12} xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                disabled={isLoading}
                style={{ marginRight: "10px" }}
                onClick={submitHandler}
              >
                Submit {isLoading && <ButtonCircularProgress />}
              </Button>
              <Button
                component={Link}
                to="/Faq"
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
