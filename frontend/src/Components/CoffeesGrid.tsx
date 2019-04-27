import React from "react";
import styled from "../Styles/typed-components";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Grid = styled.div`
  display: grid;
  justify-content: center
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 20px;
  padding: 20px;
`;

const AvatarContainer = styled.div``;

const SAvatar = styled(Avatar)`
  margin: 3px;
`;
interface IProps {
  coffees?: any;
}

const CoffeesGrid: React.SFC<IProps> = ({ coffees }) => (
  <Grid>
    {coffees &&
      coffees.map(coffee => (
        <AvatarContainer key={coffee.id}>
          <Link to={`/c/${coffee.id}`}>
            <SAvatar size={"sm"} url={coffee.host.profile.avatar} />
          </Link>
        </AvatarContainer>
      ))}
  </Grid>
);

export default CoffeesGrid;
