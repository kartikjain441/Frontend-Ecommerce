import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../Context";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const location = useLocation();
  const addressData = location.state?.data || {};
  const { userCart, setUserCart, userId } = useContext(AppContext);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [TotalQty, setTotalQty] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    function Cal() {
      let TotalP = 0;
      let TotalQ = 0;
      userCart.forEach((obj) => {
        TotalP = TotalP + obj.price;
        TotalQ = TotalQ + obj.qty;
      });
      setTotalPrice(TotalP);
      setTotalQty(TotalQ);
    }
    Cal();
  }, [userCart]);

  const handlePayment = async () => {
    try {
      const orderRespons = await axios.post(
        "https://backend-ecommerce-m2ut.onrender.com/Payment/checkout",
        {
          amount: TotalPrice,
          qty: TotalQty,
          cartItems: userCart,
          userShipping: addressData,
          userId,
        }
      );

      const { orderId, amount: orderAmount } = orderRespons.data;

      var options = {
        key: "rzp_test_iHGS91ZuD3OrFT", // Enter the Key ID generated from the Dashboard
        amount: orderAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Kartik E commerce",
        description: "Test Transaction",

        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: userCart,
            userId,
            userShipping: addressData,
          };

          const api = await axios.post(
            "https://backend-ecommerce-m2ut.onrender.com/payment/verify-payment",
            paymentData
          );

          console.log(api.data);

          if (api.data.success) {
            const token = localStorage.getItem("Auth");
            const res = await axios.get(
              "https://backend-ecommerce-m2ut.onrender.com/cart/clear",
              {
                headers: {
                  Auth: token,
                },
              }
            );
            setUserCart([]);
            navigate("/orderConfimation");
          }
        },
        prefill: {
          name: "abc",
          email: "abc@gmail.com",
          contact: "9000090000",
        },
        notes: {
          address: "LiG, Indore",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log(orderRespons.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleDecreaseQty(id) {
    const token = localStorage.getItem("Auth");

    const res = await axios.get(
      `https://backend-ecommerce-m2ut.onrender.com/cart/--qty/${id}`,
      {
        headers: {
          Auth: token,
        },
      }
    );

    const updatedCart = await axios.get(
      `https://backend-ecommerce-m2ut.onrender.com/cart/user`,
      {
        headers: {
          Auth: token,
        },
      }
    );

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

    const updatedCart = await axios.get(
      `https://backend-ecommerce-m2ut.onrender.com/cart/user`,
      {
        headers: {
          Auth: token,
        },
      }
    );

    setUserCart(updatedCart.data.items);
  }
  async function handleRemove(id) {
    const token = localStorage.getItem("Auth");
    const res = await axios.get(
      `https://backend-ecommerce-m2ut.onrender.com/cart/remove/${id}`,
      {
        headers: {
          Auth: token,
        },
      }
    );

    const updatedCart = await axios.get(
      `https://backend-ecommerce-m2ut.onrender.com/cart/user`,
      {
        headers: {
          Auth: token,
        },
      }
    );
    setUserCart(updatedCart.data.items);
  }

  return (
    <>
      <h1 className="text-center">Order Summary</h1>
      <div className="container mt-4 mb-4" style={{ maxWidth: "80%" }}>
        <table
          className="table table-bordered"
          style={{
            border: "2px solid black",
            borderCollapse: "collapse",
            height: "auto",
          }}
        >
          <thead>
            <tr>
              <th className="text-center" style={{ border: "2px solid black" }}>
                Product Detail
              </th>
              <th
                className="text-center d-none d-md-table-cell"
                style={{ border: "2px solid black" }}
              >
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="text-center"
                style={{ border: "2px solid black", width: "70%" }}
              >
                <table
                  className="table table-bordered"
                  style={{
                    border: "2px solid black",
                    borderCollapse: "collapse",
                    height: "auto",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        className="text-center"
                        style={{ border: "2px solid black" }}
                      >
                        Product Img
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "2px solid black" }}
                      >
                        Title
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "2px solid black" }}
                      >
                        Price
                      </th>
                      <th
                        className="text-center"
                        style={{ border: "2px solid black" }}
                      >
                        Qty
                      </th>
                      <th
                        className="text-center d-none d-md-table-cell"
                        style={{ border: "2px solid black" }}
                      >
                        Qty-
                      </th>
                      <th
                        className="text-center d-none d-md-table-cell"
                        style={{ border: "2px solid black" }}
                      >
                        Qty++
                      </th>
                      <th
                        className="text-center d-none d-md-table-cell"
                        style={{ border: "2px solid black" }}
                      >
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userCart.map((item) => (
                      <tr key={item.productId}>
                        <td
                          className="text-center"
                          style={{
                            border: "2px solid black",
                            width: "150px",
                          }}
                        >
                          <img
                            src={item.imgsrc}
                            alt=""
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "contain",
                            }}
                          />
                        </td>
                        <td
                          className="text-center"
                          style={{
                            border: "2px solid black",
                            width: "150px",
                          }}
                        >
                          <span style={{ fontSize: "16px", fontWeight: "500" }}>
                            {item.title}
                          </span>
                        </td>
                        <td
                          className="text-center"
                          style={{
                            border: "2px solid black",
                            width: "100px",
                          }}
                        >
                          <span style={{ fontSize: "16px", fontWeight: "500" }}>
                            ${item.price}
                          </span>
                        </td>
                        <td
                          className="text-center"
                          style={{
                            border: "2px solid black",
                            width: "50px",
                          }}
                        >
                          <span style={{ fontSize: "16px" }}>{item.qty}</span>
                        </td>
                        <td
                          className="text-center d-none d-md-table-cell"
                          style={{
                            border: "2px solid black",
                            width: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleDecreaseQty(item.productId)}
                          >
                            Decrease
                          </button>
                        </td>
                        <td
                          className="text-center d-none d-md-table-cell"
                          style={{
                            border: "2px solid black",
                            width: "50px",
                          }}
                        >
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleIncreaseQty(item.productId)}
                          >
                            Increase
                          </button>
                        </td>
                        <td
                          className="text-center d-none d-md-table-cell"
                          style={{
                            border: "2px solid black",
                            width: "50px",
                          }}
                        >
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemove(item.productId)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td
                        className="text-center"
                        style={{
                          border: "2px solid black",
                          width: "150px",
                        }}
                      ></td>
                      <td
                        className="text-center"
                        style={{
                          border: "2px solid black",
                          width: "150px",
                        }}
                      >
                        <button className="btn btn-primary">Total</button>
                      </td>
                      <td
                        className="text-center"
                        style={{
                          border: "2px solid black",
                          width: "100px",
                        }}
                      >
                        <button className="btn btn-warning">
                          {TotalPrice}
                        </button>
                      </td>
                      <td
                        className="text-center"
                        style={{
                          border: "2px solid black",
                          width: "50px",
                        }}
                      >
                        <button className="btn btn-success">{TotalQty}</button>
                      </td>
                      <td
                        className="text-center d-none d-md-table-cell"
                        style={{
                          border: "2px solid black",
                          width: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      ></td>
                      <td
                        className="text-center d-none d-md-table-cell"
                        style={{
                          border: "2px solid black",
                          width: "50px",
                        }}
                      ></td>
                      <td
                        className="text-center d-none d-md-table-cell"
                        style={{
                          border: "2px solid black",
                          width: "50px",
                        }}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td
                className="d-none d-md-table-cell"
                style={{ border: "2px solid black" }}
              >
                <ul style={{ paddingLeft: "20px" }}>
                  <li>{addressData.AddressLine}</li>
                  <li>{addressData.city}</li>
                  <li>{addressData.country}</li>
                  <li>{addressData.name}</li>
                  <li>{addressData.number}</li>
                  <li>{addressData.pincode}</li>
                  <li>{addressData.state}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Shipping Address Table for Mobile View */}
        <table
          className="table table-bordered d-md-none"
          style={{
            border: "2px solid black",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th className="text-center" style={{ border: "2px solid black" }}>
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center" style={{ border: "2px solid black" }}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>{addressData.AddressLine}</li>
                  <li>{addressData.city}</li>
                  <li>{addressData.country}</li>
                  <li>{addressData.name}</li>
                  <li>{addressData.number}</li>
                  <li>{addressData.pincode}</li>
                  <li>{addressData.state}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-warning mb-5"
          style={{ backgroundColor: "yellow", padding: "10px 20px" }}
          onClick={handlePayment}
        >
          Proceed to Pay
        </button>
      </div>
    </>
  );
}

export default Checkout;
