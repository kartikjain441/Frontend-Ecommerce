import React, { useContext } from "react";
import AppContext from "../Context";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { userCart, setUserCart } = useContext(AppContext);
  const navigate = useNavigate();
  async function handleDecreaseQty(id) {
    const token = localStorage.getItem("Auth");

    const res = await axios.get(`https://backend-ecommerce-m2ut.onrender.com/cart/--qty/${id}`, {
      headers: {
        Auth: token,
      },
    });

    const updatedCart = await axios.get(`https://backend-ecommerce-m2ut.onrender.com/cart/user`, {
      headers: {
        Auth: token,
      },
    });

    setUserCart(updatedCart.data.items);
  }

  async function handleIncreaseQty(id) {
    const token = localStorage.getItem("Auth");

    const res = await axios.get(
      `https://backend-ecommerce-m2ut.onrender.com/cart/qty/increase/${id}`,
      {
        headers: {
          Auth: token,
        },
      }
    );

    const updatedCart = await axios.get(`https://backend-ecommerce-m2ut.onrender.com/cart/user`, {
      headers: {
        Auth: token,
      },
    });

    setUserCart(updatedCart.data.items);
  }

  async function handleRemove(id) {
    const token = localStorage.getItem("Auth");
    const res = await axios.get(`https://backend-ecommerce-m2ut.onrender.com/cart/remove/${id}`, {
      headers: {
        Auth: token,
      },
    });

    const updatedCart = await axios.get(`https://backend-ecommerce-m2ut.onrender.com/cart/user`, {
      headers: {
        Auth: token,
      },
    });

    setUserCart(updatedCart.data.items);
  }

  if (!userCart || userCart.length < 1) {
    return (
      <>
        <div className="text-center">
          <h1>No Item in the Cart</h1>
        </div>
      </>
    );
  }

  async function handleCheckOut() {
    navigate("/address");
  }

  async function handleClearCart() {
    const token = localStorage.getItem("Auth");
    const res = await axios.get("https://backend-ecommerce-m2ut.onrender.com/cart/clear", {
      headers: {
        Auth: token,
      },
    });
    console.log(res.data);
    setUserCart([]);
  }

  return (
    <>
      <div className="container2 ">
        {userCart?.map((item) => {
          return (
            <div
              key={item._id}
              className="cart d-flex align-items-center p-3 mb-3 mt-3 shadow-sm border rounded"
            >
              <img
                src={item?.imgsrc}
                alt={item.title}
                className="img-fluid me-3 rounded"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <div className="text flex-grow-1 d-flex flex-column align-items-center">
                <h5 className="mb-2">{item.title}</h5>
                <p className="mb-2">Price: ${Math.floor(item.price)}</p>
                <p className="mb-4">Quantity: {item.qty}</p>
              </div>
              <div className="button-group d-flex">
                <button
                  onClick={() => handleDecreaseQty(item.productId)}
                  type="button"
                  className="btn btn-primary me-2"
                >
                  Decrease Qty
                </button>
                <button
                  onClick={() => handleIncreaseQty(item.productId)}
                  type="button"
                  className="btn btn-success me-2"
                >
                  Increase Qty
                </button>
                <button
                  onClick={() => handleRemove(item.productId)}
                  type="button"
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        <div className="mb-5 mt-5">
          <button
            onClick={handleCheckOut}
            type="button"
            class="btn btn-warning mx-3"
          >
            Check Out
          </button>
          <button
            onClick={handleClearCart}
            type="button"
            class="btn btn-danger mx-3"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
