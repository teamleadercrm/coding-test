import { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";
import { formatCurrency } from "../utils/numberUtils";

interface PriceDisplayProps extends TypographyProps {
  value?: string;
  label: string;
}

const PriceDisplay: FC<PriceDisplayProps> = ({ value, label, ...props }) => {
  return (
    <Typography variant="body2" component="div" {...props}>
      {label}:
      <Typography variant="body2" component="span" color="primary">
        {" "}
        {value ? formatCurrency(value) : "-"}
      </Typography>
    </Typography>
  );
};

export default PriceDisplay;
