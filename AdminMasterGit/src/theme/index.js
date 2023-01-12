import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiIconButton: {
      edgeEnd: {
        marginRight: 0,
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: "13.5px 14px",
      },
      adornedEnd: {
        paddingRight: 0,
      },
      inputMarginDense: {
        paddingTop: "13.5px",
        paddingBottom: "13.5px",
      },
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: "hidden",
      },
    },
    MuiTableCell: {
      root: {
        fontSize: "14px",
        padding: "5px 16px !important"
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },

    MuiChip: {
      root: {
        backgroundColor: "rgba(0,0,0,0.075)",
      },
    },
    MuiTypography: { paragraph: { marginBottom: "5px" } },
    MuiInputBase: {
      input: {
        fontWeight: 400,
        fontSize: "14px",
      },
      inputMultiline: {
        fontWeight: 400,
        fontSize: "14px",
      },
      root: {
        "& > input[type=number]": {
          "-moz-appearance": "textfield",
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        },
      },
    },
    MuiRadio: {
      "-colorSecondary.Mui-checked ": {
        color: "#1c42ce",
      },

    },
    MuiButton: {
      contained: {
        boxShadow: "none",
        borderRadius: 10,
        "&:hover": {
          boxShadow: "none",
        },
      },

      outlined: {
        boxShadow: "none",
        borderRadius: 10,
        borderWidth: 2,
      },
      outlinedPrimary: {
        borderRadius: 10,
        boxShadow: "none",
      },
      containedSizeLarge: {
        color: "#ffffff",
        padding: "14px 50px",
      },
    },
  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#FBFBFD",
      dark: "#f3f7f9",
      paper: colors.common.white,
    },
    primary: {
      main: "#C54C82",
      dark: "#C54C82",
      light: "#C54C82",
    },
    secondary: {
      main: "#FEBFCC",
    },
    warning: {
      main: "#fe9b00",
      dark: "#f69371",
      light: "#f69371",
    },
    success: {
      main: "#39b54a",
      dark: "#39b54a",
      light: "#39b54a",
    },
    error: {
      main: "#fd612c",
      dark: "#ff7d68",
      light: "#ffe9e6",
    },
    text: {
      primary: "#52565c",
      secondary: "#999999",
    },
    common: {
      black: "#222222",
    },
  },
};

export const createTheme = (config = {}) => {
  let theme = createMuiTheme(_.merge({}, baseOptions, themesOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
