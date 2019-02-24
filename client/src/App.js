import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <div className="Login" >
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
