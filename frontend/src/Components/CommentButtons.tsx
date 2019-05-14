import React from "react";
import styled from "src/Styles/typed-components";
import { SmallHeartEmpty, SmallHeartFilled, Edit, Delete } from "../Icons";
import { TOGGLE_LIKE_COMMENT, GET_COMMENTS } from "./Comments/CommentsQueries";
import { ToggleLikeCommentVariables, ToggleLikeComment } from "../types/api";
import { Mutation, MutationFn } from "react-apollo";

class ToggleLikeMutation extends Mutation<
  ToggleLikeComment,
  ToggleLikeCommentVariables
> {}

const Buttons = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.span`
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.3s ease-in-out;
  svg {
    transition: all 0.3s ease-in-out;
    fill: white;
  }
`;

interface IProps {
  editCommentGetId: (commentId: string) => void;
  deleteCommentGetId: (commentId: string) => void;
  isLiked: boolean;
  cardId: string;
  commentId: string;
}

interface IState {
  isLiked: boolean;
}

class CommentButtons extends React.Component<IProps, IState> {
  public toggleLikeFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.isLiked
    };
  }
  public render() {
    const {
      editCommentGetId,
      deleteCommentGetId,
      cardId,
      commentId
    } = this.props;
    const { isLiked } = this.state;
    return (
      <ToggleLikeMutation
        mutation={TOGGLE_LIKE_COMMENT}
        variables={{
          cardId: parseInt(cardId, 10),
          commentId: parseInt(commentId, 10)
        }}
        update={this.updateToggleLike}
      >
        {toggleLikeFn => {
          this.toggleLikeFn = toggleLikeFn;
          return (
            <Buttons>
              <Button onClick={this.onLikeClick}>
                {isLiked ? <SmallHeartFilled /> : <SmallHeartEmpty />}
              </Button>
              <Button onClick={() => editCommentGetId(commentId)}>
                <Edit />
              </Button>
              <Button onClick={() => deleteCommentGetId(commentId)}>
                <Delete />
              </Button>
            </Buttons>
          );
        }}
      </ToggleLikeMutation>
    );
  }
  public onLikeClick = () => {
    const { isLiked } = this.state;
    this.toggleLikeFn();
    this.setState({
      isLiked: !isLiked
    });
  };
  public updateToggleLike = (cache, { data: { toggleLikeComment } }) => {
    const { cardId, commentId } = this.props;
    try {
      const data = cache.readQuery({
        query: GET_COMMENTS,
        variables: {
          cardId: parseInt(cardId, 10)
        }
      });
      console.log(data);
      console.log(toggleLikeComment.comment.isLiked);
      if (data) {
        data.getComments.comments.find(
          i => parseInt(i.id, 10) === parseInt(commentId, 10)
        ).isLiked = toggleLikeComment.comment.isLiked;
        cache.writeQuery({
          query: GET_COMMENTS,
          variables: {
            cardId: parseInt(cardId, 10)
          },
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default CommentButtons;
