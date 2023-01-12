import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: "hidden",
      },
    },
    MuiTableCell: {
      root: {
        padding: "8px 10px",
        fontSize: "14px",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiDialogContent: {
      root: {
        padding: "24px 24px !important",
      },
    },
    MuiChip: {
      root: {
        backgroundColor: "rgba(0,0,0,0.075)",
      },
    },
    MuiCardContent: {
      root: {
        "&:last-child": {
          paddingBottom: " 16px",
        },
      },
    },
    MuiFormControl: { marginDense: { marginTop: "0px", marginBottom: "4px" } },
    MuiIconButton: { edgeEnd: { marginRight: "0px" } },
    MuiTypography: {
      paragraph: { marginBottom: "0px" },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: "0px",
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: "13.5px 14px",
      },
      adornedEnd: {
        paddingRight: "0px",
      },
      inputMarginDense: {
        paddingTop: " 13.5px",
        paddingBottom: "13.5px",
      },
    },

    // MuiDialog: { paperWidthSm: { maxWidth: "360px" } },
    MuiInputBase: {
      root: {
        paddingBottom: "0px",
        fontWeight: 300,
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
        border: " 0.1px solid #c4c4c4 !important",
        padding: "8px 15px",
        boxShadow: "none",
        borderWidth: "2px",
        borderRadius: "4px",
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
      black: "#c61175fa",
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
