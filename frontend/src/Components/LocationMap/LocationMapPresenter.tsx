import React from "react";
import styled from "src/Styles/typed-components";

const MapBox = styled.div`
  position: absolute;
  border-radius: 3px;
  height: 300px;
  width: 300px;
`;

interface IProps {
  mapRef: any;
}

const LocationMapPresenter: React.SFC<IProps> = ({ mapRef }) => (
  <MapBox ref={mapRef} />
);

export default LocationMapPresenter;
