import React from 'react';
const evtNames = ['click', 'mouseover'];
import {camelize} from '../utils';

export default class Marker extends React.Component {

  shouldComponentUpdate(nextProps) {
    if ((this.props.map !== nextProps.map) ||
      (this.props.position !== nextProps.position)) {
        return true;
    }
    return false;
  }

  renderMarker() {
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);
    const pref = {
      map: map,
      position: position
    };
    this.marker = new google.maps.Marker(pref);
    evtNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e));
    });
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
    this.renderMarker();
    return null;
  }
}

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}
