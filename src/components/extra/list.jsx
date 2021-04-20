import React, { Component } from "react";
class List extends Component {
  render() {
    const { genre, genreChange, currentGenre } = this.props;
    return (
      <ul className="list-group m-2">
        <li
          className="list-group-item"
          onClick={() => {
            genreChange("All");
          }}
        >
          All genres
        </li>
        {genre.map((element) => {
          let className = "list-group-item";
          className += element.name === currentGenre ? " active" : "";
          return (
            <li
              key={element.name}
              className={className}
              onClick={() => {
                genreChange(element.name);
              }}
            >
              {element.name}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default List;
