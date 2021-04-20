import Joi from "joi-browser";
import React, { Component } from "react";
import { registerUser } from "../services/register";
import Input from "./input";

class Register extends Component {
  state = {
    account: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    password: Joi.string().min(5).required(),
    username: Joi.string().email().required(),
    name: Joi.string().required(),
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (typeof error === "Object") {
      console.log("Hello");
    } else {
      try {
        let user = { ...this.state.account };
        user.email = user.username;
        delete user.username;
        console.log(user);
        let response = await registerUser(user);
        localStorage.setItem("token", response.headers["x-auth-token"]);
        window.location = "/";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          alert("User already there");
        }
      }
    }
  };

  validate = (e) => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    const errors = {};
    if (result.error)
      for (let error of result.error.details) {
        errors[error.path[0]] = error.message;
      }
    return Object.keys(errors).length === 0 ? true : errors;
  };

  handleChange = ({ currentTarget }) => {
    const account = { ...this.state.account };
    account[currentTarget.name] = currentTarget.value;
    this.setState({ account });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={this.state.account.username}
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            errors={this.state.errors.username}
          />
          <Input
            value={this.state.account.password}
            name="password"
            type="password"
            value={this.state.username}
            onChange={this.handleChange}
            errors={this.state.errors.password}
          />
          <Input
            value={this.state.account.name}
            name="name"
            value={this.state.username}
            onChange={this.handleChange}
            errors={this.state.errors.name}
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
