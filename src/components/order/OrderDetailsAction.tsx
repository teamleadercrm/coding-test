import { Box, Button, Grid } from "@mui/material";
import { IOrder } from "../../models/index.model";
import PaperWrapper from "../../common/PaperWrapper";
import SectionTitle from "../../common/SectionTitle";
import LabelledValue from "../../common/LabelledValue";
import PriceDisplay from "../../common/PriceDisplay";

interface OrderDetailsActionProps {
  order?: IOrder;
  onPlace?: () => void;
}

const OrderDetailsAction: React.FC<OrderDetailsActionProps> = ({
  order = {},
  onPlace = () => {},
}) => {
  return (
    <PaperWrapper>
      <Box p={2}>
        <SectionTitle title="Order Information" pb={2} />
        <LabelledValue label="Order ID" value={order?.id} />
        <Grid container my={1}>
          <PriceDisplay value={order?.total} label="Total Price" />
        </Grid>
        <Button variant="contained" onClick={onPlace}>
          Place Order
        </Button>
      </Box>
    </PaperWrapper>
  );
};

export default OrderDetailsAction;
