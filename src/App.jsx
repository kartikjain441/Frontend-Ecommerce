import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Other Components/Navbar";
import ShowProduct from "./Product Components/ShowProduct";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Register from "./User Components/Register";
import Login from "./User Components/Login";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./Product Components/ProductDetail";
import Cart from "./Other Components/Cart";
import ShowProductAdmin from "./Product Components/ShowProductAdmin";
import AddProduct from "./Product Components/AddProduct";
import AdminNavbar from "./Product Components/AdminNavbar";
import EditProduct from "./Product Components/EditProduct";
import AllUsers from "./Product Components/AllUsers";
import Address from "./Other Components/Address";
import Checkout from "./Other Components/Checkout";
import OrderConfirmation from "./Other Components/OrderConfirmation";
import ForgetPassword from "./User Components/ForgetPassword";
import ResetPassword from "./User Components/ResetPassword";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/admin" ||
      location.pathname === "/AddProduct" ||
      location.pathname === "/admin/edit" ||
      location.pathname === "/admin/AllUsers" ? (
        <AdminNavbar></AdminNavbar>
      ) : (
        <Navbar></Navbar>
      )}
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<ShowProductAdmin />} />
        <Route path="/AddProduct" element={<AddProduct></AddProduct>}></Route>
        <Route path="/admin/edit" element={<EditProduct></EditProduct>}></Route>
        <Route path="/admin/AllUsers" element={<AllUsers></AllUsers>}></Route>
        <Route path="/address" element={<Address></Address>}></Route>
        <Route path="/checkout" element={<Checkout></Checkout>}></Route>
        <Route
          path="/forget-password"
          element={<ForgetPassword></ForgetPassword>}
        ></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPassword></ResetPassword>}
        ></Route>

        <Route
          path="/orderConfimation"
          element={<OrderConfirmation></OrderConfirmation>}
        ></Route>
      </Routes>
      <ToastContainer
        style={{
          width: window.innerWidth <= 576 && "50%",
        }}
      />
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
