import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../sheroes-logo.png";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="App-logo py-2" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <NavLink className="nav-item nav-link" to="/movies">
              Feed
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
            {!user && (
              <React.Fragment>
                <NavLink
                  className="nav-item nav-link float-right"
                  to="/login-form"
                >
                  Login
                </NavLink>
                <NavLink
                  className="nav-item nav-link float-right"
                  to="/register-form"
                >
                  Register
                </NavLink>
              </React.Fragment>
            )}

            {user && (
              <React.Fragment>
                <NavLink
                  className="nav-item nav-link float-right"
                  to="/login-form"
                >
                  <span
                    className="float-left border mr-3 bg-info rounded-circle"
                    style={{
                      width: "30px",
                      height: "30px"
                    }}
                  />
                  {user.name}
                </NavLink>
                <NavLink className="nav-item nav-link float-right" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
      {/*container*/}
    </nav>
  );
};

export default NavBar;
