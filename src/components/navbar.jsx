import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    console.log(this.props.user);
    return (
      <nav className="navbar navbar-light bg-light m-2">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/movies">
            Movies
          </NavLink>
          <NavLink className="navbar-brand" to="/customers">
            Customers
          </NavLink>
          <NavLink className="navbar-brand" to="/rentals">
            Rentals
          </NavLink>
          {this.determineUser()}
        </div>
      </nav>
    );
  }

  determineUser() {
    return !this.props.user ? (
      <React.Fragment>
        <NavLink className="navbar-brand" to="/login">
          Log in
        </NavLink>
        <NavLink className="navbar-brand" to="/register">
          Register
        </NavLink>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <NavLink className="navbar-brand" to="/profile">
          {this.props.user.name}
        </NavLink>
        <NavLink className="navbar-brand" to="/logout">
          Log out
        </NavLink>
      </React.Fragment>
    );
  }
}

export default NavBar;
