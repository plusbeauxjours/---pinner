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
                featureType: "all",
                elementType: "labels",
                stylers: [
                  {
                    visibility: "on"
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
                    color: "#000000"
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
                    visibility: "on"
                  },
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 16
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
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 20
                  }
                ]
              },
              {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 17
                  },
                  {
                    weight: 1.2
                  }
                ]
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#c4c4c4"
                  }
                ]
              },
              {
                featureType: "administrative.neighborhood",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#707070"
                  }
                ]
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 20
                  }
                ]
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 21
                  },
                  {
                    visibility: "on"
                  }
                ]
              },
              {
                featureType: "poi.business",
                elementType: "geometry",
                stylers: [
                  {
                    visibility: "on"
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#be2026"
                  },
                  {
                    lightness: 0
                  },
                  {
                    visibility: "on"
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
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
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    visibility: "off"
                  },
                  {
                    hue: "#ff000a"
                  }
                ]
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 18
                  }
                ]
              },
              {
                featureType: "road.arterial",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#575757"
                  }
                ]
              },
              {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#ffffff"
                  }
                ]
              },
              {
                featureType: "road.arterial",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#2c2c2c"
                  }
                ]
              },
              {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 16
                  }
                ]
              },
              {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#999999"
                  }
                ]
              },
              {
                featureType: "road.local",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    saturation: -52
                  }
                ]
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 19
                  }
                ]
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    lightness: 17
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
