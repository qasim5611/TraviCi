import React, { useState, useEffect } from "react";
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
  const UserId = props?.location.state.id._id;
  const UserAnswer = props?.location.state.id.answer;
  const UserQuestion = props?.location.state.id.question;
  const [isConfirm, setConfirm] = React.useState(false);
  const [isSubmit, setIsSubmit] = useState(false);




  const history = useHistory();

  const accessToken = window.sessionStorage.getItem("creatturAccessToken");


  const [isEdit, setIsEdit] = React.useState(true);

  const [formData, setFormData] = useState({
    question: "",
    answer: ""
    // expiryDate: null,
  });
  console.log("formData", formData);
  useEffect(() => {
    setFormData({
      question: UserQuestion ? UserQuestion : "",
      answer: UserAnswer ? UserAnswer : "",
    });
  }, [UserQuestion, UserAnswer]);
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };

  const submitHandler = async () => {
    setIsSubmit(true)
    if (formData.question !== "" && formData.answer) {
      setConfirm(true);
      const response = await axios({
        method: "PUT",
        url: ApiConfig.editFaq,
        headers: {
          token: accessToken,
        },
        data: {
          faqId: UserId,
          question: formData.question,
          answer: formData.answer,
        },

      })
        .then((response) => {
          if (response.data.response_code !== 200) {
            if (response.data.response_code === 404) {
              setConfirm(false);
              toast.error(response.data.response_message)

            }
          } else {
            toast.success(response.data.response_message)
            setConfirm(false);
            history.push({
              pathname: "/Faq"
            })
          }
        })
        .catch((response) => {
          setConfirm(false);
          toast.error(response)
        });
    }
  };
  return (
    <Page title="Create Plan">
      <Box mb={5}>
        <Typography variant="h3" style={{ marginBottom: "8px" }}>
          <strong> Edit FAQs</strong>
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
                <strong> Enter Question :</strong>
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
                disabled={isEdit}
                // placeholder={statics?.description}
                required
                errorText={"this is required field"}
                name="answer"
                value={formData.answer}
                onChange={_onInputChange}
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
                style={{ marginRight: "10px" }}
                onClick={submitHandler}
              >
                Submit {isConfirm && <ButtonCircularProgress />}
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


    </Page>
  );
};

export default EditPlan;
