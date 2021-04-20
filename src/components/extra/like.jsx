import React, { Component } from "react";
import "font-awesome/css/font-awesome.css";

class Like extends Component {
  render() {
    return <React.Fragment>{this.determineHeart()}</React.Fragment>;
  }

  determineHeart() {
    if (!this.props.movie.liked)
      return (
        <i
          className="fa fa-heart-o"
          aria-hidden="true"
          onClick={() => {
            this.props.likeIt(this.props.movie._id);
          }}
        ></i>
      );
    return (
      <i
        className="fa fa-heart"
        aria-hidden="true"
        onClick={() => {
          this.props.dislikeIt(this.props.movie._id);
        }}
      ></i>
    );
  }
}

export default Like;
