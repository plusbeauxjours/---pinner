import React from "react";
import styled from "src/Styles/typed-components";
import Button from "../Button";

const SButton = styled(Button)`
  z-index: 1;
  width: 100%;
`;

interface IProps {
  matchFn?: any;
  isSelf: boolean;
  unMatchFn?: any;
  isMatching: boolean;
}

const CoffeeBtnPresenter: React.SFC<IProps> = ({
  matchFn,
  isSelf,
  unMatchFn,
  isMatching
}) => {
  if (isSelf) {
    return null;
  } else {
    return (
      <>
        {!isSelf && isMatching ? (
          <SButton size={"xs"} text={"UNMATCH"} onClick={unMatchFn} />
        ) : (
          <SButton size={"xs"} text={"JOIN"} onClick={matchFn} />
        )}
      </>
    );
  }
};

export default CoffeeBtnPresenter;
