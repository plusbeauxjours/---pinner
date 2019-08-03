import React from "react";
import styled from "src/Styles/typed-components";

const MapBox = styled.div<ITheme>`
  position: absolute;
  border-radius: 3px;
  border: 0px;
  height: ${props => {
    if (props.modal === true) {
      return "700px";
    } else {
      return "300px";
    }
  }};
  width: ${props => {
    if (props.modal === true) {
      return "700px";
    } else {
      return "300px";
    }
  }};
`;

interface ITheme {
  modal: boolean;
}

interface IProps {
  mapRef: any;
  modal: boolean;
}

const LocationMapPresenter: React.SFC<IProps> = ({ mapRef, modal }) => (
  <MapBox ref={mapRef} modal={modal} />
);

export default LocationMapPresenter;
