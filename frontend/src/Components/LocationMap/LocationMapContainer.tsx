import React from "react";
import LocationMapPresenter from "./LocationMapPresenter";
import ReactDOM from "react-dom";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {
  google: any;
  latitude: number;
  longitude: number;
  modal: boolean;
  type: string;
}

class LocationMapContainer extends React.Component<IProps> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    const { latitude, longitude, type } = this.props;
    this.loadMap(latitude, longitude, type);
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityId !== newProps.match.params.cityId) {
      const { latitude, longitude, type } = this.props;
      this.loadMap(latitude, longitude, type);
    }
  }
  public render() {
    const { modal } = this.props;
    return <LocationMapPresenter modal={modal} mapRef={this.mapRef} />;
  }

  public loadMap = async (lat: number, lng: number, type: string) => {
    const { google } = this.props;
    const maps = await google.maps;
    const mapNode = await ReactDOM.findDOMNode(this.mapRef.current);
    if (!mapNode) {
      this.loadMap(lat, lng, type);
      return;
    }
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: type === "country" ? 5 : 13,
      styles:
        localStorage.getItem("isDarkMode") === "true"
          ? [
              {
                featureType: "all",
                elementType: "geometry",
                stylers: [
                  {
                    saturation: 0
                  },
                  {
                    lightness: 0
                  },
                  {
                    visibility: "on"
                  },
                  {
                    gamma: 1
                  }
                ]
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    saturation: 36
                  },
                  {
                    color: "#e0e9f2"
                  },
                  {
                    lightness: 40
                  }
                ]
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    visibility: "off"
                  },
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 0
                  }
                ]
              },
              {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "administrative",
                elementType: "labels.text",
                stylers: [
                  {
                    visibility: "simplified"
                  },
                  {
                    saturation: -100
                  },
                  {
                    lightness: -43
                  }
                ]
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#5a5858"
                  },
                  {
                    lightness: 0
                  },
                  {
                    visibility: "on"
                  },
                  {
                    weight: 1.0
                  },
                  {
                    gamma: 1
                  },
                  {
                    saturation: -54
                  }
                ]
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#6a6969"
                  },
                  {
                    lightness: 0
                  }
                ]
              },
              {
                featureType: "poi.attraction",
                elementType: "geometry",
                stylers: [
                  {
                    visibility: "on"
                  }
                ]
              },
              {
                featureType: "poi.attraction",
                elementType: "geometry.fill",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "poi.attraction",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "poi.business",
                elementType: "geometry.fill",
                stylers: [
                  {
                    visibility: "on"
                  }
                ]
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#698577"
                  }
                ]
              },
              {
                featureType: "poi.park",
                elementType: "labels",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    visibility: "simplified"
                  }
                ]
              },
              {
                featureType: "road",
                elementType: "labels",
                stylers: [
                  {
                    invert_lightness: true
                  }
                ]
              },
              {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off"
                  },
                  {
                    saturation: -100
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [
                  {
                    lightness: 0
                  },
                  {
                    color: "#474747"
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 0
                  },
                  {
                    weight: 0.2
                  },
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    invert_lightness: true
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off"
                  },
                  {
                    saturation: -100
                  }
                ]
              },
              {
                featureType: "road.highway.controlled_access",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#a1a1a1"
                  },
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "road.highway.controlled_access",
                elementType: "labels",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                  {
                    lightness: 0
                  },
                  {
                    visibility: "on"
                  },
                  {
                    color: "#474747"
                  }
                ]
              },
              {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#454545"
                  }
                ]
              },
              {
                featureType: "road.arterial",
                elementType: "labels",
                stylers: [
                  {
                    saturation: -80
                  },
                  {
                    lightness: 42
                  },
                  {
                    color: "#989898"
                  }
                ]
              },
              {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [
                  {
                    saturation: -100
                  }
                ]
              },
              {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#474747"
                  },
                  {
                    lightness: 0
                  }
                ]
              },
              {
                featureType: "road.local",
                elementType: "labels",
                stylers: [
                  {
                    lightness: 8
                  },
                  {
                    color: "#909090"
                  }
                ]
              },
              {
                featureType: "road.local",
                elementType: "labels.icon",
                stylers: [
                  {
                    saturation: -100
                  }
                ]
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#6d6d6d"
                  },
                  {
                    lightness: 0
                  },
                  {
                    visibility: "simplified"
                  }
                ]
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#616e74"
                  },
                  {
                    lightness: 0
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
  public handleGeoWatchSuccess = () => {
    const { latitude, longitude } = this.props;
    this.map.panTo({ lat: latitude, lng: longitude });
  };
  public handleGeoWatchError = () => {
    console.log("Error watching you");
  };
}

export default withRouter(LocationMapContainer);
