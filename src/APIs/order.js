import api from "./index";

export const fetchOrders = async () => {
  try {
    const res = await api.get("/orders.json");
    const orders = res?.data;
    return orders;
  } catch (err) {
    console.error(err);
  }
};

export const fetchOrder = async (orderId) => {
  try {
    const res = await api.get(`/order${orderId}.json`);
    const orders = res?.data;
    return orders;
  } catch (err) {
    console.error(err);
  }
};
