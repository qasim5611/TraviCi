import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import {
  Typography,
  Box,
  makeStyles,
  IconButton,
  Grid,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function AddMilestone({ open, handleClose }) {
  const classes = useStyles();

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
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
          <Typography style={{ color: "rgb(16 16 16 / 50%)" }} variant="h3">
            Review Contract
          </Typography>
          
        </Box>
        <Box mb={3}>
          <Typography style={{ color: "rgb(16 16 16 / 50%)" }} variant="h3">
            Milestone Amount 2
          </Typography>
          (m2 amount)
        </Box>
        <Box mb={3}>
          <Typography style={{ color: "rgb(16 16 16 / 50%)" }} variant="h3">
            Task Name
          </Typography>
         (task name)
        </Box>
        <Box mb={3}>
          <Typography style={{ color: "rgb(16 16 16 / 50%)" }} variant="h3">
            Priority
          </Typography>
         (priority)
        </Box>

        
      </DialogContent>
      <DialogActions
        style={{ justifyContent: "flex-start", padding: 50, paddingBottom: 20 }}
      >
        <Button variant='contained' color='primary'>Send</Button>
      </DialogActions>
    </Dialog>
  );
}
