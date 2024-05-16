import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SectionTitle from "../../common/SectionTitle";
import { APP_SUBTITLE, APP_TITLE } from "../../utils/constants";
import useStyles from "./Header.styles";

const Header: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SectionTitle title={APP_TITLE} />
          <SectionTitle
            title={APP_SUBTITLE}
            variant="body1"
            className={classes.subTitle}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
