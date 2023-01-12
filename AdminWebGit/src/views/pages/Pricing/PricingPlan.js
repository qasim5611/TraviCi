import {
  Typography,
  makeStyles,
  Box,
  Divider,
  Button,
} from "@material-ui/core";
import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) => ({
  customPaper: {
    textAlign: "left",
    padding: 20,
    borderRadius: 20,
    border: "1px solid rgb(233, 231, 231)",
    background: "rgb(243 243 243)",
  },
}));

export default function PricingPlan({
  imgName,
  planName,
  price,
  desc,
  featuresList,
  isDark,
  onClick,
  disableHandler,
  currentPlan,
  currency,
}) {
  const classes = useStyles();



  return (
    <Box
      style={
        currentPlan && currentPlan === planName
          ? { border: "1px solid rgb(118 99 182)", background: "rgb(231 223 255)" }
          : { textDecoration: "none" }
      }
      className={classes.customPaper}
      // style={
      //   isDark ? { backgroundColor: "#1a1c29" } : { backgroundColor: "white" }
      // }
    >
      <Box
        display="flex"
        alignItems="center"
        mb={3}
        style={isDark ? { color: "rgb(205 209 212)" } : { color: "#000000" }}
      >
        <Box>
          <img src={`images/${imgName}`} width={70} alt="" />
        </Box>
        <Box ml={1}>
          <Typography>
            <span
              style={
                isDark
                  ? { color: "white", fontSize: 16, fontWeight: 500 }
                  : { color: "#000000", fontSize: 16, fontWeight: 500 }
              }
            >
              {planName}
            </span>
          </Typography>
          <Typography variant="body2">
            US&nbsp;
            <span
              style={
                isDark
                  ? { color: "white", fontSize: 20, fontWeight: 600 }
                  : { color: "#000000", fontSize: 20, fontWeight: 600 }
              }
            >
              {currency}
              {price}
            </span>
            &nbsp; / year
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        mt={2}
        style={
          isDark
            ? { color: "#ffffff", minHeight: 75 }
            : { color: "#000000", minHeight: 75 }
        }
      >
        <Typography
          variant="body2"
          style={{
            color: "rgb(56 56 56)",
            fontSize: "14px",
            // isDark
            //   ? {
            //       color: "rgb(205, 209, 212)",
            //     }
            //   : {}
          }}
        >
          {desc}
        </Typography>
      </Box>
      <Box
        style={
          isDark ? { color: "rgb(205 209 212)" } : { color: "rgb(121 116 116)" }
        }
      >
        {featuresList &&
          featuresList.map((data, i) => {
            return (
              <Box display="flex" style={{ justifyContent: "space-between" }}>
                <div className="d-flex">
                  <CheckCircleOutlineIcon
                    style={
                      isDark
                        ? {
                            fontSize: "0.90rem",
                            marginTop: 3,
                            marginRight: 10,
                          }
                        : {
                            fontSize: "0.90rem",
                            marginTop: 3,
                            marginRight: 10,
                            color: "#C54C82",
                          }
                    }
                  />
                  <Typography
                    variant="body2"
                    paragraph
                    style={{
                      display: "inline",
                      verticalAlign: "text-top",
                      color: "rgb(56 56 56)",
                    }}
                  >
                    <span
                      style={
                        isDark
                          ? {
                              color: "rgb(205, 209, 212)",
                            }
                          : {}
                      }
                    >
                      {" "}
                      {data.name}
                    </span>
                  </Typography>
                </div>
                <Typography variant="body2" paragraph>
                  <span
                    style={{
                      color: "rgb(56 56 56)",
                      // isDark
                      //   ? {
                      //       color: "rgb(205, 209, 212)",
                      //     }
                      //   : {}
                    }}
                  >
                    {" "}
                    {data.value}
                  </span>
                </Typography>
              </Box>
            );
          })}
      </Box>
      <Box align="center"mt={4}>
          <Button
            fullWidth
            variant="contained"
            disabled={currentPlan && currentPlan === planName}
            style={
              currentPlan && currentPlan === planName
                ? { backgroundColor: "white", color: "black",  }
                : { backgroundColor: "#C54C82", color: "white" }
            }
            size="medium"
            onClick={onClick}
          >
            Choose Plan
          </Button>
      </Box>
    </Box>
  );
}
