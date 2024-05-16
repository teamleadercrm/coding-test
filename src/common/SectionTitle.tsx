import { FC, memo } from "react";
import { Box, Typography, BoxProps, TypographyProps } from "@mui/material";

interface SectionTitleProps {
  title: string;
  variant?: TypographyProps["variant"];
  align?: TypographyProps["align"];
}

const SectionTitle: FC<SectionTitleProps & BoxProps> = ({
  title,
  variant = "h6",
  align,
  ...props
}) => {
  return (
    <Box {...props}>
      <Typography variant={variant} align={align}>
        {title}
      </Typography>
    </Box>
  );
};

export default memo(SectionTitle);
