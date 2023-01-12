/* eslint-disable no-use-before-define */
import React, { useState, useContext } from "react";
import { useLocation, matchPath, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { AuthContext } from "src/context/Auth";
import {
  Box,
  Drawer,
  List,
  ListSubheader,
  makeStyles,
  Avatar,
  Typography,
  ListItem,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import { FaSignOutAlt } from "react-icons/fa";

import NavItem from "src/layouts/DashboardLayout/NavBar/NavItem";
const sections = [
  {
    items: [
      // {
      //   title: 'Dashboard',
      //   icon: FaUserCircle,
      //   href: '/dashboard',
      // },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 240,
    top: 0,
    paddingTop: "20px",

    height: "100%",
    background: "#ffffff",
  },
  avatar: {
    cursor: "pointer",
    width: 50,
    height: 50,
  },
  avatarBig: {
    cursor: "pointer",
    width: 150,
    height: 150,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0,
    "&.MuiListItem-gutters": {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: "#3e3e3e",
    padding: "10px 0",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
  },
  buttonLeaf: {
    color: "#3e3e3e",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    borderLeft: "solid 8px transparent",
    borderRadius: 0,
    "&:hover": {
      background: theme.palette.secondary.main,
      color: "#C54C82",
    },
    "&.depth-0": {
      "& $title": {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: "#C54C82",
    borderColor: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightRegular,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: "#C54C82",
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [rightBar, setRightBar] = useState(false);
  const location = useLocation();
  const logOut = () => {
    console.log("Log out");
    auth.userLogIn(false, null);
    history.push("/");
  };
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box display="flex" justifyContent="center" mt={4}>
          <Avatar
            src={
              auth.userData.userDetail &&
              auth.userData.userDetail.imageUrl !== null
                ? auth.userData.userDetail.imageUrl
                : "/images/user.png"
            }
            className={classes.avatarBig}
          />
        </Box>
        <Box p={2}>
          <Typography variant="h3" align="center" style={{ color: "#ffffff" }}>
            {auth.userData.userDetail && auth.userData.userDetail.firstName}{" "}
            {auth.userData.userDetail && auth.userData.userDetail.lastName}
          </Typography>
        </Box>
        <Box py={2}>
          {sections.map((section, i) => (
            <List
              key={`menu${i}`}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
          <List style={{ padding: 0, marginTop: -10 }}>
            <ListItem className={clsx(classes.item)}>
              <Button
                onClick={logOut}
                activeClassName={classes.active}
                className={clsx(classes.buttonLeaf, `depth-0`)}
              >
                <FaSignOutAlt size="20" className={classes.icon} />
                <span>{"Logout"}</span>
              </Button>
            </ListItem>
          </List>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Avatar
        src={
          auth.userData.userDetail && auth.userData.userDetail.imageUrl !== null
            ? auth.userData.userDetail.imageUrl
            : "/images/user.png"
        }
        className={classes.avatar}
        onClick={() => {
          setRightBar(!rightBar);
        }}
      />
      <Drawer
        anchor="right"
        classes={{ paper: classes.desktopDrawer }}
        open={rightBar}
        onClose={() => {
          setRightBar(false);
        }}
      >
        {content}
      </Drawer>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
