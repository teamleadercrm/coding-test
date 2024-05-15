import { AxiosResponse } from "axios";
import api from "./index";
import { IProduct } from "../models/index.model";

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const res: AxiosResponse<IProduct[]> = await api.get("/products.json");
    const products: IProduct[] = res.data;
    return products;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
