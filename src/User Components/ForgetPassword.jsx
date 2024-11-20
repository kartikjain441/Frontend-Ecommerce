import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../App.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend-ecommerce-m2ut.onrender.com/user/forget-password",
        { email }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send reset link");
    }      
  };

  return (
    <div className="container mt-5" style={{width:"100%" , height:"100%"}} >
      <div className="card"  style={{width:"50%" ,height:"100%"}}>
        <div className="card-header text-center">
          <h4>Forget Password</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleForgetPassword}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
