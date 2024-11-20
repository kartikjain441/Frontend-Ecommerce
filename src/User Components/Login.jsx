import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AppContext from "../Context";
import { toast } from "react-toastify";
import "../App.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  let { setIsAuthenticate } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        formData
      );

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("Auth", res.data.token);
        setIsAuthenticate(true);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid Email or Password");
    }
  }

  useEffect(() => {
    const message = new URLSearchParams(location.search).get("message");
    if (message) {
      toast.success(message);
    }
  }, [location]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 ">
          <div
            className="card"
            style={{
              width: window.innerWidth <= 576 ? "300px" : "500px",
            }}
          >
            <div className="card-header text-center">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleOnSubmit}>
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

                {/* Forgot Password Link */}
                <div className="text-end">
                  <Link to="/forget-password" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>

                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-primary">
                    Login
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

export default Login;
