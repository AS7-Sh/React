import React, { Component } from "react";
class Pagination extends Component {
  render() {
    let pages = this.makeTheArray();
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((element) => {
            return (
              <li
                className={
                  this.props.currentPage === element
                    ? "page-item active"
                    : "page-item"
                }
                key={element}
                onClick={() => {
                  this.props.changePage(element);
                }}
              >
                <a className="page-link">{element}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  makeTheArray() {
    let list = [];
    let { numOfMovies, pageSize } = this.props;
    let pageCount = numOfMovies / pageSize;
    for (let i = 0; i < pageCount; i++) {
      list.push(i + 1);
    }
    if (list.length === 1) list.shift();
    return list;
  }
}

export default Pagination;
