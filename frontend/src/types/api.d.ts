

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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================