import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  makeStyles,
  formatMs,
} from "@material-ui/core";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import LineChart from "./LineChart";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import CheckIcon from "@material-ui/icons/Check";
import axios from "axios";
import ApiConfig from "../../../Config/APIconfig";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 16,
  },
  pinkColor: {
    backgroundColor: "#fabda8",
  },
  skyColor: {
    backgroundColor: "#8ce8e3",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
  },
}));
// const format = ()=>{

// }
export default function MileStoneDataForRightTab({
  contractId,
  createdAt,
  description,
  endDate,
  data,
  milestoneDetailsDescription,
}) {
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const userType = window.localStorage.getItem("userType");
  const [buttonName, setButtonName] = React.useState("Approve");
  const classes = useStyles();
  const [dataFalse, setdataFalse] = React.useState(true);
  // React.useEffect(() => {
  //   if(userType==="COMPANY"){
  //     setdataFalse(false);
  //   }else{
  //     setdataFalse(true);
  //   }

  // }, [])
  console.log("milestoneDetailsDescription", data?.contractId?.description);
  console.log("milestoneDetailsDescription123", data?.contractId?._id);
  const dateObject = new Date(data?.endDate * 1000);
  console.log(
    "dateObject",
    dateObject.toGMTString()
    // dateObject.toLocaleString()
  );
  async function approve(event) {
    console.log("endDate", new Date(endDate).toISOString());
    try {
      const formData = new FormData();
      formData.append("_id", contractId?._id);
      const res = await axios({
        method: "POST",
        url: ApiConfig.approveContract,
        data: formData,
        // data: {
        //   // _id: {(data?.contractId?._id)?(data?.contractId?._id):(data?._id)},
        //   _id: data?.contractId?._id,
        // },
        // data: formData,
        headers: {
          token: accessToken,
        },
      });
      setButtonName(buttonName === "Approve" ? "Reject" : "Approve");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  async function reject(event) {
    console.log("endDate", new Date(endDate).toISOString());
    try {
      const formData = new FormData();
      formData.append("_id", contractId);
      const res = await axios({
        method: "POST",
        url: ApiConfig.rejectContract,

        data: {
          _id: data?.contractId?._id,
        },
        headers: {
          token: accessToken,
        },
      });
      setButtonName(buttonName === "Approve" ? "Reject" : "Approve");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  // const milestoneDetailsDueDate = window.sessionStorage.getItem(
  //   "milestoneDetailsDueDate"
  // );
  // const milestoneDetailsDescription = window.sessionStorage.getItem(
  //   "milestoneDetailsDescription"
  // );
  //   function GetFormattedDate(endDate) {
  //     var todayTime = new Date(endDate);
  //     var month = format(todayTime .getMonth() + 1);
  //     var day = format(todayTime .getDate());
  //     var year = format(todayTime .getFullYear());
  //     return month + "/" + day + "/" + year;

  // console.log("GetFormattedDate",month + "/" + day + "/" + year)
  // }
  // console.log("GetFormattedDate",month + "/" + day + "/" + year)
  useEffect(() => {}, [milestoneDetailsDescription]);
  return (
    <>
      <Typography variant="h4" paragraph>
        {/* Milestone 1 */}
      </Typography>
      <Typography variant="body2">Description</Typography>
      <Typography variant="subtitle2" paragraph>
        {milestoneDetailsDescription?.description
          ? milestoneDetailsDescription?.description
          : data?.description}
      </Typography>
      <Typography variant="body2">Due Date:</Typography>
      <Box className={classes.alignCenter} mb={2}>
        <Box>
          <Typography variant="subtitle2">
            {/* {new Date(endDate).toISOString()} */}
            {moment(milestoneDetailsDescription.dueDate).format("YYYY-MM-DD")}
            {/* {new Date(milestoneDetailsDueDate).toUTCString("mm:dd:yyyy")} */}
            {/* {endDate} */}
            {/* <GetFormattedDate /> */}
            <CalendarTodayOutlinedIcon
              style={{ fontSize: "14", color: "#C54C82" }}
            />
          </Typography>
        </Box>
        <Box flexGrow={1}></Box>
        <Box id="userCompany">
          {/* 
     { if(userType === "COMPANY"){
          return("");
    }else{
      return(
      <Button
      variant="outlined"
      style={{ borderRadius: 90, fontSize: 14 }}
      disabled={dataFalse}
      onClick={approve}
    >
      Approve
    </Button>
    <Button
      variant="outlined"
      style={{ borderRadius: 90, fontSize: 14 }}
      onClick={reject}
    >
      Reject
    </Button>   
      );   
    }
    }  */}

          {/* {userType !== "COMPANY" ? (
            <>
              {" "}
              <Button
                variant="outlined"
                style={{ borderRadius: 90, fontSize: 14 }}
                onClick={approve}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                style={{ borderRadius: 90, fontSize: 14 }}
                onClick={reject}
              >
                Reject
              </Button>
            </>
          ) : (
            ""
          )} */}

          {/* <Button
            variant="outlined"
            style={{ borderRadius: 90, fontSize: 14 }}
            disabled={dataFalse}
            onClick={approve}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            style={{ borderRadius: 90, fontSize: 14 }}
            onClick={reject}
          >
            Reject
          </Button> */}
        </Box>
      </Box>

      {/* <Grid container>
        <Grid item md={6}>
          <Typography variant="body2">Scope:</Typography>
        </Grid>
        <Grid item md={3} className={classes.alignCenter}>
          <Typography variant="body2">Reviewed By:</Typography>
        </Grid>
        <Grid item md={3} className={classes.alignCenter}></Grid>
      </Grid> */}

      {/* <Grid container>
        <Grid item md={6}>
          <Box className={classes.alignCenter}>
            <Box>
              <LineChart />
            </Box>
            <Box>
              <Typography variant="subtitle2">+5%</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={3} className={classes.alignCenter}>
          <Box>
            <AvatarGroup>
              <Avatar className={`${classes.small} ${classes.skyColor}`}>
                N
              </Avatar>
              <Avatar className={`${classes.small} ${classes.pinkColor}`}>
                OP
              </Avatar>
            </AvatarGroup>
          </Box>
        </Grid>
        <Grid item md={3} className={classes.alignCenter}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#fd612c",
              color: "white",
              borderRadius: 90,
              fontSize: 14,
            }}
          >
            <CheckIcon style={{ fontSize: 18 }} /> Reviewed
          </Button>
        </Grid>
      </Grid> */}
    </>
  );
}
