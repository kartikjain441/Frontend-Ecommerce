import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function AdminNavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand btn btn-link text-light">Admin</Link>
          <form className="d-flex ms-3 me-auto">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-light d-none d-lg-block" type="submit">
              Search
            </button>
          </form>

          {/* Remove the nested collapse and keep only one */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <button className="btn blue me-2">Go To Home</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AddProduct" className="nav-link">
                  <button className="btn yellow me-2">Add Product</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <button className="btn grey me-2">All Orders</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/AllUsers" className="nav-link">
                  <button className="btn pink me-2">All Users</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
