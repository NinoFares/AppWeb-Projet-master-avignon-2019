import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Router, Route} from 'react-router-dom'

import { history } from '../_helpers';
import { Home } from '../components/Home'
import { Login } from '../components/Login';
import { PrivateRoute } from "../components/Routes";

class App extends Component {

    constructor(props){
        super(props)

        const { dispatch } = this.props;

    }

  render() {
        const { alert } = this.props;
      return (
          <div className="jumbotron">
              <div className="container">
                  <header className="App-header">
                      <h1>Gestion de conférence</h1>
                      <div>
                          {alert.message &&
                          <div
                              className={`alert ${alert.type}`}
                          >
                              {alert.message}
                          </div>
                          }
                          <Router history={history}>
                              <div>
                                  <PrivateRoute
                                    exact
                                    path="/"
                                    component={Home}
                                  />
                                  <Route
                                  path="/login" component={Login}
                                  />
                              </div>
                          </Router>
                      </div>
                  </header>
              </div>
          </div>
      );
  }
}

function mapStateToProps(state){
    const { alert } = state;
    return{
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};