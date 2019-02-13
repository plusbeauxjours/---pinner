import React from "react";
import styled from "src/Styles/typed-components";
import SquareCard from "./SquareCard";

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
      <SquareCard
        key={card.id}
        id={card.id}
        file={card.file}
        likeCount={card.likeCount}
        commentCount={card.commentCount}
      />
    ))}
  </Container>
);

export default CardGrid;
