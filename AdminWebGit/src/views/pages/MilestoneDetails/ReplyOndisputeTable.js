import ApiConfig from "src/Config/APIconfig";
import {
  TableCell,
  TableRow,
  makeStyles,
  Box,
  Grid,
  Avatar,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Button,
  Typography,
  Divider,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import ReplyData from "./ReplyData";
import { AuthContext } from "src/context/Auth";
import ViewListReplyModal from "./ViewListReplyModal";
import ReplyModal from "./ReplyModal";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import moment from "moment";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "900px",
  },
}));

export default function ReplyOndisputeTable({ disputedList }) {
  const classes = useStyles();
  const location = useLocation();
  const [idddd, setIdd] = useState();
  const [replyData, setReplyData] = useState([]);
  const [replyButtonCheck, setReplyButtonCheck] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [requestedData, setRequestedData] = useState();
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const viewReplyDistubeHandler = async (id) => {
    try {
      setIsLoading(true);
      const res = await Axios({
        method: "GET",
        url: ApiConfig.viewDisputeList,
        params: {
          _id: id,
        },
      });
      if (res.data.response_code === 200) {
        setReplyData(res.data.result);
        setIsLoading(false);
        const replyButtonFiner =
          res?.data?.result?.disputeReply[
          res?.data?.result?.disputeReply?.length - 1
          ];

        if (replyButtonFiner?.userId?.userType === auth?.userData?.userType) {
          setReplyButtonCheck(true);
        } else {
          setReplyButtonCheck(false);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const iddd = location.search.split("?")[1];
    console.log("iddd--", iddd);
    viewReplyDistubeHandler(iddd);
    setIdd(iddd);
  }, [location.search]);
  const handleDataReply = (data) => {
    setRequestedData(data);
    setOpenReply(true);
  };
  const handleData = (data) => {
    setRequestedData(data);
    setOpen(true);
  };
  const checkToFindDisputeDate = replyData?.disputeEndDate ? moment(replyData?.disputeEndDate).unix() : 0
  console.log('checkToFindDisputeDate----', checkToFindDisputeDate)
  console.log('curentTimeStamp', moment().unix(

  ))
  return (
    <>
      <Box>
        <Typography>Reply Mangement</Typography>
      </Box>
      <Box mt={1} mb={1}>
        <Divider />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "10px 0px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={replyButtonCheck || replyData?.disputeStatus === "RESOLVE"}
          onClick={() => {
            if (checkToFindDisputeDate <= moment().unix()) {
              toast.warn('Dispute end has been reached. You can not reply to this dispute now.')
            } else {
              handleDataReply()

            }


          }}
        >
          Reply
        </Button>

      </Box>
      {isLoading ? (
        <ButtonCircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell" align="left">
                    Sr. No
                  </TableCell>
                  <TableCell className="tableCell" align="left">
                    Document
                  </TableCell>
                  <TableCell className="tableCell" align="left">
                    User Type
                  </TableCell>

                  <TableCell className="tableCell" align="left">
                    Message
                  </TableCell>
                  <TableCell className="tableCell" align="left">
                    Wallet Address
                  </TableCell>
                  <TableCell className="tableCell" align="left">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {replyData.disputeReply &&
                  replyData.disputeReply.map((data, index) => (
                    <ReplyData
                      data={data}
                      classes={classes}
                      index={index}
                      viewReplyDistubeHandler={viewReplyDistubeHandler}
                      idddd={idddd}
                      tableData={replyData.disputeReply}
                      handleDataReply={(item) => handleDataReply(item)}
                      requestedData={requestedData}
                      handleData={(item) => handleData(item)}
                      replyData={replyData}
                    // loading={isLoading}
                    />
                  ))}
              </TableBody>

            </Table>
          </TableContainer>

          {replyData.disputeRepl && replyData.disputeRepl.length === 0 && (
            <div className="nodata">
              <Typography variant="body2">No activity yet</Typography>
              <img src="images/noData.png" alt="No-Data-Found" />
            </div>

          )}





        </>


      )}

      <ViewListReplyModal
        openDeposite={open}
        setDeposite={(data) => setOpen(data)}
        type="replyData"
        data={requestedData}
      />
      <ReplyModal
        openDeposite={openReply}
        setDeposite={(data) => setOpenReply(data)}
        requestedData={idddd}
        type="reply"
        viewReplyDistubeHandler={viewReplyDistubeHandler}
        idddd={idddd}
        replyData={requestedData}
      />
    </>
  );
}
