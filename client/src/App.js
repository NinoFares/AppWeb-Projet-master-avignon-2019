import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Gestion de conférence</h1>
        </header>
          <Login />
      </div>
    );
  }
}

export default App;
