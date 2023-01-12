import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  Link,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {} from "react-feather";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";
import InstagramIcon from "@material-ui/icons/Instagram";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footerSection: {
    background: "#fff",
    position: "relative",
    borderTop: "1px solid #e0e0e0",
    padding: "20px 0px 0px",
    // "&"
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
    "& .rightsection": {
      textAlign: "right",
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
      },
    },
    "& h5": {
      fontWeight: "bold",
      fontSize: "16px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#2f086a",
    },
    "& ul": {
      paddingLeft: "0",
    },
    "& p": {
      marginBottom: "0px",
      marginTop: "10px",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
      color: "#000000",
    },
  },
  footerBg: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    left: "0",
  },
  ListItem: {
    paddingLeft: "0px",
  },
  borderBottmo: {
    overflow: "hidden",
    background: "#000",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
  signupBtn: {
    color: "#fff",
    display: "flex",
    fontSize: "16px",
    fontWeight: "bold",
    height: "45px",
    minWidth: "100px",
    borderRadius: "50px",
    position: "absolute",
    top: "5px",
    right: "5px",
    boxShadow:
      "0px 8px 24px rgba(38, 50, 56, 0.1), 0px 16px 32px rgba(38, 50, 56, 0.08)",
    lineHeight: "36px",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: " 1px",
    background: "#040405",
    "&:hover": {
      background: "#040405",
      color: "#fff",
    },
  },
  largeIcon: {
    width: 18,
    height: 18,
    marginRight: "8px",
  },
  icons: {
    justify: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justify: "center",
    },
  },
  inputBox: {
    position: "relative",
  },
  footerBgImg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: "1",
  },
  textFild: {
    position: "relative",

    "& button": {
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      backgroundColor: "#000",
      minWidth: "90px",
      fontSize: "18px",
      fontWeight: "700",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#000",
      },
    },
  },
  circuleBox: {
    width: "35px",
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EB4D00",
    borderRadius: "50px",
    "& img": {
      width: "13px",
    },
  },
  circuleflex: {
    display: "flex",
  },
  textright: {
    "& p": {
      color: "#52565c",
      fontSize: "13px",
      margin: "0",
    },
  },
  gridflex: {
    display: "flex",
    justifyContent: " space-between",
    alignItems: "center",
  },
}));

export default function Liquidity() {
  const classes = useStyles();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  console.log("users", users);
  const [pages, setPages] = useState(1);
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  useEffect(
    (pages) => {
      setIsLoading(true);
      axios
        .get(ApiConfig.staticPageList, {
          headers: {
            token: accessToken,
          },
        })
        .then((response) => {
          if (response.data.response_code !== 200) {
          } else {
            setIsLoading(false);
            // setDisplayname
            // console.log(result)
            setUsers(
              response?.data?.result.filter(
                (data) => data?.type !== "ContactUs"
              )
            );
            // setNumpages(response.data.result.pages);
            console.log(response);
          }
        })
        .catch((response) => {
          console.log("response", response);
        });
    },
    [pages]
  );
  return (
    <>
      <Box className={classes.footerSection}>
        <Grid
          container
          // justify="space-around"
          spacing={1}
          className={classes.gridflex}
        >
          <Grid item xs={12} sm={4} md={3}>
            <img
              alt=""
              src="images/logo.png"
              style={{ width: "45px", marginLeft: "10px" }}
            />
            <Box>
              <Link href="https://www.facebook.com/" target="_blanck">
                <FaFacebookSquare
                  style={{
                    fontSize: "20px",
                    color: "#4267B2",
                    marginLeft: "5px",
                  }}
                />
              </Link>
              <Link href="https://web.telegram.org/z/" target="_blanck">
                <FaTelegram
                  style={{
                    fontSize: "20px",
                    color: "#229ED9",
                    marginLeft: "5px",
                  }}
                />
              </Link>
              <Link href="https://twitter.com/" target="_blanck">
                <FaTwitter
                  style={{
                    fontSize: "20px",
                    color: " #00acee",
                    marginLeft: "5px",
                  }}
                />
              </Link>
              <Link href="https://www.instagram.com/" target="_blanck">
                <FaInstagramSquare
                  style={{
                    fontSize: "20px",
                    color: "#833AB4",
                    marginLeft: "5px",
                  }}
                />
              </Link>
            </Box>
          </Grid>

          {/* <Grid item xs={12} sm={4} md={5} align="center">
                <Box className={classes.textright}>
                  <Typography variant="body1">
                    2022 © All right reserved
                  </Typography>
                </Box>
              </Grid> */}

          <Grid item xs={12} sm={4} md={3} className="rightsection">
            <Box className={classes.textright}>
              {users &&
                users.map((users, i) => {
                  return (
                    <Link
                      onClick={() =>
                        history.push({
                          pathname: "/terms-support",
                          state: {
                            id: users,
                          },
                        })
                      }
                      style={{
                        fontSize: "13px",
                        cursor: "pointer",
                        color: "black",
                        marginLeft: "5px",
                      }}
                      // to={{
                      //   pathname: "/terms-support",
                      //   state: {
                      //     id: users,
                      //   },
                      // }}
                    >
                      {users && users?.title}
                    </Link>
                  );
                })}
              <Typography variant="body1">
                2022 ©SOLIDIS All right reserved
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
