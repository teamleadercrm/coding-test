import { ReactNode, FC, memo } from "react";
import { Paper, PaperProps } from "@mui/material";

interface PaperWrapperProps extends PaperProps {
  elevation?: number;
  children: ReactNode;
}

const PaperWrapper: FC<PaperWrapperProps> = ({
  elevation = 3,
  children,
  ...props
}) => {
  return (
    <Paper elevation={elevation} {...props}>
      {children}
    </Paper>
  );
};

export default memo(PaperWrapper);
