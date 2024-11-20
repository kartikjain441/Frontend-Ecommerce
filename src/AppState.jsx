import React, { useState, useEffect } from "react";
import AppContext from "./Context";
import axios from "axios";

function AppState({ children }) {
  const [products, setAllProducts] = useState([]);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [userId, setUserId] = useState();
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("Auth");
    if (token) {
      setIsAuthenticate(true);
    }
  }, []);

  useEffect(() => {
    async function getUserCart() {
      const token = localStorage.getItem("Auth");
      const res = await axios.get("https://backend-ecommerce-m2ut.onrender.com/cart/user", {
        headers: {
          Auth: token,
        },
      });
      setUserId(res.data.userId);
      setUserCart(res.data.items);
    }
    getUserCart();
  }, []);

  const user_Order = async () => {
    const token = localStorage.getItem("Auth");
    const api = await axios.get("https://backend-ecommerce-m2ut.onrender.com/payment/userorder", {
      headers: {
        Auth: token,
      },
    });
    console.log("user order", api.data);
    setUserOrder(api.data);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend-ecommerce-m2ut.onrender.com/product/all"
        );
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    user_Order();
    getProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        isAuthenticate,
        setIsAuthenticate,
        userCart,
        setUserCart,
        setAllProducts,
        userId,
        userOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppState;
