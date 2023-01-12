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
import ContactMailIcon from "@material-ui/icons/ContactMail";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { GiNotebook } from "react-icons/gi";
import TransformIcon from "@material-ui/icons/TransferWithinAStation";
import { SiSubstack } from "react-icons/si";
import { FiPackage } from "react-icons/fi";

import NavItem from "./NavItem";
const sectionsCompany = [
  {
    items: [
      {
        title: "Dashboard",
        icon: DashboardIcon,
        href: "/dashboard",
      },
      {
        title: "My Contracts",
        icon: GiNotebook,
        href: "/my-projects",
      },

      // {
      //   title: 'Milestone Details',
      //   icon: PieChartIcon,
      //   href: '/milestone-details',
      // },

      {
        title: "My Subscription",
        icon: SiSubstack,
        href: "/my-subscriptions",
      },
      {
        title: "Plan Management",
        icon: FiPackage,
        href: "/pricing",
      },

      // {
      //   title: 'My Tasks',
      //   icon: PieChartIcon,
      //   href: '/pricing',
      // },
      {
        title: "Contact Us",
        icon: ContactMailIcon,
        href: "/contact-us",
      },
      // {
      //   title: "Transaction Management",
      //   icon: TransformIcon,
      //   href: "/user-transaction",
      // },
    ],
  },
];
const sectionsUser = [
  {
    items: [
      {
        title: "Dashboard",
        icon: DashboardIcon,
        href: "/dashboard",
      },
      {
        title: "My Contracts",
        icon: GiNotebook,
        href: "/my-projects",
      },

      // {
      //   title: 'Milestone Details',
      //   icon: PieChartIcon,
      //   href: '/milestone-details',
      // },
      // {
      //   title: "Plan Management",
      //   icon: PieChartIcon,
      //   href: "/pricing",
      // },
      // {
      //   title: 'My Tasks',
      //   icon: PieChartIcon,
      //   href: '/pricing',
      // },
      {
        title: "Contact Us",
        icon: ContactMailIcon,
        href: "/contact-us",
      },
      {
        title: "Transaction Management",
        icon: TransformIcon,
        href: "/user-transaction",
      },
      {
        title: "Travis YMLs",
        icon: TransformIcon,
        href: "/travi-yml",
      },
      
      // {
      //   title: "My Subscription",
      //   icon: PieChartIcon,
      //   href: "/my-subscriptions",
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
    background: "#ffffff",
  },
  desktopDrawer: {
    width: 240,
    top: 0,
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
  const userType = window.localStorage.getItem("userType");

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, userType]);
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      //  display="flex" justifyContent="center" alignContent="center"
      >
        <Logo
          width="50"
          onClick={() => history.push("/dashboard")}
          style={{ cursor: "pointer" }}
        />
      </Box>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        {userType !== "COMPANY" ? (
          <Box py={4}>
            {sectionsUser.map((section, i) => (
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
        ) : (
          <Box py={4}>
            {sectionsCompany.map((section, i) => (
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
        )}
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
