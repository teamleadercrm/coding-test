import api from "./index";

export const fetchCustomers = async () => {
  try {
    const res = await api.get("/customers.json");
    const customers = res?.data;
    return customers;
  } catch (err) {
    console.error(err);
  }
};
