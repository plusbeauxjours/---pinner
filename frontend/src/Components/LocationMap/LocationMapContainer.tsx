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
      zoom: 13,
      styles:
        localStorage.getItem("isDarkMode") === "true"
          ? [
              {
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#444444"
                  }
                ]
              },
              {
                featureType: "landscape",
                elementType: "all",
                stylers: [
                  {
                    color: "#f2f2f2"
                  }
                ]
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "road",
                elementType: "all",
                stylers: [
                  {
                    saturation: -100
                  },
                  {
                    lightness: 45
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "all",
                stylers: [
                  {
                    visibility: "simplified"
                  }
                ]
              },
              {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: [
                  {
                    color: "#425a68"
                  },
                  {
                    visibility: "on"
                  }
                ]
              }
            ]
          : [
              {
                featureType: "all",
                stylers: [
                  {
                    saturation: 0
                  },
                  {
                    hue: "#e7ecf0"
                  }
                ]
              },
              {
                featureType: "road",
                stylers: [
                  {
                    saturation: -70
                  }
                ]
              },
              {
                featureType: "transit",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "poi",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "water",
                stylers: [
                  {
                    visibility: "simplified"
                  },
                  {
                    saturation: -60
                  }
                ]
              }
            ]
    };
    this.map = new maps.Map(mapNode, mapConfig);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };
  public handleGeoWatchSuccess = () => {
    const { latitude, longitude } = this.props;
    this.map.panTo({ lat: latitude, lng: longitude });
  };
  public handleGeoWatchError = () => {
    console.log("Error watching you");
  };
}

export default withRouter(LocationMapContainer);
