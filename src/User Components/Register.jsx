import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://backend-ecommerce-m2ut.onrender.com/api/user/register",
        formData
      );

      if (res.data.success) {
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );

        navigate("/login");
      } else {
        toast.error(res.data.errors[0].msg || res.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row ">
        <div className="col-md-6">
          <div
            className="card"
            style={{
              width: window.innerWidth <= 576 ? "300px" : "500px",
            }}
          >
            <div className="card-header text-center">
              <h4>Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleOnSubmit}>
                {/* Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    onChange={handleOnChange}
                  />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    onChange={handleOnChange}
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    value={formData.password}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleOnChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
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

export default Register;
