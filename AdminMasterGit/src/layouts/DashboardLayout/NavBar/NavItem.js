import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, Collapse, ListItem, makeStyles, Box } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: "#3e3e3e",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    padding: 0,
  },
  buttonLeaf: {
    color: "#3e3e3e",
    padding: "5px 0px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    // borderLeft: 'solid 8px transparent',
    borderRadius: 0,
    "&:hover": {
      background: theme.palette.secondary.main,
      color: "#C54C82C54C82",
    },
    "&.depth-0": {
      "& $title": {
        fontWeight: 400,
        fontSize: "14px",
      },
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    color: "#3e3e3e",
    fontSize: "22px",
  },
  iconActive: {
    padding: "13px 0px",
    paddingLeft: 30,
    marginRight: 10,
    borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
    width: "40px",
  },
  title: {
    marginRight: "auto",
  },
  active: {
    // borderLeft: 'solid 8px transparent',
    color: "#C54C82",
    borderColor: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightRegular,
    "& $title": {
      fontWeight: 400,
    fontSize: "16px",
    },
    "& $icon": {
      color: "#C54C82",
      // background: theme.palette.secondary.main,
    },
    "& $iconActive": {
      background: theme.palette.secondary.main,
    },
  },
}));

const NavItem = ({
  children,
  className,
  depth,
  href,
  icon: Icon,
  info: Info,
  open: openProp,
  title,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // let paddingLeft = 8;

  // if (depth > 0) {
  //   paddingLeft = 32 + 8 * depth;
  // }

  // // const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}
      >
        <Button className={classes.button} onClick={handleToggle}>
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        exact
        to={href}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
        >
          <Box id="dddddd" className={classes.iconActive}>
            {Icon && <Icon className={classes.icon} size="20" />}
          </Box>
          <span className={classes.title}>{title}</span>
          {Info && <Info />}
        </Box>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  info: PropTypes.elementType,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  open: false,
};

export default NavItem;
