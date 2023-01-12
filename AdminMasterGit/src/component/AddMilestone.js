import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { Formik } from "formik";
import * as yep from "yup";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Typography,
  Box,
  makeStyles,
  IconButton,
  Grid,
  TextField,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  // MuiFormControl: {
  //   '.root': {
  //     marginTop: "10px",
  //   },
  // },
}));

export default function AddMilestone({ open, handleClose, handleMilestone2 }) {
  const classes = useStyles();
  const openMilestone2 = () => {
    handleClose();
    handleMilestone2(true);
  };
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const [priority, setPriority] = React.useState("low");

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent style={{ minHeight: 400, padding: 50, paddingBottom: 0 }}>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Box mb={3}>
          <Formik
            initialValues={{
              milestoneName: "",
              milestoneAmount: "",
              taskName: "",
              priority: "",
            }}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={yep.object().shape({
              milestoneName: yep
                .string()
                .required("Please Enter Milestone Name"),
              milestoneAmount: yep
                .string()
                .required("Please Enter Milestone Amount"),
              taskName: yep.string().required("Please Enter Task Name"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              console.log("Done");
              openMilestone2();
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
              <>
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item md={6}>
                      <Typography
                        style={{ color: "rgb(16 16 16 / 50%)" }}
                        variant="h3"
                      >
                        Milestone Name
                      </Typography>
                      <TextField
                        name="milestoneName"
                        type="text"
                        size="small"
                        variant="outlined"
                        // value={values.team}
                        error={Boolean(
                          touched.milestoneName && errors.milestoneName
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <Typography
                        style={{ color: "rgb(16 16 16 / 50%)" }}
                        variant="h3"
                      >
                        Milestone Amount
                      </Typography>
                      <TextField
                        name="milestoneAmount"
                        size="small"
                        variant="outlined"
                        error={Boolean(
                          touched.milestoneAmount && errors.milestoneAmount
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <Typography
                        style={{ color: "rgb(16 16 16 / 50%)" }}
                        variant="h3"
                      >
                        Task Name
                      </Typography>
                      <TextField
                        name="taskName"
                        size="small"
                        variant="outlined"
                        error={Boolean(touched.taskName && errors.taskName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item>
                      {" "}
                      <Typography
                        style={{ color: "rgb(16 16 16 / 50%)" }}
                        variant="h3"
                      >
                        Priority
                      </Typography>
                      <FormControl className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={priority}
                          name="priority"
                          onChange={handlePriority}
                          // className={classes.MuiFormControl}

                          onBlur={handleBlur}
                        >
                          <MenuItem value={"low"}>Low</MenuItem>
                          <MenuItem value={"med"}>Medium</MenuItem>
                          <MenuItem value={"high"}>High</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  {/* <Typography
                    style={{ color: "rgb(16 16 16 / 50%)" }}
                    variant="h3"
                  >
                    Milestone Name
                  </Typography>
                  <TextField
                    name="milestoneName"
                    type="text"
                    size="small"
                    variant="outlined"
                    // value={values.team}
                    error={Boolean(
                      touched.milestoneName && errors.milestoneName
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  <Box mb={3}>
                    <Typography
                      style={{ color: "rgb(16 16 16 / 50%)" }}
                      variant="h3"
                    >
                      Milestone Amount
                    </Typography>
                    <TextField
                      name="milestoneAmount"
                      size="small"
                      variant="outlined"
                      error={Boolean(
                        touched.milestoneAmount && errors.milestoneAmount
                      )}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb={3}>
                    <Typography
                      style={{ color: "rgb(16 16 16 / 50%)" }}
                      variant="h3"
                    >
                      Task Name
                    </Typography>
                    <TextField
                      name="taskName"
                      size="small"
                      variant="outlined"
                      error={Boolean(touched.taskName && errors.taskName)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box mb={3}>
                    <Typography
                      style={{ color: "rgb(16 16 16 / 50%)" }}
                      variant="h3"
                    >
                      Priority
                    </Typography>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={priority}
                        name="priority"
                        onChange={handlePriority}
                        // className={classes.MuiFormControl}
                      
                        onBlur={handleBlur}
                      >
                        <MenuItem value={"low"}>Low</MenuItem>
                        <MenuItem value={"med"}>Medium</MenuItem>
                        <MenuItem value={"high"}>High</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}

                  <DialogActions
                    style={{
                      justifyContent: "flex-start",
                      padding: 50,
                      paddingBottom: 20,
                    }}
                  >
                    <Button
                      // onClick={openMilestone2}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Next
                    </Button>
                  </DialogActions>
                </form>
              </>
            )}
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
