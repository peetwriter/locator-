import React from 'react';
import ReactDOM from 'react-dom';
import './map.css';

const evtNames = ['click', 'dragend', 'ready'];
import {camelize} from '../utils';

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
      this.recenterMap();
    }
  }

  componentDidMount(){
    if (this.props.centerAroundCurrentLocation) {
      console.log(navigator.geolocation);
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

        let options = {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        };

        let error = (err) => {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        let success = (pos) => {
          console.log('in Wathch!!!!');
          console.log(pos);
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude

            }
          })
        }

        let id = navigator.geolocation.watchPosition(success, error, options);
        console.log('navigator watch pos id:', id);
      }
    }
  }

  renderChildren() {
    const {children} = this.props;
    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    })

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
      });
      this.map = new maps.Map(node, mapConfig);
      evtNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, 'ready');
    }
  }

  handleEvent(evtName) {
    let timeout;
    const handlerName = `on${camelize(evtName)}`;

    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    };
  }

  render() {
    return (
      <div ref='map' className='map-container'>
        Loading map...
        {this.renderChildren()}
      </div>
    )
  }
}

Map.defaultProps = {
  zoom: 13,
  // Kiev, by default
  initialCenter: {
    lat: 80.4501,
    lng: 30.5234
  },
  onMove: function(){},
  centerAroundCurrentLocation: false
}

Map.propTypes = {
  onMove: React.PropTypes.func,
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool,
}
evtNames.forEach(e => Map.propTypes[camelize(e)] = React.PropTypes.func)

export default Map;
