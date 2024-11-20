import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

function AllUsers() {
  const [AllUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const res = await axios.get(
        "https://backend-ecommerce-m2ut.onrender.com/api/user/all"
      );
      setAllUsers(res.data);
    }
    getUsers();
  }, []);

  return (
    <>
      <div className="container2 mt-3">
        <button type="button" className="btn btn-warning mb-3">
          Total Users: {AllUsers.length}
        </button>
        {AllUsers?.map((user) => {
          return (
            <div
              key={user._id}
              className="cart2 p-3 mb-3 shadow-sm border rounded bg-secondary text-center"
            >
              <h4 className="text-info mb-2">{user.name}</h4>
              <h5 className="text-light mb-2">{user.email}</h5>{" "}
              <h6 className="text-warning">
                {new Date(user.createdAt).toLocaleDateString()}
              </h6>{" "}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllUsers;
