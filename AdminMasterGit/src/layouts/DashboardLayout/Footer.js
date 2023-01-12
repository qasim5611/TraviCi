import React from "react";
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
const useStyles = makeStyles((theme) => ({
  footerSection: {
    position: "relative",
    borderTop: "1px solid #c4c4c4",
    marginTop: "50px",
    padding: "10px 50px ",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
    "& p": {
      fontSize: "12px",
      "& a": {
        textDecoration: "none",
        color: "#5a5e63",
      },
    },
  },
  textright: {
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.footerSection}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Box className={classes.textleft}>
            <Typography variant="body1">
              2022 ©SOLIDIS All right reserved
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.textright}>
            <Typography variant="body1">
              Powered by{" "}
              <a href="https://www.mobiloitte.com/" target="_blanck">
                Mobiloitte.com
              </a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
