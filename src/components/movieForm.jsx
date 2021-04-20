import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import { getGenres } from "../services/genreServices";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieServices";

class MovieForm extends Component {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    let movie = await getMovie(id);
    const genres = await getGenres();
    if (movie) {
      const { title, genre, numberInStock, dailyRentalRate } = movie;
      let data = {
        title: title,
        genre: genre.name,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate,
      };
      this.setState({ data, genres });
    } else this.setState({ genres });
  };

  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(10),
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const newMovie = { ...this.state.data };
      let newGenre = this.state.genres.find(
        (e) => e.name === this.state.data.genre
      );
      delete newMovie.genre;

      newMovie.genreId = newGenre._id;
      saveMovie(newMovie);
      console.log(newMovie);
      this.props.history.replace("/movies");
    }
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    const errors = {};
    if (result.error !== null)
      for (let error of result.error.details) {
        errors[error.path[0]] = error.message;
      }
    return errors;
  };

  handleChange = ({ currentTarget }) => {
    let data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={this.state.data.title}
            name="title"
            onChange={this.handleChange}
            errors={this.state.errors.title}
          />
          <Select
            name="genre"
            onChange={this.handleChange}
            items={this.state.genres}
            errors={this.state.errors.genre}
            value={this.state.data.genre}
          />
          <Input
            value={this.state.data.numberInStock}
            name="numberInStock"
            onChange={this.handleChange}
            errors={this.state.errors.numberInStock}
          />
          <Input
            value={this.state.data.dailyRentalRate}
            name="dailyRentalRate"
            onChange={this.handleChange}
            errors={this.state.errors.dailyRentalRate}
          />
          <button className="btn btn-primary">Save</button>
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
