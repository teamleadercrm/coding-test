import React, { ReactNode } from "react";
import Header from "./header";
import { Box } from "@mui/material";
import useStyles from "./MainLayout.styles";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.root}>
      <Header />
      <Box component="main">{children}</Box>
    </Box>
  );
};

export default MainLayout;
