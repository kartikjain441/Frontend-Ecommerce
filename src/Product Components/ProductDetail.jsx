import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App.css";
import RelatedProduct from "./RelatedProduct";
import { toast } from "react-toastify";
import AppContext from "../Context";

function ProductDetail() {
  const { id } = useParams();
  const [spcProduct, setSpcProduct] = useState(null);
  const { setUserCart } = useContext(AppContext);
  useEffect(() => {
    async function getSpecificProduct() {
      const res = await axios.get(
        `http://localhost:3000/api/product/get/${id}`
      );

      setSpcProduct(res.data);
    }

    getSpecificProduct();
  }, [id]);

  if (!spcProduct) {
    return <div>Loading product details...</div>; // Loading state
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
    <>
      <div className="container">
        <div className="left mt-3">
          <img src={spcProduct.imgsrc} alt="" style={{ width: "300px" }} />
        </div>
        <div className="right text-center">
          <h1>{spcProduct.title}</h1>
          <p>{spcProduct.description}</p>
          <p style={{ fontWeight: "bold", fontSize: "30px" }}>
            {spcProduct.price}₹
          </p>
          <button
            onClick={() =>
              AddToCart(
                spcProduct._id,
                spcProduct.title,
                spcProduct.price,
                spcProduct.qty,
                spcProduct.imgsrc
              )
            }
            className="btn btn-primary mr-3"
          >
            Add to Cart
          </button>
          <button className="btn btn-secondary " style={{ marginLeft: "47px" }}>
            Buy Now
          </button>
        </div>
      </div>

      <RelatedProduct
        category={spcProduct.category}
        id={spcProduct._id}
      ></RelatedProduct>
    </>
  );
}

export default ProductDetail;
