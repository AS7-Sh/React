import React, { Component } from "react";
import Like from "./extra/like";
import { Link } from "react-router-dom";

class Table extends Component {
  render() {
    console.log(this.props.user);
    const { movies, likeIt, dislikeIt, handleDeletion, onSort } = this.props;
    if (movies.length === 0) {
      return <h3>Sorry No Movies</h3>;
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th
                onClick={() => {
                  onSort("title", "text");
                }}
              >
                Title
              </th>
              <th
                onClick={() => {
                  onSort("genre", "text");
                }}
              >
                Genre
              </th>
              <th
                onClick={() => {
                  onSort("numberInStock", "numeric");
                }}
              >
                Stock
              </th>
              <th
                onClick={() => {
                  onSort("dailyRentalRate", "numeric");
                }}
              >
                Rate
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((element, index) => {
              return (
                <tr key={element.title}>
                  <td>
                    <Link to={`/movies/${element._id}`}>{element.title}</Link>
                  </td>
                  <td>{element.genre.name}</td>
                  <td>{element.numberInStock}</td>
                  <td>{element.dailyRentalRate}</td>
                  <td>
                    <Like
                      movie={element}
                      likeIt={likeIt}
                      dislikeIt={dislikeIt}
                    />
                  </td>
                  <td>
                    {this.props.user && this.props.user.isAdmin && (
                      <button
                        onClick={() => {
                          handleDeletion(element);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
}

export default Table;
