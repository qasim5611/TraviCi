import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
} from "@material-ui/core";
import React from "react";

export default function RejectModal({
  rejectOpen,
  setRejectOpen,
  approve,
  loader1,
  setReasonData,
}) {
  return (
    <Dialog
      open={rejectOpen}
      onClose={() => {
        if (!loader1) {
          setRejectOpen();
        }
      }}
    >
      <DialogContent>
        <Box>
          <Box mb={1}>
            <label>Reason</label>
          </Box>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter your reason"
            onChange={(e) => setReasonData(e.target.value)}
          />
          <Box mt={2} mb={1}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#f69371",
                color: "white",
                borderRadius: "20px",
              }}
              fullWidth
              onClick={() => approve(false)}
            >
              Submit {loader1 && <ButtonCircularProgress />}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
