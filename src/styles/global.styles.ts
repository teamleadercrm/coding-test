import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    borderBottom: theme.borders?.grey?.sm,
    "&:last-child": {
      borderBottom: "none",
    },
  },
}));

export default useStyles;
