import React, { useState, useContext } from "react";
import {
  TableCell,
  TableRow,
  makeStyles,
  Box,
  Grid,
  Avatar,
  IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Tooltip } from "@material-ui/core";
import DisputeModal from "./DisputeModal";
import { Reply, Send } from "@material-ui/icons";

import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

export default function ReplyData({
  data,
  setIsOpenView,
  index,
  loading,
  idddd,
  tableData,
  viewReplyDistubeHandler,
  handleData,
  handleDataReply,
  replyData,
}) {
  const auth = useContext(AuthContext);
  console.log("data-1111-", replyData);
  const history = useHistory();
  // const [openReply, setOpenReply] = useState(false)
  // const [requestedData, setRequestedData] = useState()

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Avatar src={data?.documentUrl} />
      </TableCell>

      <TableCell>
        {data?.userId?.userType === "FREELANCER" ? "CLIENT" : "COMPANY"}
      </TableCell>
      <TableCell>{data?.text}</TableCell>
      <TableCell>
        {sortAddress(data?.walletAddress)}
        <CopyToClipboard text={data?.walletAddress}>
          <IconButton style={{ fontSize: ".8rem" }}>
            <FaCopy onClick={() => toast.info("Copied")} />
          </IconButton>
        </CopyToClipboard>
      </TableCell>

      <TableCell align="left">
        <Box display="flex">
          <Grid container>
            <Box item display="flex">
              <BootstrapTooltip
                title="Disputed Details"
                onClick={() => handleData(data)}
              >
                <VisibilityIcon
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                />
              </BootstrapTooltip>
            </Box>
          </Grid>
        </Box>
      </TableCell>
    </TableRow>
  );
}
