import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import ConnectWallet from "src/component/ConnectWallet";

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
  Typography,
  Tooltip,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useWeb3React } from "@web3-react/core";

import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { useHistory } from "react-router-dom";
import LogoWithName from "src/component/LogoWithName";
import axios from "axios";
import { sortAddress } from "src/utils";

import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { FaQuestion } from "react-icons/fa";
import NotificationList from "src/views/pages/Notification/index";
import InviteFriend from "src/component/InviteFriend";
import ApiConfig from "src/Config/APIconfig";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const accessToken = window.localStorage.getItem("creatturAccessToken");
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
  menuMobile1: {
    marginLeft: "10px",
    backgroundColor: "#c61175fa",
    borderRadius: "40px",
    padding: "5px",
    "& h4": {
      fontSize: "14px",
      lineHeight: " 17px",
      color: "#fff",
      margin: "0 5px",
    },
    "&:hover": {
      backgroundColor: "#c61175fa",
      borderRadius: "40px",
    },
    "& figure": {
      margin: 0,
      width: 40,
      height: 40,
      borderRadius: "50px",
      overflow: "hidden",
      display: "flex",
      justifyContent: " center",
      alignItems: "center",
      "& img": {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        // maxHeight: "100%",
      },
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
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);
  const { account, activate } = useWeb3React();

  const [open, setOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const accessToken = window.localStorage.getItem("creatturAccessToken");
  const userType = window.localStorage.getItem("userType");
  const logOut = async () => {
    auth.userLogIn(false, null, null, null);
    auth.dicconectWalletFun();
    history.push("/");
    window.localStorage.removeItem("creatturAccessToken");
    window.localStorage.removeItem("planType");
    window.localStorage.removeItem("userType");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userEmail");
    window.localStorage.removeItem("contractIddata");
    window.localStorage.removeItem("walletName");
    window.sessionStorage.removeItem("milestoneDetailsDueDate");
    window.sessionStorage.removeItem("milestoneDetailsDescription");
    window.sessionStorage.removeItem("contractIddata");
    window.sessionStorage.removeItem("userAddress");
    window.localStorage.removeItem("amount12");
    window.localStorage.removeItem("startDate");
    window.localStorage.removeItem("endDate");
  };
  // const logOut = () => history.push("/dashboard");
  const [userData, setUserData] = useState({
    profilePic: "",
  });
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
    setIsProfile(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const profilImage = localStorage.getItem("Profile");
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose4 = () => {
    setAnchorEl1(null);
  };
  return (
    <>
      <LogoWithName />
      <Box>
        <Menu
          id="simple-menu"
          disableScrollLock={true}
          anchorEl={anchorEl1}
          keepMounted
          open={Boolean(anchorEl1)}
          onClose={handleClose4}
        >
          <MenuItem
            onClick={() => {
              auth.logoutHandler();
              setAnchorEl1();
            }}
          >
            Disconnect
          </MenuItem>
        </Menu>
      </Box>

      <Box flexGrow={1} />
      <Box className="tooltiptext">
        {account ? (
          <IconButton
            aria-label="delete"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick1}
            size="small"
            className={classes.menuMobile1}
          >
            <Typography variant="h4">Connected</Typography>
            <BsFillCaretDownFill style={{ color: "#fff", fontSize: "16px" }} />
          </IconButton>
        ) : (
          <IconButton
            aria-label="delete"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={() => setUpdateMinSatkeOpen(true)}
            size="small"
            className={classes.menuMobile1}
          >
            <Typography variant="h4">Connect</Typography>
          </IconButton>
        )}

        {updateMinSatkeOpen && (
          <Dialog
            open={updateMinSatkeOpen}
            onClose={() => {
              setUpdateMinSatkeOpen(false);
            }}
            maxWidth="sm"
          >
            <DialogContent>
              <ConnectWallet
                onClose={() => {
                  setUpdateMinSatkeOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        )}

        <Tooltip describeChild title="FAQs" placement="top">
          <IconButton
            style={{ marginRight: 10 }}
            onClick={() => history.push("/help-support")}
          >
            <FaQuestion style={{ color: "#3e3e3e" }} size={18} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* <IconButton style={{ marginRight: 10 }} onClick={() => setOpen(true)}>
        <Badge badgeContent={auth.NotificationCount} color="secondary">
          <NotificationsNoneIcon style={{ color: "#3e3e3e" }} />
        </Badge>
      </IconButton> */}
      <Box>
        <Avatar
          src={
            // auth.userData.profilePic &&
            auth?.userData1.profilePic
              ? auth?.userData1.profilePic
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
        <DialogContent>
          <NotificationList popUp={open} />
        </DialogContent>
      </Dialog>

      <Dialog
        classes={{ paper: classes.helpSupport }}
        open={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent
          style={{ display: "flex", alignItems: "center", padding: 20 }}
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
        <DialogContent>
          <Button
            onClick={() => history.push("/my-profile")}
            style={{ marginLeft: "-10px" }}
          >
            <AccountCircleIcon />
            <span style={{ padding: "0px 0px 0px 10px" }}>My Profile</span>
          </Button>
          <Button onClick={handleClickOpen1} style={{ marginLeft: "-10px" }}>
            <LockIcon />
            <span style={{ padding: "0px 0px 0px 10px" }}>Logout</span>
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
              <Typography style={{ color: "#000" }}>
                {" "}
                Are you sure you want to <br /> Logout?
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              logOut();
              handleClose1();
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose1}
            color="primary"
            style={{ color: "#4b4465" }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
