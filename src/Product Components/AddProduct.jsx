import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../Context";
const AddProduct = () => {
  const [FormData, setFormData] = useState({});
  const navigate = useNavigate();
  const { setAllProducts } = useContext(AppContext);
  function handleFormData(e) {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await axios.post(
      "https://backend-ecommerce-m2ut.onrender.com/product/add",
      FormData
    );
    if (res.data.success) {
      navigate("/");
    }

    const respone = await axios.get("https://backend-ecommerce-m2ut.onrender.com/product/all");

    setAllProducts(respone.data);
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div
            className="card"
            style={{
              width: window.innerWidth <= 576 ? "300px" : "500px",
            }}
          >
            <div className="card-header text-center">
              <h4>Add Product</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"
                    value={FormData.title}
                    placeholder="Enter product title"
                    onChange={handleFormData}
                  />
                </div>

                {/* Description Field */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    id="description"
                    rows="3"
                    value={FormData.description}
                    placeholder="Enter product description"
                    onChange={handleFormData}
                  ></textarea>
                </div>

                {/* Price Field */}
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={FormData.price}
                    className="form-control"
                    id="price"
                    placeholder="Enter product price"
                    onChange={handleFormData}
                  />
                </div>

                {/* Category Field */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    name="category"
                    type="text"
                    className="form-control"
                    id="category"
                    value={FormData.category}
                    placeholder="Enter product category"
                    onChange={handleFormData}
                  />
                </div>

                {/* Quantity Field */}
                <div className="mb-3">
                  <label htmlFor="qty" className="form-label">
                    Quantity
                  </label>
                  <input
                    name="qty"
                    type="number"
                    className="form-control"
                    id="qty"
                    value={FormData.qty}
                    placeholder="Enter product quantity"
                    onChange={handleFormData}
                  />
                </div>

                {/* Image Source Field */}
                <div className="mb-3">
                  <label htmlFor="imgsrc" className="form-label">
                    Image Source URL
                  </label>
                  <input
                    name="imgsrc"
                    type="text"
                    className="form-control"
                    id="imgsrc"
                    value={FormData.imgsrc}
                    placeholder="Enter image URL"
                    onChange={handleFormData}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
