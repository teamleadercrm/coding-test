import { Box, Typography } from "@mui/material";
import { IOrderProductItem } from "../../models/index.model";
import PaperWrapper from "../../common/PaperWrapper";
import SectionTitle from "../../common/SectionTitle";
import OrderDetailsItem from "./OrderDetailsItem";
import { memo } from "react";

interface OrderDetailsListProps {
  orderItems?: IOrderProductItem[];
  onRemove?: (item: IOrderProductItem) => void;
}

const OrderDetailsList: React.FC<OrderDetailsListProps> = ({
  orderItems = [],
  onRemove = () => {},
}) => {
  return (
    <PaperWrapper>
      <Box p={2}>
        <SectionTitle title="Order Items List" variant="h6" />
        {orderItems?.length ? (
          orderItems?.map((item) => (
            <OrderDetailsItem
              key={item?.["product-id"]}
              item={item}
              onRemove={onRemove}
            />
          ))
        ) : (
          <Typography variant="h5" color="secondary" my={2}>
            You have no order items
          </Typography>
        )}
      </Box>
    </PaperWrapper>
  );
};

export default memo(OrderDetailsList);
