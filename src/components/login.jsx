import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import { logInUser } from "../services/register";

class Login extends Component {
  userName = React.createRef();
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    let user = { ...this.state.account };
    try {
      let { data } = await logInUser(user.username, user.password);
      localStorage.setItem("token", data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        alert(ex.response.data);
      }
    }
  };

  validate() {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let error of result.error.details) {
      errors[error.path[0]] = error.message;
    }
    return Object.keys(errors) === 0 ? {} : errors;
  }

  validateInput = (input) => {
    if (input.name === "username")
      if (input.value === "") return "Username is required";

    if (input.name === "password")
      if (input.value === "") return "Password is required";
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const { name, value } = e.currentTarget;
    const errorMsg = this.validateInput(e.currentTarget);
    if (errorMsg) {
      errors[name] = errorMsg;
    } else delete errors[name];
    const account = { ...this.state.account };
    account[name] = value;
    this.setState({
      account,
      errors,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            id="username"
            value={this.state.account.username}
            onChange={this.handleChange}
            name="username"
            errors={
              this.state.errors === null ? "" : this.state.errors.username
            }
          />

          <Input
            id="password"
            value={this.state.account.password}
            onChange={this.handleChange}
            name="password"
            type="password"
            errors={
              this.state.errors === null ? "" : this.state.errors.password
            }
          />

          <button className="btn btn-primary" disabled={this.validate()}>
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
