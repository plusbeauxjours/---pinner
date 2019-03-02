import React from "react";
import styled from "src/Styles/typed-components";
import BlobCard from "./BlobCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 295px);
  grid-template-rows: 295px;
  grid-auto-rows: 295px;
`;

interface IProps {
  cards?: any;
  className?: string;
}

const CardGrid: React.SFC<IProps> = ({ cards, className }) => (
  <Container className={className}>
    {cards.map(card => (
      <BlobCard
        key={card.id}
        id={card.id}
        likeCount={card.likeCount}
        commentCount={card.commentCount}
        borderRadius={card.borderRadius}
        bgColor={card.bgColor}
        font={card.font}
        fontColor={card.fontColor}
        fontSize={card.fontSize}
      />
    ))}
  </Container>
);

export default CardGrid;
