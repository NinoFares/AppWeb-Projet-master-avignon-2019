/**
 * Fichier de lancement du projet
 */

import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Router, Route} from 'react-router-dom'

import { history } from '../_helpers';
import { HomeAdmin, HomeUser} from '../components/Home'
import { Login } from '../components/Login';
import { Register } from '../components/Register'
import { PrivateRoute } from "../components/Routes";
import { alertActions } from "../_actions";
import withAuth from "../Auth"


/**
 * Redux a été ajouté au projet et utilisé pour le login mais il peut etre supprimé
 */

class App extends Component {

    constructor(props){
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
             // clear alert on location change
             dispatch(alertActions.clear());
         });

    }

  render() {
        const { alert } = this.props;
      return (
          <Router history={history}>
              <div>
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
                                      <PrivateRoute exact
                                          path="/" component={HomeUser}
                                      />
                                      <Route
                                            path="/login" component={Login}
                                      />
                                  </div>
                              </header>
                          </div>
                      </div>
                  <div className="container">
                      <Route
                          path="/register" component={Register}
                      />
                      <Route
                          path="/HomeAdmin" component={withAuth(HomeAdmin)}
                      />
                      <Route
                          path="/HomeUser" component={withAuth(HomeUser)}
                      />
                  </div>
              </div>
          </Router>
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