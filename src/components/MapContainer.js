import React from 'react';
import GoogleApi from './GoogleApi';
import Map from './Map';

import './map.css';

export class MapContainer extends React.Component {
  render() {
    // if (!this.props.loaded) {
    //   return <div>Loading...</div>
    // }
    return (
      <div className='map-container'>
        <Map google={this.props.google}/>
      </div>
    )
  }
}

export default GoogleApi({
  apiKey: 'AIzaSyC3sxQV0IZuouZbMgHv5PYonvwcIHFR_Gc'
})(MapContainer)
