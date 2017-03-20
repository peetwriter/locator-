import React, { Component } from 'react';

import Map from './components/MapContainer.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to locator</h2>
        </div>
        <Map/>
      </div>
    );
  }
}

export default App;
