import React from 'react';
import ReactDOM from 'react-dom';
import './map.css';

export class Map extends React.Component {
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  componentDidMount(){
    console.log('didmiuont');
    if (true || this.props.centerAroundCurrentLocation) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log("position: ", pos);
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude

                    }
                })
            })
        }
    }
  }

  recenterMap(){
    const map = this.map;
    const { lat, lng } = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
        let center = new maps.LatLng(lat, lng)
        map.panTo(center)
    }
  }

  loadMap(){
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
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
  // Kiev, by default
  initialCenter: {
    lat: 50.4501,
    lng: 30.5234
  },
  centerAroundCurrentLocation: false
}

Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool
}

export default Map;
