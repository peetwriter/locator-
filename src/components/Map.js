import React from 'react';
import ReactDOM from 'react-dom';
import './map.css';

export class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap(){
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const center = new maps.LatLng(this.props.initialCenter);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: this.props.zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    return (
      <div ref='map' className='map-container'>
        Loading map...
      </div>
    )
  }
}

Map.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 50.4501,
    lng: 30.5234
  }
}

Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object
}

export default Map;
