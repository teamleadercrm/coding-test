import { Box } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import ProductItem from "./ProductItem";
import { IProduct } from "../../models/index.model";
import SectionTitle from "../../common/SectionTitle";
import { memo } from "react";

interface ProductListProps {
  products: IProduct[];
  onAddProduct: (product: IProduct) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddProduct,
}) => {
  const renderRow = ({ index, style }: ListChildComponentProps) => {
    const product = products[index];
    return (
      <ProductItem
        style={style}
        key={product.id}
        product={product}
        onAddProduct={() => onAddProduct(product)}
      />
    );
  };

  return (
    <Box p={2}>
      <SectionTitle title="Products List" />
      <FixedSizeList
        height={450}
        itemSize={86}
        itemCount={products.length}
        itemData={products}
        overscanCount={5}
        width=""
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
};

export default memo(ProductList);
