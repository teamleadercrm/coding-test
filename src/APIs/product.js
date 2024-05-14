import api from "./index";

export const fetchProducts = async () => {
  try {
    const res = await api.get("/products.json");
    const products = res?.data;
    return products;
  } catch (err) {
    console.error(err);
  }
};
