import React from "react";
import styled from "src/Styles/typed-components";
import Button from "../Button";
import { MutationFn } from "react-apollo";

const SButton = styled(Button)`
  display: flex;
  z-index: 5;
  width: 75px;
`;

interface IProps {
  matchFn?: MutationFn;
  isSelf: boolean;
  unMatchFn?: MutationFn;
  isMatching: boolean;
}

const CoffeeBtnPresenter: React.FunctionComponent<IProps> = ({
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
