import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
      styleOverrides: {
        body2: {
          fontSize: "1rem",
          fontWeight: 600,
        },
      },
    },
  },
  palette: {
    colors: {
      primary: "#1976d2",
      secondary: "#dc004e",
      error: "#f44336",
      warning: "#ff9800",
      info: "#2196f3",
      success: "#4caf50",
      grey: "#f5f5f5",
    },
    background: {
      paper: "#ffffff",
    },
  },
  borders: {
    grey: {
      sm: "1px solid #ccc",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  zIndex: {
    backdrop: 1200,
  },
});
