import React, { Component } from "react";

class Movie extends Component {
  render() {
    const obj = this.props.match.params.id;
    return (
      <React.Fragment>
        <h1>Movie {obj}</h1>
        <button className="btn-danger" onClick={this.handleClick}>
          Save
        </button>
      </React.Fragment>
    );
  }

  handleClick = () => {
    this.props.history.replace("/movies");
  };
}

export default Movie;
