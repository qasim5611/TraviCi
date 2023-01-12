import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  makeStyles,
  Box,
  Grid,
  Avatar,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Tooltip } from "@material-ui/core";
import DisputeModal from "./DisputeModal";
import { Message, Reply, Send } from "@material-ui/icons";
import ReplyModal from "./ReplyModal";
import { useHistory } from "react-router-dom";

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

export default function DisputeListData({
  data,
  setIsOpenView,
  index,
  loading,
}) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [openReply, setOpenReply] = useState(false);
  const [requestedData, setRequestedData] = useState();
  const handleData = (data) => {
    setRequestedData(data);
    setOpen(true);
  };

  console.log("reponseData----data", data);
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <a href={data?.documentUrl} target="_blank">
          Download
        </a>
        {/* <Avatar src={data?.documentUrl} /> */}
      </TableCell>
      <TableCell>{data?.disputeStatus}</TableCell>
      <TableCell>
        {data?.freelancerId?.userType === "FREELANCER" ? "CLIENT" : "COMPANY"}
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
              <BootstrapTooltip
                title="View Reply"
                onClick={() => {
                  history.push({
                    pathname: "/reply-data",
                    // state: { requestedData: requestedData },
                    search: data?._id,
                  });
                }}
              >
                <Message
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
      <DisputeModal
        openDeposite={open}
        setDeposite={(data) => setOpen(data)}
        requestedData={requestedData}
        type="view"
        loading={loading}
      />
      <ReplyModal
        openDeposite={openReply}
        setDeposite={(data) => setOpenReply(data)}
        requestedData={requestedData}
        type="reply"
        loading={loading}
      />
    </TableRow>
  );
}
