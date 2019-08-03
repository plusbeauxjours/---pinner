import React from "react";
import LocationMapPresenter from "./LocationMapPresenter";
import ReactDOM from "react-dom";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IState {
  latitude: number;
  longitude: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
  latitude: number;
  longitude: number;
}

class LocationMapContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    const { latitude, longitude } = this.props;
    this.loadMap(latitude, longitude);
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityId !== newProps.match.params.cityId) {
      const { latitude, longitude } = this.props;
      this.loadMap(latitude, longitude);
    }
  }
  public render() {
    return <LocationMapPresenter mapRef={this.mapRef} />;
  }
  public loadMap = async (lat, lng) => {
    const { google } = this.props;
    const maps = await google.maps;
    const mapNode = await ReactDOM.findDOMNode(this.mapRef.current);
    if (!mapNode) {
      this.loadMap(lat, lng);
      return;
    }
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 13
    };
    this.map = new maps.Map(mapNode, mapConfig);
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat,
        lng
      }
    };
    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };
  public handleGeoWatchSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.userMarker.setPosition({ lat: latitude, lng: longitude });
    this.map.panTo({ lat: latitude, lng: longitude });
  };
  public handleGeoWatchError = () => {
    console.log("Error watching you");
  };
}

export default withRouter(LocationMapContainer);
