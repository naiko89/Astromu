import React from 'react';
import ReactMapGL, {GeolocateControl, FullscreenControl, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const $ = require('jquery');


class MainMapAddress extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            mapToken: 'pk.eyJ1IjoibmljbzI0IiwiYSI6ImNsOHk1dG52ZzBieDczcG51ZWpxZHo1ZWwifQ.hlA3__b68_lRYDWm7_75Ng',
            initialView: {longitude: 12.31349, latitude: 45.95080, zoom: 15}
        }
    }


    handleChange(event){
        //console.log(event.target.value)
        this.setState({valueInputOne: event.target.value})
    }

    handleSubmit(event){}

    render(){




        return(
            <>
                <ReactMapGL
                    initialViewState={ this.state.initialView }
                    mapboxAccessToken={ this.state.mapToken }
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    id="map-box"
                >
                    <GeolocateControl></GeolocateControl>
                    <FullscreenControl></FullscreenControl>
                    <NavigationControl></NavigationControl>
                </ReactMapGL>
            </>
    )}
}

export default MainMapAddress