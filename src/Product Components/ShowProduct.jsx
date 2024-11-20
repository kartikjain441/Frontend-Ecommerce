import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "../Context";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ShowProduct = () => {
  const { products, userCart, setUserCart } = useContext(AppContext);

  if (!products || products.length === 0) {
    return <p>Loading products...</p>;
  }

  async function AddToCart(productId, title, price, qty, imgsrc) {
    const token = localStorage.getItem("Auth");

    const res = await axios.post(
      "http://localhost:3000/api/cart/add",
      {
        productId,
        title,
        price,
        qty: 1,
        imgsrc,
      },
      {
        headers: {
          Auth: token,
        },
      }
    );

    toast.success(res.data.message);

    const updatedCart = await axios.get(`http://localhost:3000/api/cart/user`, {
      headers: {
        Auth: token,
      },
    });

    setUserCart(updatedCart.data.items);
  }

  return (
    <div className="container mt-4 ">
      <div className="row con g-4 justify-content-center mb-4">
        {products.map((product) => (
          <div
            className="col-md-4 col-6 d-flex justify-content-center"
            key={product._id}
          >
            <div className="card shadow-sm" style={{ width: "15rem" }}>
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.imgsrc}
                  className="card-img-top"
                  alt={product.title}
                  style={{ objectFit: "cover", height: "250px" }}
                />
              </Link>
              <div className="card-body text-center">
                <h5 className="card-title text-truncate">{product.title}</h5>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button className="btn btn-primary">${product.price}</button>
                  <button
                    onClick={() =>
                      AddToCart(
                        product._id,
                        product.title,
                        product.price,
                        product.qty,
                        product.imgsrc
                      )
                    }
                    className="btn btn-success"
                  >
                    <i className="bi bi-cart"></i>{" "}
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )  )}
      </div>
    </div>
  );
};

export default ShowProduct;
