import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IOrder } from "../models/index.model";
import SectionTitle from "../common/SectionTitle";
import PriceDisplay from "../common/PriceDisplay";
import CustomizedBadge from "../common/CustomizedBadge";

interface OrderItemProps {
  order?: IOrder;
}

const OrderItem: React.FC<OrderItemProps> = ({ order = {} }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          p: 2,
        }}
      >
        <CardActionArea>
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <SectionTitle title={`Order - ${order?.id}`} variant="h5" />
              <CustomizedBadge count={order?.items?.length} />
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <PriceDisplay value={order?.total} label="Total Price" />
            <Link to={`/order/${order.id}`}>
              <Button size="small" variant="contained" color="secondary">
                Details
              </Button>
            </Link>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default OrderItem;
