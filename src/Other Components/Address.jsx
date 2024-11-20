import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Address.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Address() {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [FormData, setFormData] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    number: "",
    AddressLine: "",
  });

  const navigate = useNavigate();

  async function handleOnClick() {
    try {
      const token = localStorage.getItem("Auth");
      const res = await axios.get(
        "https://backend-ecommerce-m2ut.onrender.com/api/api/address/get",
        {
          headers: {
            Auth: token,
          },
        }
      );

      if (res.data.LastAddress) {
        setFormData({
          name: res.data.LastAddress.name || "",
          country: res.data.LastAddress.country || "",
          state: res.data.LastAddress.state || "",
          city: res.data.LastAddress.city || "",
          pincode: res.data.LastAddress.pincode || "",
          number: res.data.LastAddress.number || "",
          AddressLine: res.data.LastAddress.AddressLine || "",
        });
        setShouldNavigate(true);
      } else {
        toast.info("No previous address found.");
      }
    } catch (error) {
      console.error("Error fetching last address:", error);
      toast.error("Failed to fetch last address.");
    }
  }

  async function handleOnSubmit() {
    const token = localStorage.getItem("Auth");
    const res = await axios.post(
      "https://backend-ecommerce-m2ut.onrender.com/api/address/add",
      FormData,
      {
        headers: {
          Auth: token,
        },
      }
    );
    if (res.data.success) {
      toast.success(res.data.message);
      setShouldNavigate(true);
    } else {
      toast.error(res.data.message);
    }
  }

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/checkout", { state: { data: FormData } });
    }
  }, [shouldNavigate, FormData, navigate]);

  function handleOnChange(e) {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="col-10 mt-3 mb-3 p-4 shadow-lg"
        style={{
          border: "2px solid black",
          height: "auto",
          borderRadius: "12px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h1 className="text-center mb-4" style={{ fontWeight: "bold" }}>
          Shopping Address
        </h1>

        <div className="row justify-content-evenly">
          <div className="col-md-3">
            <h1 className="fs-5 mb-2" style={{ fontWeight: "500" }}>
              Full Name
            </h1>
            <input
              type="text"
              name="name"
              className="form-control rounded-pill shadow-sm"
              placeholder="Enter your full name"
              value={FormData.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-md-3">
            <h1 className="fs-5 mb-2" style={{ fontWeight: "500" }}>
              Country
            </h1>
            <input
              name="country"
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Enter your country"
              value={FormData.country}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-md-3">
            <h1 className="fs-5 mb-2" style={{ fontWeight: "500" }}>
              State
            </h1>
            <input
              name="state"
              value={FormData.state}
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Enter your state"
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div className="row justify-content-evenly mt-lg-4">
          <div className="col-md-3">
            <h1 className="fs-5 mb-2" style={{ fontWeight: "500" }}>
              City
            </h1>
            <input
              name="city"
              value={FormData.city}
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Enter your city"
              onChange={handleOnChange}
            />
          </div>
          <div className="col-md-3">
            <h1 className="fs-5 mb-2" style={{ fontWeight: "500" }}>
              Pin Code
            </h1>
            <input
              name="pincode"
              value={FormData.pincode}
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Enter your pin code"
              onChange={handleOnChange}
            />
          </div>
          <div className="col-md-3">
            <h1 className="fs-5 mb-2" style={{ fontWeight: "500" }}>
              Phone Number
            </h1>
            <input
              name="number"
              value={FormData.number}
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Enter your phone number"
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-11 mx-auto">
            <h1 className="fs-5 mb-2" style={{ fontWeight: "500" }}>
              Address Line / Nearby
            </h1>
            <input
              name="AddressLine"
              value={FormData.AddressLine}
              type="text"
              className="form-control rounded shadow-sm"
              style={{ width: "100%" }}
              placeholder="Enter nearby landmarks or address line"
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-4 mx-auto d-flex justify-content-center">
            <button
              className="btn btn-primary rounded-pill shadow-sm"
              style={{ width: "100%" }}
              onClick={handleOnSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4 mx-auto d-flex justify-content-center">
            <button
              className="btn btn-warning rounded-pill shadow-sm"
              style={{ width: "100%" }}
              onClick={handleOnClick}
            >
              Use Old Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
