import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import AppContext from "../Context";
import axios from "axios";
import { toast } from "react-toastify";

function ShowProductAdmin() {
  let { products } = useContext(AppContext);
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate("/admin/edit", { state: { id } });
  }
  const { setAllProducts } = useContext(AppContext);

  async function handleDelete(id) {
    const res = await axios.delete(
      `http://localhost:3000/api/product/delete/${id}`
    );
    if (res.data.success) {
      navigate("/");
      toast.success(res.data.message);
    }

    const respone = await axios.get("http://localhost:3000/api/product/all");

    setAllProducts(respone.data);
  }
  return (
    <>
      <div className="container2">
        {products?.map((product) => (
          <div
            key={product._id}
            className="cart d-flex align-items-center p-3 mb-3 mt-3 shadow-sm border rounded"
          >
            <img
              src={product.imgsrc}
              alt={product.title}
              className="img-fluid me-3 rounded"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div className="text flex-grow-1 d-flex flex-column align-items-center">
              <h5 className="mb-2">{product.title}</h5>
              <p className="mb-2">{product.description}</p>
              <p className="mb-4">{product.createdAt}</p>
            </div>
            <div className="button-group d-flex">
              <button
                onClick={() => handleEdit(product._id)}
                type="button"
                className="btn btn-success me-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                type="button"
                className="btn btn-danger me-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShowProductAdmin;
