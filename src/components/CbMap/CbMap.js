import React from 'react';
import PropTypes from 'prop-types';

import { Map, Marker, InfoWindow } from 'google-maps-react';

const defaults = {
	center: {
		lat: 44.796437,
		lng: 20.378094,
	},
	zoom: 11,
};

class CbMap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {},
		};
	}

	onMarkerClick (props, marker, e) {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});
	}

	onMapClicked (props) {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	}

	render () {
		const markerElements = [];
		if (this.props && this.props.markers && this.props.markers.length) {
			this.props.markers.forEach((marker, index) => {
				markerElements.push((
					<Marker key={index}
					        name={marker.name}
					        position={{lat: marker.lat, lng: marker.lng}}
					        onClick={this.onMarkerClick.bind(this)}
					/>
				));
			});
		}

		/*let infoWindowElement;
		if (this.state.selectedPlace && this.state.selectedPlace.position) {
			infoWindowElement = (
				<InfoWindow
					marker={this.state.activeMarker}
					visible={this.state.showingInfoWindow}>
					<div>
						<h2>{this.state.selectedPlace.name}</h2>
						<p>
							Latitude: {this.state.selectedPlace.position.lat}
							<br />
							Longitude: {this.state.selectedPlace.position.lng}
						</p>
					</div>
				</InfoWindow>
			);
		}*/

		return (
			<Map google={window.google} style={{width: '100%', height: '100%', position: 'relative'}}
			     zoom={defaults.zoom}
			     center={{lat: defaults.center.lat, lng: defaults.center.lng}}
			     onClick={this.onMapClicked.bind(this)}
			>
				{markerElements}

			</Map>
		);
	}
}

CbMap.propTypes = {
	markers: PropTypes.array,
};

export default CbMap;

