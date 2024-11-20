import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://backend-ecommerce-m2ut.onrender.com/user/reset-password/${token}`,
        { newPassword }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.errors[0].msg);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="container mt-5" style={{ width: "100%", height: "100%" }}>
      <div className="card" style={{ width: "50%", height: "50%" }}>
        <div className="card-header text-center">
          <h4>Reset Password</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
