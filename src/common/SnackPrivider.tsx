import { SnackbarProvider } from "notistack";
import SnackProviderWrapper from "./SnackProviderWrapper";
import { Slide, SlideProps } from "@mui/material";
import React, { memo } from "react";

interface SnackProviderProps {
  children: React.ReactNode;
}

const SnackProvider: React.FC<SnackProviderProps> = ({ children }) => {
  const SlideTransition: React.FC<SlideProps> = ({ children, ...props }) => {
    return <Slide {...props}>{children}</Slide>;
  };

  return (
    <SnackbarProvider
      TransitionComponent={SlideTransition}
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <SnackProviderWrapper>{children}</SnackProviderWrapper>
    </SnackbarProvider>
  );
};

export default memo(SnackProvider);
