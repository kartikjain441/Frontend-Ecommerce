import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AppContext from "../Context";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function RelatedProduct({ category, id }) {
  const { products } = useContext(AppContext);
  const [productbycategory, setproductbycategory] = useState([]);

  useEffect(() => {
    function getproductByCategory() {
      const ProductByCategory = products.filter((product) => {
        if (product.category === category && product._id != id) {
          return product;
        }
      });
      console.log(ProductByCategory);

      setproductbycategory(ProductByCategory);
    }
    getproductByCategory();
  }, [category, products, id]);

  return (
    <>
      {productbycategory.length != 0 && (
        <h1 className="text-center mt-5 mb-5">Related Product</h1>
      )}

      <div className="container mt-4 mb-5">
        <div className="row g-4 justify-content-evenly mb-5">
          {productbycategory.map((product) => (
            <div
              className="col-md-4 col-6 d-flex justify-content-center"
              key={product._id}
            >
              <div
                className="card shadow-sm"
                style={{
                  width: window.innerWidth <= 576 ? "100%" : "15rem",
                }}
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imgsrc}
                    className="card-img-top"
                    alt={product.title}
                    style={{ objectFit: "cover", height: "283px" }}
                  />
                </Link>
                <div className="card-body text-center">
                  <h5 className="card-title text-truncate">{product.title}</h5>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button className="btn btn-primary">
                      ${product.price}
                    </button>
                    <button className="btn btn-success">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RelatedProduct;
