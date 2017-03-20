import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Map from './components/MapContainer.js'
import logo from './logo.svg';
import './App.css';

import './index.css';

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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// export default App;
