import { IProduct } from "./product.model";

export interface IOrderItem {
  "product-id": string;
  quantity?: string;
  "unit-price"?: string;
  total?: string;
}

export interface IOrder {
  id: string;
  "customer-id"?: string;
  items?: IOrderItem[];
  total?: string;
}

export interface IOrderProductItem {
  "product-id"?: string;
  product?: IProduct;
  quantity?: string;
  "unit-price"?: string;
  total?: string;
}
