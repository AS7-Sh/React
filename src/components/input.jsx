import React, { Component } from "react";

class Input extends Component {
  render() {
    const { name, value, onChange, errors, type = "text" } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          type={type}
          className="form-control"
          value={value}
          onChange={onChange}
          name={name}
        />
        {errors && <div className="alert alert-danger">{errors}</div>}
      </div>
    );
  }
}

export default Input;
