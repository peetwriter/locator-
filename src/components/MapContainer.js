import React from 'react';
import GoogleApi from './GoogleApi';
import Map from './Map';
import Marker from './Marker';

import './map.css';

export class MapContainer extends React.Component {
  mapMoveHandler(){
    console.log('map is moved');
  }

  render() {
    const { markers } = this.props;
    return (
      <div className='map-container'>
        <Map
          google={this.props.google}
          onMove={this.mapMoveHandler.bind(this)}
          centerAroundCurrentLocation
        >
          {
            markers.map( marker  =>
              <Marker
                key={marker.lat + marker.lng}
                position={marker}
              />
            )
          }
        </Map>
      </div>
    )
  }
}

export default GoogleApi({
  apiKey: 'AIzaSyC3sxQV0IZuouZbMgHv5PYonvwcIHFR_Gc'
})(MapContainer)
