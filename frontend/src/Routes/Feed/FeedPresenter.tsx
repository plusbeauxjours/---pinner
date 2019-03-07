import React from "react";
import { Link } from "react-router-dom";

import { Upload } from "../../Icons";

import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";
import Avatar from "../../Components/Avatar";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

const SAvatar = styled(Avatar)`
  margin: 3px;
`;

const Icon = styled.span`
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
`;

interface IProps {
  data?: any;
  loading: boolean;
  currentCity: string;
}

const FeedPresenter: React.SFC<IProps> = ({ data, loading, currentCity }) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    console.log(data);

    const { feed: { cards = {}, users = {} } = {} } = data;
    return (
      <SWrapper>
        <h1>welcome to {currentCity}</h1>
        <Container>
          {users &&
            users.map(user => (
              <Link to={`/${user.username}`}>
                <SAvatar size={"sm"} key={user.id} url={user.profile.avatar} />
              </Link>
            ))}
        </Container>
        <Icon>
          <Link to="/upload">
            <Upload />
          </Link>
        </Icon>
        {cards &&
          cards.map(card => {
            return (
              <>
                <Photo
                  key={card.id}
                  id={card.id}
                  inline={true}
                  creatorAvatar={card.creator.profile.avatar}
                  creatorUsername={card.creator.username}
                  country={card.country.countryname}
                  city={card.city.cityname}
                  photoUrl={card.file}
                  likeCount={card.likeCount}
                  commentCount={card.commentCount}
                  caption={card.caption}
                  comments={card.comments}
                  createdAt={card.createdAt}
                  isLiked={card.isLiked}
                  borderRadius={card.borderRadius}
                />
              </>
            );
          })}
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default FeedPresenter;
