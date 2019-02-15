import React from "react";
import styled from "../../Styles/typed-components";
import Wrapper from "../../Components/Wrapper";
import Loader from "src/Components/Loader";
import Avatar from "src/Components/Avatar";
import Bold from "src/Components/Bold";
import CardGrid from "src/Components/CardGrid";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";

const SWrapper = styled(Wrapper)`
  width: 45%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 80px;
`;

const HeaderColumn = styled.div`
  margin-left: 100px;
`;

const Username = styled.span`
  font-size: 28px;
  font-weight: 300;
`;

const Metrics = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
`;

const Metric = styled.span`
  &:not(:first-child) {
    margin-left: 45px;
  }
`;

const Fullname = styled.span`
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
  font-weight: 500;
`;

const Bio = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Url = styled.a`
  font-size: 14px;
  color: ${props => props.theme.darkBlueColor};
  font-weight: 600;
`;

const UsernameRow = styled.div`
  display: flex;
  ${Username} {
    margin-right: 20px;
  }
`;

const ProfilePresenter: React.SFC<any> = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    const {
      userProfile: { user }
    } = data;
    return (
      <>
        <SWrapper>
          <Header>
            <Avatar size="lg" url={user.profile.avatar} />
            <HeaderColumn>
              <UsernameRow>
                <Username>{user.username}</Username>
                {user.profile.isSelf && (
                  <Link to="/edit-profile">
                    <Button text="Edit Profile" inverted={true} />
                  </Link>
                )}
              </UsernameRow>
              <Metrics>
                <Metric>
                  <Bold text={String(user.profile.postCount)} /> posts
                </Metric>
                <Metric>
                  <Bold text={String(user.profile.followersCount)} /> followers
                </Metric>
                <Metric>
                  <Bold text={String(user.profile.followingCount)} /> following
                </Metric>
              </Metrics>
              <Fullname>{`${user.firstName} ${user.lastNmae}`}</Fullname>
              {user.profile.bio && <Bio>{user.profile.bio}</Bio>}
              {user.profile.website && <Url>{user.profile.website}</Url>}
            </HeaderColumn>
          </Header>
        </SWrapper>
        <Wrapper>
          {user.cards && user.cards.length !== 0 && (
            <CardGrid cards={user.cards} />
          )}
        </Wrapper>
      </>
    );
  }
  return null;
};

export default ProfilePresenter;
