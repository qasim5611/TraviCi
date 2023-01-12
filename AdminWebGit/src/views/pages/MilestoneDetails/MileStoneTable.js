import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import {
  Box,
  Button,
  Grid,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import moment from "moment";
import MilestoneData from "./MilestoneData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DisputeListTable from "./DisputeListTable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getContract, getWeb3Obj } from "src/utils";
import { abrarContract } from "src/constants";
import abrarAbi from "src/constants/ABI/abrar.json";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

const accessToken = window.localStorage.getItem("creatturAccessToken");
const useStyles = makeStyles((theme) => ({
  alignToCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#f8f6f7",
  },
  bgColor: {
    backgroundColor: "#f8f6f7",
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
  },
  hoverData: {
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
    tableData: {
      "&:hover": {
        background: theme.palette.secondary.main,
        color: "#C54C82",
      },
    },
    ".chip": {
      background: "#fec032",
      "&:hover": {
        background: "#fec032",
      },
    },
    "&.MuiAccordionDetails-root": {
      padding: "0px",
    },
  },
  table: {
    minWidth: 650,

    "& .tableBody": {
      cursor: "pointer",
      "&:hover": {
        background: "#e5e3ed",
      },
      "& td": {
        // minWidth:"16.66%",
        fontSize: "13px",
      },
    },
  },
  // tablescroll: {
  //   width: "100%",
  //   overflow: "auto",
  //   maxWidth:"100%",
  // },
}));

export default function MileStoneTable({
  milestoneName,
  contractName,
  milestoneData,
  obj,
  HandleMileStoneDetail,
  contractDetails,
  viewMilestone,
  contractData,
  milestoneDetailsDescription,
}) {
  const { account, chainId, library } = useWeb3React();
  const [open, setOpen] = React.useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [dataParticular, setDataParticular] = useState();
  const [amountVAlue, setAmountValue] = useState();

  const handleClick = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const userType = window.localStorage.getItem("userType");
  const dataObj = obj;

  console.log("dataObj----", dataObj);

  const particularDispute = (data) => {
    setWorkOpen(true);
    setDataParticular(data);
  };
  const getBalance = async (_id) => {
    try {
      const web3 = await getWeb3Obj();
      const contract = getContract(abrarContract, abrarAbi, library, account);
      const getAmount = await contract.scrowAmountDeposited(
        parseInt(
          dataObj?.blockchainContractId
            ? dataObj?.blockchainContractId
            : contractData?.contractId?.contractId?.blockchainContractId
        ),
        _id
      );
      setAmountValue(getAmount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const indexId = milestoneDetailsDescription?.milestoneIndex;
    if (indexId !== undefined || indexId !== null) {
      getBalance(indexId);
    }
  }, [milestoneDetailsDescription]);
  return (
    <Box mt={4} className={classes.scrolltable}>
      <MilestoneData />
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        // className={classes.accordionSummary}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography style={{ fontWeight: "700", color: "#312e2e" }}>
              {dataObj?.contractName
                ? dataObj?.contractName
                : contractData?.contractName}
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails className={classes.hoverData}>
          <Box className="tablescroll1">
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow className="tablehead">
                    <TableCell>Milestone</TableCell>
                    <TableCell>Task name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell style={{ minWidth: "78px" }}>Due Date</TableCell>
                    <TableCell>Priority</TableCell>
                  </TableRow>
                </TableHead>
                {dataObj &&
                  dataObj.milestones?.map((obj, i) => {
                    return (
                      <TableBody>
                        <TableRow
                          className="tableBody"
                          onClick={() => {
                            if (dataObj && dataObj?.status === "COMPLETED") {
                              toast.warn("Your contract is completed successfly.")
                            } else {
                              HandleMileStoneDetail(obj?._id, i);
                              particularDispute(obj?._id, i);
                            }

                          }}
                        >
                          <TableCell>{obj?.milestone}</TableCell>
                          <TableCell>{obj?.taskName}</TableCell>
                          <TableCell>${obj?.amount}</TableCell>
                          <TableCell>
                            {amountVAlue === false ||
                              amountVAlue === undefined ? (
                              "INACTIVE"
                            ) : (
                              <>
                                {obj?.mileStoneStatus === "COMPLETE"
                                  ? "COMPLETED"
                                  : "INPROGRESS"}
                              </>
                            )}
                          </TableCell>

                          <TableCell>
                            {moment(obj?.dueDate).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Chip
                              className="chip"
                              label={obj?.priority}
                              style={
                                obj.priority === "HIGH"
                                  ? {
                                    backgroundColor: "#fd612c",
                                    color: "white",
                                  }
                                  : {
                                    backgroundColor: "#fec032",
                                    color: "white",
                                  }
                              }
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    );
                  })}
              </Table>
            </TableContainer>
          </Box>
        </AccordionDetails>
      </Accordion>
      {viewMilestone &&
        viewMilestone?.milestones[0]?.isDisputeRequest === true && (
          <>
            <Box mb={2}>
              <Typography style={{ marginBottom: "1.5rem" }} variant="h5">
                Disputed List
              </Typography>
              <Box pb={2}>
                {workOpen && (
                  <DisputeListTable
                    dataParticular={contractDetails}
                    obj={obj}
                  />
                )}
              </Box>
            </Box>
          </>
        )}
    </Box>
  );
}
