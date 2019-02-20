import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";
import Wrapper from "../../Components/Wrapper";
import Loader from "src/Components/Loader";
import Avatar from "src/Components/Avatar";
import Bold from "src/Components/Bold";
import CardGrid from "src/Components/CardGrid";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import FollowBtn from "src/Components/FollowBtn";
import { Gear } from "../../Icons";

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

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const GearContainer = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
	`;

const Modal = styled.div`
  background-color: white;
  width: 30%;
  border-radius: 12px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

const ModalLink = styled.div`
  text-align: center;
  min-height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
`;

interface IProps {
  data?: any;
  loading: boolean;
  modalOpen: boolean;
  toggleModal: () => void;
  logUserOutFn: () => void;
}

const ProfilePresenter: React.SFC<IProps> = ({
  data,
  loading,
  modalOpen,
  toggleModal,
  logUserOutFn
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    const {
      userProfile: { user }
    } = data;
    return (
      <>
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLink onClick={logUserOutFn}>Log Out</ModalLink>
              <ModalLink onClick={toggleModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          <Header>
            <Avatar size="lg" url={user.profile.avatar} />
            <HeaderColumn>
              <UsernameRow>
                <Username>{user.username}</Username>
                {user.profile.isSelf ? (
                  <>
                    <Link to="/edit-profile">
                      <Button
                        text="Edit Profile"
                        inverted={true}
                        active={true}
                      />
                    </Link>
                    <GearContainer onClick={toggleModal}>
                      <Gear />
                    </GearContainer>
                  </>
                ) : (
                  <FollowBtn
                    isFollowing={user.profile.isFollowing}
                    userId={user.id}
                  />
                )}
              </UsernameRow>
              <Metrics>
                <Metric>
                  <Bold text={String(user.profile.lastCity)} /> lastCity
                </Metric>
                <Metric>
                  <Bold text={String(user.profile.lastCountry)} /> lastCountry
                </Metric>
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
