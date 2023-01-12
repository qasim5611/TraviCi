import { makeStyles, Box, Typography } from "@material-ui/core";
import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: "#f8f6f7",
    display: "flex",
    padding: "10px 10px",
    borderRadius: 10,
    alignItems: "center",
    "& .box1": {
      width: "5%",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        width: "10%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "15%",
      },
    },
    "& .box2": {
      width: "85%",
      [theme.breakpoints.down("sm")]: {
        width: "70%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "60%",
      },
    },
    "& .box3": {
      width: "10%",
      [theme.breakpoints.down("sm")]: {
        width: "20%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "25%",
      },
    },
  },
}));
const list = [
  {
    id: 1,
    name: "name",
  },
  {
    id: 2,
    name: "name",
  },
];
export default function TaskDue({ contracts }) {
  const classes = useStyles();
  return (
    <>
      {contracts.length === 0 && (
        <div className="nodata">
          <Typography variant="body2">No tasks  </Typography>
          <img src="images/noData.png" alt="No-Data-Found" />
        </div>
      )}
      {contracts.map((data, i) => {
        return (
          <Box className={classes.mainBox} mt={1} key={i}>
            <Box className="box1">
              <CheckCircleOutlineIcon
                style={
                  i % 2 === 0 ? { color: "#39b54a" } : { color: "#fe9b00" }
                }
              />
            </Box>
            <Box className="box2">
              <Typography
                style={{ fontWeight: "bold", wordBreak: "break-all" }}
              >
                {!data?.contractId
                  ? data?.contractName
                  : data?.contractId?.contractName}
              </Typography>
            </Box>
            {/* <Box style={{ width: "46%" }}>
              <Typography>{data.description}</Typography>
            </Box> */}
            <Box className="box3" align="right">
              <Typography variant="body1">{data.status}</Typography>
            </Box>
            {/* <Box style={{ width: "7%" }}>
              <Typography>Today</Typography>
            </Box>
            <Box style={{ width: "10%" }}>
              <Typography>3:30 pm</Typography>
            </Box> */}
          </Box>
        );
      })}
    </>
  );
}
