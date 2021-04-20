import React, { Component } from "react";

class Counter extends Component {
  state = {
    counter: 0,
  };

  handleClick = (param) => {
    this.setState({
      counter: this.state.counter + 1,
    });
    console.log(param);
  };

  render() {
    return (
      <React.Fragment>
        <span className={this.determineClasses()}>{this.determineText()}</span>
        <button
          onClick={() => {
            this.handleClick(5);
          }}
          className="btn-secondary btn-sm"
        >
          Increament
        </button>
      </React.Fragment>
    );
  }

  generateLists() {
    let arr = this.state.tags.map((element) => (
      <li key={element}>{element}</li>
    ));
    return !arr.length ? "Sorry No Elements" : arr;
  }

  determineClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.counter === 0 ? "warning" : "primary";
    return classes;
  }

  determineText() {
    return this.state.counter === 0 ? "Zero" : this.state.counter;
  }
}

export default Counter;
