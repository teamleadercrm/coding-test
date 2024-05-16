import { Box, Fab } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { IOrderProductItem } from "../../models/index.model";
import useStyles from "../../styles/global.styles";
import LabelledValue from "../../common/LabelledValue";
import PriceDisplay from "../../common/PriceDisplay";

interface OrderDetailsItemProps {
  item?: IOrderProductItem;
  onRemove?: (item: IOrderProductItem) => void;
}

const OrderDetailsItem: React.FC<OrderDetailsItemProps> = ({
  item = {} as IOrderProductItem,
  onRemove = () => {},
}) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      padding={2}
      className={classes.listItem}
    >
      <Box flexGrow={1} sx={{ display: "flex", flexDirection: "column" }}>
        <LabelledValue label="Product ID" value={item?.["product-id"]} />
        <LabelledValue
          label="Product Description"
          value={item?.product?.description}
        />
        <LabelledValue label="Quantity" value={item?.quantity} />
        <LabelledValue label="Unit Price" value={item?.["unit-price"]} />
        <PriceDisplay value={item?.total} label="Total" />
      </Box>
      <Fab
        color="error"
        size="small"
        aria-label="remove-product"
        onClick={() => onRemove(item)}
      >
        <RemoveIcon />
      </Fab>
    </Box>
  );
};

export default OrderDetailsItem;
