import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  subTitle: {
    marginLeft: "0.5rem",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default useStyles;
