import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, onChange, items, errors, value } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{name}</label>
        <select
          id={name}
          name={name}
          onChange={onChange}
          className="form-control"
          value={value}
        >
          <option value=""></option>
          {items.map((item) => (
            <option value={item.name} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors && <div className="alert alert-danger">{errors}</div>}
      </div>
    );
  }
}

export default Select;
