import React, { useState, useContext, useEffect } from "react";

import {
  TableCell,
  TableRow,
  makeStyles,
  Box,
  Grid,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { getContract } from "src/utils";
import { abrarContract } from "src/constants";
import abrarAbi from "src/constants/ABI/abrar.json";

import VisibilityIcon from "@material-ui/icons/Visibility";
import { Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import Axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "src/context/User";

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

export default function ResponseList({
  data,
  index,
  handleData,
  viewData,
  requestedData1,
  filterData,
  disputeHandler,
  mileid,
  loading,
  setDeposite,
}) {
  console.log("data----", viewData);
  const user = useContext(UserContext);

  const { account, chainId, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [MsgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg] = useState({});

  console.log("msg----", msg);

  const disputeresolveFileHandler = async () => {
    const contract = getContract(abrarContract, abrarAbi, library, account);
    const ownerOfAddress = await contract.owner();
    if (ownerOfAddress?.toLowerCase() === account?.toLowerCase()) {
      try {
        setIsLoading(true);
        const raiseDisputeHandler = await contract.disputeResolve(
          parseInt(requestedData1?.contractId?.blockchainContractId),
          viewData?.milestoneIndex,

          parseInt(filterData && filterData[0]?.amount),
          viewData?.walletAddress
        );
        await raiseDisputeHandler.wait();
        resolveDisputeHandler();
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.warn("Invalid Owner Address");
    }
  };
  const resolveDisputeHandler = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "PUT",
        url: ApiConfig.resolveDispute,
        headers: {
          token: sessionStorage.getItem("creatturAccessToken"),
        },
        params: {
          disputeId: requestedData1?._id,
        },
      });
      if (res.data.response_code === 200) {
        toast.success("Dispute resolved successfully");
        setIsLoading(false);
        disputeHandler(mileid);
        setDeposite(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const setOpenTextModal = (data) => {
    setMsg(data);
    setMsgOpen(true);
  };

  return (
    <>
      {" "}
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell
          style={{ whiteSpace: "pre", cursor: "pointer" }}
          onClick={() => setOpenTextModal(data)}
        >
          <Avatar src={data?.documentUrl} />
        </TableCell>

        <TableCell style={{ whiteSpace: "pre" }}>
          {data?.userId?.userType === "FREELANCER" ? "CLIENT" : "COMPANY"}
        </TableCell>
        <TableCell
          style={{ cursor: "pointer" }}
          onClick={() => setOpenTextModal(data)}
        >
          {data?.text}
        </TableCell>
        <TableCell style={{ whiteSpace: "pre" }}>
          {sortAddress(data?.walletAddress)}
          <CopyToClipboard text={data?.walletAddress}>
            <IconButton style={{ fontSize: ".8rem" }}>
              <FaCopy onClick={() => toast.info("Copied")} />
            </IconButton>
          </CopyToClipboard>
        </TableCell>
        <TableCell style={{ whiteSpace: "pre" }}>
          {moment(viewData?.disputeStartDate).format("DD-MM-YYYY , h:mm:ss ")}
        </TableCell>
        <TableCell style={{ whiteSpace: "pre" }}>
          {moment(viewData?.disputeEndDate).format("DD-MM-YYYY , h:mm:ss ")}
        </TableCell>

        <TableCell align="left">
          <Box display="flex">
            <Grid container>
              <Box item display="flex">
                {!account ? (
                  <Button onClick={() => user.connectWallet()}>
                    Connect Wallet
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    disabled={isLoading || loading}
                    onClick={() => {
                      if (viewData?.disputeStatus === "RESOLVE") {
                        toast.warn("Dispute has already resolved");
                      } else {
                        disputeresolveFileHandler();
                      }
                    }}
                  >
                    Resolve {isLoading && <ButtonCircularProgress />}
                  </Button>
                )}
              </Box>
            </Grid>
          </Box>
        </TableCell>
      </TableRow>
      {MsgOpen && (
        <Dialog
          open={MsgOpen}
          onClose={() => setMsgOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            <Box mb={1}>
              <Typography>
                Message : <span> {msg?.text}</span>
              </Typography>
            </Box>
            <Box mb={1}>
              <a
                href={msg?.documentUrl}
                target="_blank"
                download
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined">Click to download file</Button>
              </a>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
