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
import moment from "moment";

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
  disputeHandler,
  mileid,
}) {
  const [open, setOpen] = useState(false);
  const [requestedData, setRequestedData] = useState();
  const handleData = (data) => {
    setRequestedData(data);
    setOpen(true);
  };
  const filterData = data?.contractId?.milestones.filter((data, i) => {
    return data?.isDisputeRequest === true;
  });

  console.log("filterData---", filterData);
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{data?.contractId?.contractName}</TableCell>
      <TableCell>
        {filterData.map((data, i) => {
          return <>{data?.taskName}</>;
        })}
      </TableCell>
      <TableCell>
        {filterData.map((data) => {
          return <>${data?.amount}</>;
        })}
      </TableCell>
      <TableCell>{data.disputeStatus}</TableCell>
      <TableCell>
        {data?.freelancerId?.userType === "FREELANCER" ? "CLIENT" : "COMPANY"}
      </TableCell>

      <TableCell style={{ whiteSpace: "pre" }}>
        {moment(data?.updatedAt).format("DD-MM-YYYY, h:mm:ss a")}
      </TableCell>
      <TableCell align="left">
        <Box display="flex">
          <Grid container>
            <Box item display="flex">
              <BootstrapTooltip
                title="View Details"
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
      <DisputeModal
        openDeposite={open}
        setDeposite={(data) => setOpen(data)}
        requestedData={requestedData}
        type="view"
        loading={loading}
        disputeHandler={disputeHandler}
        mileid={mileid}
      />
    </TableRow>
  );
}
