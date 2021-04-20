import './App.css';
import Movies from './components/movies';
import NavBar from './components/navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NotFound from './components/notFound';
import Login from './components/login';
import jwtDecode from 'jwt-decode';
import Register from './components/register';
import MovieForm from './components/movieForm';
import { Component } from 'react';
import Logout from './components/logout';

class App extends Component {
  state = {

  }

  componentDidMount() {
    try {
      let user = jwtDecode(localStorage.getItem('token'));
      this.setState({ user });
    }
    catch (ex) { }
  }

  protectingRoute(path) {
    return <Route path={path} render={props => {
      if (!this.state.user) return <Redirect to={{
        pathname: "/login",
        state: {
          location: props.location.pathname
        }
      }} />
      return <MovieForm {...props} />
    }} />
  }

  render() {
    return (
      <main className="container">
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/logout" component={Logout} />
          {this.protectingRoute("/movie/new")}
          <Route path="/rentals" component={Rentals} />
          <Route path="/login" render={(props) => {
            if (this.state.user) return <Redirect to="/" />
            return <Login {...props} />
          }} />
          <Route path="/register" component={Register} />
          <Route path="/customers" component={Customers} />
          {this.protectingRoute("/movies/:id")}
          <Route path="/movies" render={(props) => <Movies user={this.state.user} {...props} />} />
          <Redirect from="/" exact to="/movies" />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </main>
    );
  }
}

export default App;
