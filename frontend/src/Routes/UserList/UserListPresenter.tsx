import React from "react";
import styled from "../../Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";
import UserRow from "../../Components/UserRow";
import { UserList } from "src/types/api";
// import BlurImageLoader from "../../Components/BlurImageLoader";

const Container = styled.div`
  margin: 0 30px 0 30px;
`;

interface IProps {
  data?: UserList;
  loading: boolean;
}

const UserListPresent: React.SFC<IProps> = ({
  data: { userList: { users = null } = {} } = {},
  loading
}) => {
  if (loading) {
    return (
      <Loader />
      // <BlurImageLoader
      //   width={200}
      //   height={200}
      //   image={
      //     "https://cdn-images-1.medium.com/max/1600/1*tFBk8LEI6tAdpyNNf0cTWA.png"
      //   }
      //   placeholder={
      //     "https://cdn-images-1.medium.com/max/1400/1*mXLAqRszpROe5jnv7cZrEw.png"
      //   }
      // />
    );
  } else if (!loading && users) {
    return (
      <Wrapper>
        <h5>hihi</h5>
        <Container>
          <p>recommand user</p>
          {users.map(user => (
            <UserRow
              key={user.id}
              id={user.id}
              username={user.username}
              avatar={user.profile.avatar}
              currentCity={user.profile.currentCity.cityName}
              currentCountry={user.profile.currentCity.country.countryName}
              isFollowing={user.profile.isFollowing}
              size={"sm"}
            />
          ))}
        </Container>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default UserListPresent;
