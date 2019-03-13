import React from "react";
import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "../../Styles/typed-components";
import Avatar from "../../Components/Avatar";
import { Link } from "react-router-dom";

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

interface IProps {
  data?: any;
  loading: boolean;
  cityName: string;
}

const FeedByCityPresenter: React.SFC<IProps> = ({
  data,
  loading,
  cityName
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data) {
    console.log(data);

    const { feedByCity: { cards = {}, users = {} } = {} } = data;
    return (
      <SWrapper>
        <h2>{cityName}</h2>
        <Container>
          {users &&
            users.map(user => (
              <Link to={`/${user.username}`}>
                {console.log(user)}
                <SAvatar size={"sm"} key={user.id} url={user.profile.avatar} />
              </Link>
            ))}
        </Container>

        {cards &&
          cards.map(card => (
            <Photo
              id={card.id}
              key={card.id}
              inline={true}
              creatorAvatar={card.creator.profile.avatar}
              creatorUsername={card.creator.username}
              country={card.country.countryName}
              city={card.city.cityName}
              photoUrl={card.file}
              likeCount={card.likeCount}
              commentCount={card.commentCount}
              caption={card.caption}
              comments={card.comments}
              createdAt={card.createdAt}
              isLiked={card.isLiked}
              borderRadius={card.borderRadius}
            />
          ))}
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default FeedByCityPresenter;
