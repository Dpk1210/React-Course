import React, { Component } from "react";
//import { ToastContainer } from "react-toastify";
//import http from "./services/httpService";
//import config from "./config.json";
import jwtDecode from "jwt-decode";
import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from "./components/movie";
//import Counter from "./components/counter";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from "./components/logout";
import auth from "../src/services/authService";
import "react-toastify/dist/ReactToastify.css"
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {

    const user = auth.getCurrentUser();
    this.setState({ user });

    // try {
    //   const jwt = localStorage.getItem("token");
    //   const user = jwtDecode(jwt);
    //   this.setState({ user });


    // } catch (er) { }

    //console.log(user);
  }

  render() {
    const { user } = this.state;
    //console.log(user);

    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/movies" render={props => <Movies {...props} user={this.state.user} />} />
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/login-form" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register-form" component={RegisterForm}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found" />
          </Switch>


          {/* <div className="App">
          <header className="header p-3 fixed-top">
            <img src={logo} className="App-logo py-2" alt="logo" />
            <button className="d-inline-block float-right btn btn-danger">Login</button>
          </header>
          <div className="mb-5 pt-5"></div>
        </div>

        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <Movies />
            <Counter />
          </div>
          <div className="col-3"></div>
        </div> */}
        </main >
      </React.Fragment >
    );
  }
}

export default App;
