import React, { Component } from "react";
import { likeMovies, dislikeMovies } from "../services/fakeMovies";
import "../movies.css";
import Pagination from "./extra/pagination";
import List from "./extra/list";
import { getGenres } from "../services/genreServices";
import { getMovies, deleteMovie } from "../services/movieServices";
import Table from "./table";
import { sort } from "./extra/sorting";
import { Link } from "react-router-dom";
import Input from "./input";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All",
    order: "acs",
    search: "",
  };

  async componentDidMount() {
    const genres = await getGenres();
    const movies = await getMovies();
    this.setState({ genres, movies });
  }

  render() {
    let showArray = this.listOfGenre();
    showArray = this.search(showArray);
    let numOfMovies = showArray.length;
    showArray = this.changeContent(showArray);
    return (
      <React.Fragment>
        <List
          genre={this.state.genres}
          genreChange={this.genreChange}
          currentGenre={this.state.currentGenre}
        />
        {this.props.user && (
          <Link className="btn btn-primary m-2" to="/movie/new">
            New Movie
          </Link>
        )}
        <h1>Showing {numOfMovies} movies</h1>
        <Input
          name="search"
          onChange={this.handleChange}
          value={this.state.search}
        />

        <Table
          movies={showArray}
          handleDeletion={this.handleDeletion}
          likeIt={this.likeIt}
          dislikeIt={this.dislikeIt}
          onSort={this.onSort}
          user={this.props.user}
        />
        <Pagination
          numOfMovies={numOfMovies}
          pageSize={this.state.pageSize}
          changePage={this.changePage}
          currentPage={this.state.currentPage}
        />
      </React.Fragment>
    );
  }

  handleChange = ({ target }) => {
    const search = target.value;
    this.setState({ search, currentGenre: "All" });
  };

  search = (movies) => {
    const result = this.state.search.toLowerCase();
    return movies.filter((movie) => movie.title.toLowerCase().includes(result));
  };

  onSort = (tag, type) => {
    let sortedArr = sort[type](this.state.movies, tag, this.state.order);
    this.setState({
      movies: sortedArr,
      order: this.state.order === "acs" ? "des" : "acs",
    });
  };

  changePage = (num) => {
    this.setState({ currentPage: num });
  };

  genreChange = (genre) => {
    this.setState({
      currentGenre: genre,
      currentPage: 1,
      search: "",
    });
  };

  changeContent = (movies) => {
    let { pageSize, currentPage } = this.state;
    let limit = (currentPage - 1) * pageSize;
    let newArr = movies.filter((element, index) => {
      return index >= limit && index < limit + pageSize;
    });
    return newArr;
  };

  listOfGenre = () => {
    let { currentGenre, movies } = this.state;
    if (currentGenre === "All") return movies;
    let newArr = movies.filter((element) => {
      return element.genre.name === currentGenre;
    });
    return newArr;
  };

  handleDeletion = async (movie) => {
    await deleteMovie(movie._id);
    this.setState({
      movies: await getMovies(),
    });
  };

  likeIt = (movie) => {
    likeMovies(movie);
    this.setState({
      movies: getMovies(),
    });
  };

  dislikeIt = (movie) => {
    dislikeMovies(movie);
    this.setState({
      movies: getMovies(),
    });
  };
}

export default Movies;
