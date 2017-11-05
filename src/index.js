import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import _ from 'lodash';

import Map from './components/MapContainer.js'
import logo from './logo.svg';
import { getCurrentPosition } from './utils';
import './App.css';

import './index.css';

class App extends Component {
  constructor (props) {
    super(props)
    const socket = io('/');
    this.state = {
      messages: [],
      myPosition: null,
      positions: [],
      socket: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevPositions = prevState.myPosition;
    const { myPosition, socket } = this.state;
    if (myPosition) {
      if (!prevPositions || prevPositions.lat !== myPosition.lat || prevPositions.lng !== myPosition.lng) {
        this.sendCoordinatesToOther(socket, {
          coordinates: myPosition
        });
      }
    }
  }

  componentDidMount () {
    const socket = io('/');
    this.setState({ socket });
    getCurrentPosition((coordinares) => {
      this.setState({ myPosition:
        {
          lat: coordinares.latitude,
          lng: coordinares.longitude,
        }
      });
    });

    socket.on('coordinatesChanged', ({ coordinates, from }) => {
      let { positions } = this.state;
      let userIndex = _.findIndex(positions, {from: from})
      if (userIndex == -1) {
        this.setState({ positions: positions.concat({coordinates, from}) });
      } else {
        positions[userIndex] = {coordinates, from};
        this.setState({ positions });
      }
    });
  }

  handleSend(){
    const { socket } = this.state;
    socket.emit('clientMessage', "Lal");
  }

  sendCoordinatesToOther( socket, coordinates ) {
    socket.emit('coordinates', coordinates);
  }



  render() {
    const { positions, myPosition } = this.state;
    let markers = positions.map(pos => pos.coordinates);
    if (myPosition) markers.push(myPosition);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Locate anyone on the page</h2>

        </div>
        <Map
          markers={markers}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
