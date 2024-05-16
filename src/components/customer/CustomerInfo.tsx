import React, { memo } from "react";
import { Box, SxProps } from "@mui/system";
import { ICustomer } from "../../models/index.model";
import PaperWrapper from "../../common/PaperWrapper";
import SectionTitle from "../../common/SectionTitle";
import LabelledValue from "../../common/LabelledValue";

interface CustomerInfoProps {
  customer: ICustomer;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  const boxSx: SxProps = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <PaperWrapper>
      <Box p={2} sx={boxSx}>
        <SectionTitle title="Customer Information" variant="h6" pb={2} />
        <LabelledValue label="Customer ID" value={customer?.id} />
        <LabelledValue label="Customer Name" value={customer?.name} />
        <LabelledValue label="Customer Since" value={customer?.since} />
        <LabelledValue label="Customer Revenue" value={customer?.revenue} />
      </Box>
    </PaperWrapper>
  );
};

export default memo(CustomerInfo);
