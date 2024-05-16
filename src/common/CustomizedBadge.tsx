import React, { FC, memo } from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface CustomizedBadgeProps extends BadgeProps {
  count: number | undefined;
  color?: "default" | "error" | "primary" | "secondary";
  badgeIcon?: React.ElementType;
}

const CustomizedBadge: FC<CustomizedBadgeProps> = ({
  count,
  color = "secondary",
  badgeIcon: BadgeIcon = ShoppingCartIcon,
  ...props
}) => {
  return (
    <Badge badgeContent={count} color={color} {...props}>
      <BadgeIcon />
    </Badge>
  );
};

export default memo(CustomizedBadge);
