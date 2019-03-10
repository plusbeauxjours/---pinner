import React from "react";
import styled from "../../Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";
import UserRow from "../../Components/UserRow";
import { UserList } from "src/types/api";

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
    return <Loader />;
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
