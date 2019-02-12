

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: followUser
// ====================================================

export interface followUser_followUser {
  __typename: "FollowUnfollowResponse";
  ok: boolean | null;
}

export interface followUser {
  followUser: followUser_followUser;
}

export interface followUserVariables {
  userId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: logIn
// ====================================================

export interface logIn_logIn {
  __typename: "ObtainJSONWebToken";
  token: string | null;
}

export interface logIn {
  logIn: logIn_logIn;
}

export interface logInVariables {
  username: string;
  password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: likeCard
// ====================================================

export interface likeCard_likeCard {
  __typename: "LikeCardResponse";
  ok: boolean | null;
}

export interface likeCard {
  likeCard: likeCard_likeCard;
}

export interface likeCardVariables {
  cardId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addComment
// ====================================================

export interface addComment_addComment_comment_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface addComment_addComment_comment {
  __typename: "CommentType";
  id: string;
  creator: addComment_addComment_comment_creator | null;
}

export interface addComment_addComment {
  __typename: "AddCommentResponse";
  comment: addComment_addComment_comment | null;
}

export interface addComment {
  addComment: addComment_addComment;
}

export interface addCommentVariables {
  cardId: number;
  message: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signUp
// ====================================================

export interface signUp_createAccount {
  __typename: "CreateAccountResponse";
  token: string | null;
}

export interface signUp {
  createAccount: signUp_createAccount;
}

export interface signUpVariables {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: explore
// ====================================================

export interface explore_latestCards_cards {
  __typename: "CardType";
  id: string;
  likeCount: number | null;
  commentCount: number | null;
  file: string | null;
}

export interface explore_latestCards {
  __typename: "LatestCardsResponse";
  cards: (explore_latestCards_cards | null)[] | null;
}

export interface explore_latestUsers_users_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
}

export interface explore_latestUsers_users {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: explore_latestUsers_users_profile | null;
}

export interface explore_latestUsers {
  __typename: "LatestUsersResponse";
  users: (explore_latestUsers_users | null)[] | null;
}

export interface explore {
  latestCards: explore_latestCards;
  latestUsers: explore_latestUsers;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: feed
// ====================================================

export interface feed_feed_cards_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface feed_feed_cards_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: feed_feed_cards_comments_creator | null;
}

export interface feed_feed_cards_creator_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface feed_feed_cards_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: feed_feed_cards_creator_profile | null;
}

export interface feed_feed_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  location: string | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
  comments: (feed_feed_cards_comments | null)[] | null;
  creator: feed_feed_cards_creator;
}

export interface feed_feed {
  __typename: "FeedResponse";
  cards: (feed_feed_cards | null)[] | null;
}

export interface feed {
  feed: feed_feed;
}

export interface feedVariables {
  page: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: search
// ====================================================

export interface search_searchUsers_users_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
}

export interface search_searchUsers_users {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: search_searchUsers_users_profile | null;
}

export interface search_searchUsers {
  __typename: "SearchUsersResponse";
  users: (search_searchUsers_users | null)[] | null;
}

export interface search_searchCards_cards {
  __typename: "CardType";
  id: string;
  likeCount: number | null;
  commentCount: number | null;
  file: string | null;
}

export interface search_searchCards {
  __typename: "SearchCardsResponse";
  cards: (search_searchCards_cards | null)[] | null;
}

export interface search {
  searchUsers: search_searchUsers;
  searchCards: search_searchCards;
}

export interface searchVariables {
  term: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me_user {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface me_me {
  __typename: "UserProfileResponse";
  user: me_me_user | null;
}

export interface me {
  me: me_me;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserParts
// ====================================================

export interface UserParts_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
}

export interface UserParts {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: UserParts_profile | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CardParts
// ====================================================

export interface CardParts {
  __typename: "CardType";
  id: string;
  likeCount: number | null;
  commentCount: number | null;
  file: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================