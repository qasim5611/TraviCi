import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React from "react";

export default function ViewListReplyModal({
  openDeposite,
  setDeposite,
  data,
}) {
  console.log("data---", data);
  return (
    <Dialog open={openDeposite} onClose={() => setDeposite(false)}>
      <DialogContent>
        <Typography style={{ paddingBottom: ".6rem" }}>
          Message : <span style={{ fontWeight: 400 }}>{data?.text}</span>
        </Typography>
        <Typography style={{ paddingBottom: ".6rem" }}>
          {" "}
          Wallet Address:{" "}
          <span style={{ fontWeight: 400 }}>{data?.walletAddress}</span>{" "}
        </Typography>

        <a
          href={data?.documentUrl}
          target="_blank"
          download
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined">Click to download file</Button>
        </a>
      </DialogContent>
    </Dialog>
  );
}
