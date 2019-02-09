import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div``;

interface IProps {
  inline: string;
}

const PhotoPresenter: React.SFC<IProps> = ({ inline }) => <Container />;

export default PhotoPresenter;
