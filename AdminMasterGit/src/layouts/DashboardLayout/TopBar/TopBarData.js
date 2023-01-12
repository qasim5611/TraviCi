import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AuthContext } from "src/context/Auth";
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
  IconButton,
  Badge,
  TextField,
  Hidden,
  InputAdornment,
  DialogContent,
  Dialog,
  Button,
  Avatar,
  Tooltip,
  Typography
} from "@material-ui/core";
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { useHistory } from "react-router-dom";
import LogoWithName from "src/component/LogoWithName";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { FaQuestion } from "react-icons/fa";
import NotificationList from "src/views/pages/Notification/index";
import InviteFriend from "src/component/InviteFriend";
import ApiConfig from "src/Config/APIconfig";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const accessToken = window.sessionStorage.getItem("creatturAccessToken");
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
  },
  toolbar: {
    height: 80,
  },
  avatar: {
    cursor: "pointer",
    width: 40,
    height: 40,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  noBorder: {
    border: "none",
  },
  textField: {
    backgroundColor: "#f8f6f7",
    borderRadius: 90,
  },
  desktopDrawer: {
    position: "absolute",
    right: 80,
    top: 30,
    paddingTop: "20px",

    width: 450,
    // background: theme.palette.primary.main,
    height: 450,
    [theme.breakpoints.down("sm")]: {
      width: 300,
      right: 0,
    },
  },
  helpSupport: {
    position: "absolute",
    right: 120,
    top: 30,
    width: 250,
    // background: theme.palette.primary.main,
    height: 100,
    [theme.breakpoints.down("sm")]: {
      width: 250,
      right: 0,
    },
  },
  profileDialog: {
    position: "absolute",
    right: 20,
    top: 30,
    width: 170,
    // background: theme.palette.primary.main,
    // height: 80,
    [theme.breakpoints.down("sm")]: {
      width: 220,
      right: 0,
    },
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <TopBarData />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => { },
};

export default TopBar;

export function TopBarData() {

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
    setIsProfile(false);

  };

  const handleClose1 = () => {
    setOpen1(false);
  };


  const history = useHistory();
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [userData, setUserData] = useState({ profilePic: "" });
  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  const logOut = () => {
    auth.userLogIn(false, null);
    history.push("/");
  };

  // useEffect(() => {
  //   axios
  //     .get(ApiConfig.getProfile, {
  //       headers: {
  //         token: accessToken,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data.response_code === 200) {
  //         // setDisplayname
  //         // console.log(result)
  //         console.log(response);
  //         setUserData({
  //           // firstName: response.data.result.firstName,
  //           // lastName: response.data.result.lastName,
  //           // mobileNumber: response.data.result.mobileNumber,

  //           profilePic: response.data.result.profilePic,
  //           // email: response.data.result.email,
  //         });
  //         // else setHistory(depositFilter);
  //       } else {
  //         if (response.data.response_message === "Invalid JWT token.") {
  //           window.sessionStorage.removeItem("creatturAccessToken");
  //           history.push("/");
  //         }
  //       }
  //       // setIsLoading(false);
  //     })
  //     .catch((response) => {
  //       // setIsUpdating(false);

  //       console.log("response", response);
  //     });
  // }, []);
  // const logOut = () => history.push("/");
  const profilImage = sessionStorage.getItem("Profile")
  return (
    <>
      <LogoWithName />
      <Hidden smDown>
        <Box display="flex" justifyContent="center" mt={1} ml={3}></Box>
      </Hidden>
      <Box flexGrow={1} />
      {/* <Box className="tooltiptext">
                   
                    <Tooltip
                      describeChild
                      title="Help and Support"
                      placement="top"
                    >
                      <IconButton
        style={{ marginRight: 10 }}
        onClick={() => history.push("/help-support")}

      >
        <FaQuestion style={{ color: "#3e3e3e" }} size={18} />
      </IconButton>

                    </Tooltip>
                  </Box> */}


      <Box>
        <Avatar
          src={
            // auth.userData.profilePic &&
            auth?.userData?.profilePic
              ? auth?.userData?.profilePic
              : "/images/user.png"
          }
          className={classes.avatar}
          onClick={() => {
            setIsProfile(true);
          }}
        />
      </Box>
      {/* <SwipeableTemporaryDrawer /> */}

      {isInvite && (
        <InviteFriend open={isInvite} handleClose={() => setIsInvite(false)} />
      )}

      <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
      </Dialog>

      <Dialog
        classes={{ paper: classes.helpSupport }}
        open={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent
          style={{ display: "flex", alignItems: "center", padding: 20, }}
        >
          <Button onClick={() => history.push("/help-support")}>
            Help and Support
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        classes={{ paper: classes.profileDialog }}
        open={isProfile}
        onClose={() => setIsProfile(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent
        // style={{ display: 'flex', alignItems: 'center', padding: 20 ,flexDirection:'column'}}
        >
          <Button
            onClick={() => history.push("/my-profile")}
            style={{ marginLeft: "-10px" }}
          >
            <AccountCircleIcon />
            <span style={{ padding: "0px 0px 0px 10px" }}>
              My Profile
            </span>
          </Button>
          <Button onClick={handleClickOpen1} style={{ marginLeft: "-10px" }}>
            <LockIcon />
            <span style={{ padding: "0px 0px 0px 10px" }}>
              Logout
            </span>
          </Button>
        </DialogContent>
      </Dialog>





      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={handleClose1}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle id="alert-dialog-slide-title" align="center">{"Logout "}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" align="center">
            <Box mt={3}>
              <Typography style={{ color: "#000" }}>  Are you sure you want to <br /> Logout?</Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary" onClick={logOut}>
            Yes
          </Button>
          <Button onClick={handleClose1} color="primary" style={{ color: "#4b4465", }}>
            No
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
