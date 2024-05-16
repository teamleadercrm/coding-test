import React, { memo } from "react";
import { Fab, ListItemText, ListItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IProduct } from "../../models/index.model";
import useStyles from "../../styles/global.styles";
import PriceDisplay from "../../common/PriceDisplay";

interface ProductItemProps {
  product: IProduct;
  onAddProduct: () => void;
  style?: React.CSSProperties;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onAddProduct,
  style,
}) => {
  const classes = useStyles();

  return (
    <ListItem style={style} className={classes.listItem} component="li">
      <ListItemText
        primary={product.description}
        secondary={
          <PriceDisplay value={product?.price?.toString()} label="Price" />
        }
        secondaryTypographyProps={{
          component: "div",
        }}
      />
      <Fab
        color="primary"
        size="small"
        aria-label="add-product"
        onClick={onAddProduct}
      >
        <AddIcon />
      </Fab>
    </ListItem>
  );
};

export default memo(ProductItem);
