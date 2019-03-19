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
  border-bottom: 1px solid grey;
`;

const PHeader = styled.header`
  display: flex;
  flex-direction: column;
  height: 300px;
  align-items: center;
  background: ${props => props.theme.headerColor};
`;

const PAvatar = styled(Avatar)`
  margin: 40px;
`;

const Username = styled.span`
  text-align: center;
  font-size: 22px;
  font-weight: 100;
`;

const NameContainer = styled.span`
  display: flex;
`;

const PBody = styled.div`
  display: grid;
  grid-template-areas: "CityPhoto Info Follow";
  grid-template-columns: minmax(200px, 1fr);
  grid-auto-rows: 200px;
  grid-gap: 15px;
  margin: 20px;
  justify-content: center;
  background: ${props => props.theme.bgColor};
`;

const CityPhoto = styled.img`
  grid-area: Photo;
  display: flex;
  position: absolute;
  width: 200px;
  height: 200px;
  background-size: cover;
  border-radius: 3px;
  z-index: 1;
  object-fit: cover;
`;

const CityContainer = styled.div``;

const InfoContainer = styled.div`
  grid-area: Info;
`;
const FollowContainer = styled.div`
  grid-area: Follow;
`;

const CityNameContainer = styled.span`
  z-index: 5;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 200px;
`;

const CityName = styled(Bold)`
  display: flex;
  z-index: 5;
  font-size: 40px;
  font-family: "Qwigley";
  font-weight: 200;
  color: white;
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
        <PHeader>
          <PAvatar size="lg" url={user.profile.avatar} />
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
          <NameContainer>
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
          </NameContainer>
        </PHeader>
        <SWrapper>
          <PBody>
            <CityContainer>
              <CityPhoto src={user.profile.currentCity.cityPhoto} />
              <CityNameContainer>
                <CityName text={user.profile.currentCity.cityName} />
              </CityNameContainer>
            </CityContainer>
            <InfoContainer>
              <Metric>
                <CBold text={String(user.profile.currentCity.cityName)} />
              </Metric>
              <Metric>
                post
                <SBold text={String(user.profile.postCount)} />
              </Metric>
              <Metric>
                followers
                <SBold text={String(user.profile.followersCount)} />
              </Metric>
              <Metric>
                following
                <SBold text={String(user.profile.followingCount)} />
              </Metric>
              <Metric>
                city
                <SBold text={String(user.profile.cityCount)} />
              </Metric>
              <Metric>
                country
                <SBold text={String(user.profile.countryCount)} />
              </Metric>
              <Metric>
                <Flag
                  size="md"
                  countryCode={require(`../../Images/countryFlag/${
                    user.profile.currentCountry.countryCode
                  }.svg`)}
                />
              </Metric>
            </InfoContainer>
            <FollowContainer>hi</FollowContainer>
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
          </PBody>
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
