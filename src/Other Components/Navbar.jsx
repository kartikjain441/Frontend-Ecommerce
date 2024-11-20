import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../Context";
import { toast } from "react-toastify";
import "../App.css";

const Navbar = () => {
  let { isAuthenticate, setIsAuthenticate, userCart } = useContext(AppContext);

  function HandleLogout() {
    localStorage.removeItem("Auth");
    setIsAuthenticate(false);
    toast.success("Logout Successful");
  }

  const badgeClass = userCart?.length > 0 ? "bg-danger" : "d-none";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand btn btn-link text-light d-none d-sm-block   "
        >
          Parshva Collection
        </Link>

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

        {!isAuthenticate ? (
          <form className="d-flex ms-3 me-auto ">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "270px" }}
            />
            <button className="btn btn-light d-none d-lg-block" type="submit">
              Search
            </button>
          </form>
        ) : (
          <form className="d-flex ms-3 me-auto">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-light d-none d-lg-block" type="submit">
              Search
            </button>
          </form>
        )}

        {isAuthenticate && (
          <li className="nav-item mt-3 mt-lg-0 d-block d-lg-none mb-2">
            <Link
              to="/cart"
              type="button"
              className="btn btn-primary position-relative "
            >
              <i className="bi bi-cart"></i>{" "}
              <span className="material-symbols-outlined">shopping_cart</span>
              <span
                className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${badgeClass}`}
              >
                {userCart?.length > 0 ? userCart.length : ""}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
          </li>
        )}

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex flex-column flex-lg-row align-items-center ms-auto">
            {!isAuthenticate ? (
              <>
                <li className="nav-item mt-3 mt-lg-0  d-block d-md-none">
                  <Link to="/" className="nav-link">
                    <button className="btn btn-success">Home</button>
                  </Link>
                </li>
                <li className="nav-item mt-3 mt-lg-0">
                  <Link to="/Login" className="nav-link">
                    <button className="btn btn-primary">Login</button>
                  </Link>
                </li>
                <li className="nav-item mt-3 mt-lg-0">
                  <Link to="/Register" className="nav-link">
                    <button className="btn btn-secondary">Register</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mt-3 mt-lg-0 d-none d-lg-block">
                  <Link
                    to="/cart"
                    type="button"
                    className="btn btn-primary position-relative mx-3"
                  >
                    <i className="bi bi-cart"></i>{" "}
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                    <span
                      className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${badgeClass}`}
                    >
                      {userCart?.length > 0 ? userCart.length : ""}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item mt-3 mt-lg-0  d-block d-md-none">
                  <Link to="/" className="nav-link">
                    <button className="btn btn-primary">Home</button>
                  </Link>
                </li>

                <li className="nav-item mt-3 mt-lg-0">
                  <button className="btn btn-warning">Profile</button>
                </li>
                <li className="nav-item mt-3 mt-lg-0">
                  <Link to="/admin" className="nav-link">
                    <button className="btn btn-success">Admin</button>
                  </Link>
                </li>
                <li className="nav-item mt-3 mt-lg-0">
                  <button onClick={HandleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
