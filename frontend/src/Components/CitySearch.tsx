import React, { Component } from "react";
import Script from "react-load-script";
import styled from "styled-components";
import { GOOGLE_PLACE_KEY } from "../keys";

const Input = styled.input`
  width: 215px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  color: white;
  font-size: 14px;

  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const SScript = styled(Script)`
  & > .pac-container {
    font-size: 1px;
    color: red;
  }
`;

interface IState {
  city: string;
  query: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
}

class CitySearch extends Component<any, IState> {
  public autocomplete;
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      query: "",
      country: "",
      countryCode: "",
      lat: 0,
      lng: 0
    };
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  public render() {
    const { city } = this.state;

    const URL = `https://maps.googleapis.com/maps/api/js?language=en&key=${GOOGLE_PLACE_KEY}&libraries=places`;
    return (
      <div>
        <SScript url={URL} onLoad={this.handleScriptLoad} />{" "}
        <Input
          id="autocomplete"
          placeholder="Search"
          value={city}
          type="text"
          onChange={this.onChange}
        />
      </div>
    );
  }
  public handleScriptLoad() {
    const options = {
      types: ["(cities)"]
    };
    const input = document.getElementById("autocomplete");
    this.autocomplete = new google.maps.places.Autocomplete(
      input as any,
      options
    );
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  }
  public handlePlaceSelect() {
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;
    console.log(addressObject);
    if (address) {
      console.log(address);
      this.setState({
        city: address[0].long_name,
        query: addressObject.formatted_address,
        country: address[2].long_name,
        countryCode: address[2].short_name,
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng()
      });
    }
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      city: value
    } as any);
    console.log(this.state);
  };
}

export default CitySearch;
