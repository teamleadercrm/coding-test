import { AxiosResponse } from "axios";
import { ICustomer } from "../models/customer.model";
import api from "./index";

export const fetchCustomers = async (): Promise<ICustomer[]> => {
  try {
    const res: AxiosResponse<ICustomer[]> = await api.get("/customers.json");
    const customers: ICustomer[] = res.data;
    return customers;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
