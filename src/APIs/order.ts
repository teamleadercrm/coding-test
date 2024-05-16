import { AxiosResponse } from "axios";
import api from "./index";
import { IOrder } from "../models/index.model";

export const fetchOrders = async (): Promise<IOrder[]> => {
  try {
    const res: AxiosResponse<IOrder[]> = await api.get("/orders.json");
    const orders: IOrder[] = res.data;
    return orders;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchOrder = async (
  orderId: number | string | undefined
): Promise<IOrder | undefined> => {
  try {
    const res: AxiosResponse<IOrder> = await api.get(`/order${orderId}.json`);
    const order: IOrder = res.data;
    return order;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
