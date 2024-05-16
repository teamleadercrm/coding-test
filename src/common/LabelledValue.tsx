import { FC, ReactNode } from "react";
import { Box, Typography, BoxProps } from "@mui/material";

interface LabelledValueProps extends BoxProps {
  value: ReactNode;
  label: ReactNode;
}

const LabelledValue: FC<LabelledValueProps> = ({ value, label, ...props }) => {
  return (
    <Box display="flex" alignItems="center" {...props}>
      <Typography variant="body1" fontWeight="bold" mr={1}>
        {label}:
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};

export default LabelledValue;
