/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Logo from "src/component/Logo";
import { useHistory } from "react-router-dom";
import { PieChart as PieChartIcon } from "react-feather";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TransformIcon from "@material-ui/icons/Transform";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import NavItem from "./NavItem";
import { FaQuestionCircle } from "react-icons/fa";
import PolymerIcon from "@material-ui/icons/Polymer";

import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
// import  from '@material-ui/icons/TransferWithinAStation';
const sections = [
  {
    items: [
      {
        title: "Dashboard",
        icon: DashboardIcon,
        href: "/dashboard",
      },

      {
        title: "Commission",
        icon: PolymerIcon,
        href: "/commission",
      },
      {
        title: "User Management",
        icon: SupervisedUserCircleIcon,
        href: "/user-management",
      },
      {
        title: "Validator Management",
        icon: SupervisedUserCircleIcon,
        href: "/validatore-management",
      },
      {
        title: "Dispute Management",
        icon: SupervisedUserCircleIcon,
        href: "/dispute-management",
      },
      {
        title: "Transaction Management",
        icon: SupervisedUserCircleIcon,
        href: "/transaction-management",
      },

      // {
      //   title: 'Plan management',
      //   icon: PieChartIcon,
      //   href: '/subscription-management',
      // },
      // {
      //   title: "Transaction Management",
      //   icon: TransferWithinAStationIcon,
      //   href: "/transaction-management",
      // },
      // {
      //   title: 'Milestone management',
      //   icon: PieChartIcon,
      //   href: '/milestone-management',
      // },
      // {
      //   title: 'Contract management',
      //   icon: PieChartIcon,
      //   href: '/contract-management',
      // },

      {
        title: "Static Management ",
        icon: PieChartIcon,
        href: "/static-content-management",
      },
      {
        title: "FAQs ",
        icon: FaQuestionCircle,
        href: "/Faq",
      },
      // {
      //   title: 'Validator management',
      //   icon: PieChartIcon,
      //   href: '/validator-management',
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
        style={{ marginLeft: "-20px" }}
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
        style={{ marginLeft: "-20px" }}
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
    background: "#ffffff",
  },
  desktopDrawer: {
    width: 240,
    top: 0,
    paddingTop: "20px",
    height: "calc(100% - 0px)",
    background: "#ffffff",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo
          width="50"
          onClick={() => history.push("/dashboard")}
          style={{ cursor: "pointer" }}
        />
      </Box>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box py={4}>
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
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
