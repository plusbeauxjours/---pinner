import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 215px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  color: white;
  font-size: 12px;
  &::placeholder {
    color: ${props => props.theme.greyColor};
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

class CitySearch extends React.Component<any, IState> {
  public autocomplete;
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      query: "",
      country: "",
      countryCode: "",
      lng: 0,
      lat: 0
    };
  }

  public render() {
    const { query } = this.state;
    return (
      <>
        <Input
          id="autocomplete"
          placeholder="Search"
          value={query}
          type="text"
          onChange={this.onChange}
        />
      </>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      query: value
    } as any);
    console.log(this.state);
  };
}

export default CitySearch;
