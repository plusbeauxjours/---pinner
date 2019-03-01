import React from "react";
import { Link } from "react-router-dom";
import { Gear } from "../../Icons";
import styled, { keyframes } from "../../Styles/typed-components";

import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Bold from "../../Components/Bold";
import CardGrid from "../../Components/CardGrid";
import FollowBtn from "../../Components/FollowBtn";
import Input from "../../Components/Input";
import Flag from "../../Components/Flag";

const SWrapper = styled(Wrapper)`
  z-index: 1;
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
    margin-left: 20px;
  }
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center center;
  background-size: 100%;
  border: ${props => props.theme.boxBorder};
  border-radius: 50%;
  &:hover {
    opacity: 1;
    cursor: pointer;
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

const UsernameRow = styled.div`
  display: flex;
  ${Username} {
    margin-right: 20px;
  }
`;

const ModalContainer = styled.div`
  z-index: 8;
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
  z-index: 5;
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
  z-index: 10;
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

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

const SBold = styled(Bold)`
  font-size: 20px;
  font-weight: 200;
`;

const CBold = styled(Bold)`
  font-weight: 200;
`;

interface IProps {
  data?: any;
  loading: boolean;
  modalOpen: boolean;
  confirmModalOpen: boolean;
  editMode: boolean;
  openEditMode: () => void;
  toggleModal: () => void;
  toggleConfirmModal: () => void;
  logUserOutFn: () => void;
  confirmDeleteProfile: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  userName: string;
  bio: string;
  gender: string;
  firstName: string;
  lastName: string;
}

const ProfilePresenter: React.SFC<IProps> = ({
  data,
  loading,
  modalOpen,
  confirmModalOpen,
  editMode,
  toggleModal,
  toggleConfirmModal,
  openEditMode,
  logUserOutFn,
  confirmDeleteProfile,
  onInputChange,
  onKeyUp,
  userName,
  bio,
  gender,
  firstName,
  lastName
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    const {
      userProfile: { user }
    } = data;
    console.log(user.profile.currentCountry.countrycode);
    return (
      <>
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLink onClick={openEditMode}>Edit Profile</ModalLink>
              <ModalLink onClick={toggleConfirmModal}>Delete Profile</ModalLink>
              <ModalLink onClick={logUserOutFn}>Log Out</ModalLink>
              <ModalLink onClick={toggleModal}>Cancel</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {confirmModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleConfirmModal} />
            <Modal>
              <ModalLink onClick={confirmDeleteProfile}>Yes</ModalLink>
              <ModalLink onClick={toggleConfirmModal}>No</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          <Header>
            <Avatar size="lg" url={user.profile.avatar} />
            <HeaderColumn>
              <UsernameRow>
                {editMode ? (
                  <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    value={userName}
                    placeholder={user.username}
                    name={"userName"}
                    onKeyUp={onKeyUp}
                  />
                ) : (
                  <Username>{user.username}</Username>
                )}
                {user.profile.isSelf ? (
                  <GearContainer onClick={toggleModal}>
                    <Gear />
                  </GearContainer>
                ) : (
                  <FollowBtn
                    isFollowing={user.profile.isFollowing}
                    userId={user.id}
                  />
                )}
                <Link to={`/${user.username}/footprint`}>
                  <GearContainer>
                    <Gear />
                  </GearContainer>
                </Link>
              </UsernameRow>
              <Metrics>
                <Metric>
                  <CBold text={String(user.profile.currentCity.cityname)} />
                </Metric>
                <Metric>
                  <SBold text={String(user.profile.postCount)} />
                </Metric>
                <Metric>
                  <SBold text={String(user.profile.followersCount)} />
                </Metric>
                <Metric>
                  <SBold text={String(user.profile.followingCount)} />
                </Metric>
                <Metric>
                  <Flag
                    size="md"
                    countrycode={require(`../../Images/countryFlag/${
                      user.profile.currentCountry.countrycode
                    }.svg`)}
                  />
                </Metric>
              </Metrics>
              {editMode ? (
                <>
                  <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    value={firstName}
                    placeholder={user.firstName || "First Name"}
                    name={"firstName"}
                    onKeyUp={onKeyUp}
                  />
                  <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    value={lastName}
                    placeholder={user.lastName || "Last Name"}
                    name={"lastName"}
                    onKeyUp={onKeyUp}
                  />
                </>
              ) : (
                <Fullname>{`${user.firstName} ${user.lastName}`}</Fullname>
              )}
              {user.profile.bio &&
                (editMode ? (
                  <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    value={bio}
                    placeholder={user.profile.bio || "Bio"}
                    name={"bio"}
                    onKeyUp={onKeyUp}
                  />
                ) : (
                  <Bio>{`${user.profile.bio}`}</Bio>
                ))}
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
