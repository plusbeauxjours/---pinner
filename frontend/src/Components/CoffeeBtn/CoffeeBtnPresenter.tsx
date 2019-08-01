import React from "react";
import styled from "src/Styles/typed-components";
import Button from "../Button";

const SButton = styled(Button)`
  display: flex;
  z-index: 5;
  width: 75px;
`;

interface IProps {
  isSelf: boolean;
  match: () => void;
  unmatch: () => void;
  isMatching: boolean;
  isSubmitted: boolean;
}

const CoffeeBtnPresenter: React.FunctionComponent<IProps> = ({
  match,
  unmatch,
  isSelf,
  isMatching,
  isSubmitted
}) => {
  if (isSelf) {
    return null;
  } else if (!isSubmitted) {
    return (
      <>
        {!isSelf && isMatching ? (
          <SButton size={"xs"} text={"UNMATCH"} onClick={unmatch} />
        ) : (
          <SButton size={"xs"} text={"JOIN"} onClick={match} />
        )}
      </>
    );
  } else {
    return null;
  }
};

export default CoffeeBtnPresenter;
