import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
            <div>
            <h1>lol</h1>   
      <LeafletMap >
        
        
      </LeafletMap>
      </div>
    );
  }
}

export default Maps;
