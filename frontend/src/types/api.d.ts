

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
// GraphQL mutation operation: DeleteComment
// ====================================================

export interface DeleteComment_deleteComment {
  __typename: "DeleteCommentResponse";
  ok: boolean | null;
}

export interface DeleteComment {
  deleteComment: DeleteComment_deleteComment;
}

export interface DeleteCommentVariables {
  cardId: number;
  commentId: number;
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
  avatar?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FacebookConnect
// ====================================================

export interface FacebookConnect_facebookConnect {
  __typename: "FacebookConnectResponse";
  token: string | null;
}

export interface FacebookConnect {
  facebookConnect: FacebookConnect_facebookConnect;
}

export interface FacebookConnectVariables {
  username: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  gender?: string | null;
  fbId: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: cardDetail
// ====================================================

export interface cardDetail_cardDetail_card_country {
  __typename: "CountryType";
  countryname: string | null;
}

export interface cardDetail_cardDetail_card_city {
  __typename: "CityType";
  cityname: string | null;
}

export interface cardDetail_cardDetail_card_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface cardDetail_cardDetail_card_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: cardDetail_cardDetail_card_comments_creator | null;
}

export interface cardDetail_cardDetail_card_creator_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface cardDetail_cardDetail_card_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: cardDetail_cardDetail_card_creator_profile | null;
}

export interface cardDetail_cardDetail_card {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  country: cardDetail_cardDetail_card_country | null;
  city: cardDetail_cardDetail_card_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
  comments: (cardDetail_cardDetail_card_comments | null)[] | null;
  creator: cardDetail_cardDetail_card_creator;
}

export interface cardDetail_cardDetail {
  __typename: "CardDetailResponse";
  card: cardDetail_cardDetail_card | null;
}

export interface cardDetail {
  cardDetail: cardDetail_cardDetail;
}

export interface cardDetailVariables {
  id: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: explore
// ====================================================

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

export interface explore {
  latestUsers: explore_latestUsers;
  latestCards: explore_latestCards;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Feed
// ====================================================

export interface Feed_feed_cards_country {
  __typename: "CountryType";
  countryname: string | null;
}

export interface Feed_feed_cards_city {
  __typename: "CityType";
  cityname: string | null;
}

export interface Feed_feed_cards_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface Feed_feed_cards_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: Feed_feed_cards_comments_creator | null;
}

export interface Feed_feed_cards_creator_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface Feed_feed_cards_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: Feed_feed_cards_creator_profile | null;
}

export interface Feed_feed_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  country: Feed_feed_cards_country | null;
  city: Feed_feed_cards_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
  comments: (Feed_feed_cards_comments | null)[] | null;
  creator: Feed_feed_cards_creator;
}

export interface Feed_feed {
  __typename: "FeedResponse";
  cards: (Feed_feed_cards | null)[] | null;
}

export interface Feed {
  feed: Feed_feed;
}

export interface FeedVariables {
  page: number;
  cityname: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeedByLocaion
// ====================================================

export interface FeedByLocaion_feedByLocation_cards_country {
  __typename: "CountryType";
  countryname: string | null;
}

export interface FeedByLocaion_feedByLocation_cards_city {
  __typename: "CityType";
  cityname: string | null;
}

export interface FeedByLocaion_feedByLocation_cards_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface FeedByLocaion_feedByLocation_cards_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: FeedByLocaion_feedByLocation_cards_comments_creator | null;
}

export interface FeedByLocaion_feedByLocation_cards_creator_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface FeedByLocaion_feedByLocation_cards_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: FeedByLocaion_feedByLocation_cards_creator_profile | null;
}

export interface FeedByLocaion_feedByLocation_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  country: FeedByLocaion_feedByLocation_cards_country | null;
  city: FeedByLocaion_feedByLocation_cards_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
  comments: (FeedByLocaion_feedByLocation_cards_comments | null)[] | null;
  creator: FeedByLocaion_feedByLocation_cards_creator;
}

export interface FeedByLocaion_feedByLocation {
  __typename: "FeedByLocationResponse";
  cards: (FeedByLocaion_feedByLocation_cards | null)[] | null;
}

export interface FeedByLocaion {
  feedByLocation: FeedByLocaion_feedByLocation;
}

export interface FeedByLocaionVariables {
  page: number;
  countryname: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReportLocation
// ====================================================

export interface ReportLocation_reportLocation {
  __typename: "ReportLocationResponse";
  ok: boolean | null;
}

export interface ReportLocation {
  reportLocation: ReportLocation_reportLocation;
}

export interface ReportLocationVariables {
  currentLat: number;
  currentLng: number;
  currentCity: string;
  currentCountry: string;
  currentCountryCode: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountry
// ====================================================

export interface GetCountry_getCountry_country {
  __typename: "CountryType";
  id: string;
  countryname: string | null;
}

export interface GetCountry_getCountry {
  __typename: "CountryResponse";
  country: (GetCountry_getCountry_country | null)[] | null;
}

export interface GetCountry {
  getCountry: GetCountry_getCountry;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCity
// ====================================================

export interface GetCity_getCity_city {
  __typename: "CityType";
  id: string;
  cityname: string | null;
}

export interface GetCity_getCity {
  __typename: "CityResponse";
  city: (GetCity_getCity_city | null)[] | null;
}

export interface GetCity {
  getCity: GetCity_getCity;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNotifictions
// ====================================================

export interface GetNotifictions_getNotifications_notifications_actor_profile_lastCountry {
  __typename: "CountryType";
  countryname: string | null;
  countrycode: string | null;
}

export interface GetNotifictions_getNotifications_notifications_actor_profile_lastCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_actor_profile_currentCountry {
  __typename: "CountryType";
  countryname: string | null;
  countrycode: string | null;
}

export interface GetNotifictions_getNotifications_notifications_actor_profile_currentCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_actor_profile {
  __typename: "ProfileType";
  avatar: string;
  lastCountry: GetNotifictions_getNotifications_notifications_actor_profile_lastCountry | null;
  lastCity: GetNotifictions_getNotifications_notifications_actor_profile_lastCity | null;
  currentCountry: GetNotifictions_getNotifications_notifications_actor_profile_currentCountry | null;
  currentCity: GetNotifictions_getNotifications_notifications_actor_profile_currentCity | null;
}

export interface GetNotifictions_getNotifications_notifications_actor {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetNotifictions_getNotifications_notifications_actor_profile | null;
}

export interface GetNotifictions_getNotifications_notifications_target_profile_currentCountry {
  __typename: "CountryType";
  countryname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_target_profile_currentCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_target_profile {
  __typename: "ProfileType";
  avatar: string;
  currentCountry: GetNotifictions_getNotifications_notifications_target_profile_currentCountry | null;
  currentCity: GetNotifictions_getNotifications_notifications_target_profile_currentCity | null;
}

export interface GetNotifictions_getNotifications_notifications_target {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetNotifictions_getNotifications_notifications_target_profile | null;
}

export interface GetNotifictions_getNotifications_notifications_payload_country {
  __typename: "CountryType";
  countryname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_payload_city {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_payload {
  __typename: "CardType";
  id: string;
  country: GetNotifictions_getNotifications_notifications_payload_country | null;
  city: GetNotifictions_getNotifications_notifications_payload_city | null;
  caption: string;
}

export interface GetNotifictions_getNotifications_notifications_comment {
  __typename: "CommentType";
  message: string;
}

export interface GetNotifictions_getNotifications_notifications_fromCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_fromCountry {
  __typename: "CountryType";
  countryname: string | null;
  countrycode: string | null;
}

export interface GetNotifictions_getNotifications_notifications_toCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_toCountry {
  __typename: "CountryType";
  countryname: string | null;
  countrycode: string | null;
}

export interface GetNotifictions_getNotifications_notifications {
  __typename: "NotificationType";
  id: string;
  actor: GetNotifictions_getNotifications_notifications_actor;
  target: GetNotifictions_getNotifications_notifications_target | null;
  verb: NotificationVerb;
  payload: GetNotifictions_getNotifications_notifications_payload | null;
  read: boolean;
  comment: GetNotifictions_getNotifications_notifications_comment | null;
  fromCity: GetNotifictions_getNotifications_notifications_fromCity | null;
  fromCountry: GetNotifictions_getNotifications_notifications_fromCountry | null;
  toCity: GetNotifictions_getNotifications_notifications_toCity | null;
  toCountry: GetNotifictions_getNotifications_notifications_toCountry | null;
  createdAt: string | null;
}

export interface GetNotifictions_getNotifications {
  __typename: "GetNotificationsResponse";
  ok: boolean | null;
  notifications: (GetNotifictions_getNotifications_notifications | null)[] | null;
}

export interface GetNotifictions {
  getNotifications: GetNotifictions_getNotifications;
}

export interface GetNotifictionsVariables {
  page: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartPhoneVerification
// ====================================================

export interface StartPhoneVerification_startPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean | null;
}

export interface StartPhoneVerification {
  startPhoneVerification: StartPhoneVerification_startPhoneVerification;
}

export interface StartPhoneVerificationVariables {
  phoneNumber: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_userProfile_user_profile_currentCountry {
  __typename: "CountryType";
  countryname: string | null;
  countrycode: string | null;
}

export interface userProfile_userProfile_user_profile_currentCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface userProfile_userProfile_user_profile {
  __typename: "ProfileType";
  bio: string | null;
  gender: string | null;
  avatar: string;
  website: string | null;
  postCount: number | null;
  followersCount: number | null;
  followingCount: number | null;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCountry: userProfile_userProfile_user_profile_currentCountry | null;
  currentCity: userProfile_userProfile_user_profile_currentCity | null;
}

export interface userProfile_userProfile_user_cards {
  __typename: "CardType";
  id: string;
  likeCount: number | null;
  commentCount: number | null;
  file: string | null;
}

export interface userProfile_userProfile_user {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  firstName: string;
  lastName: string;
  profile: userProfile_userProfile_user_profile | null;
  cards: (userProfile_userProfile_user_cards | null)[] | null;
}

export interface userProfile_userProfile {
  __typename: "UserProfileResponse";
  user: userProfile_userProfile_user | null;
}

export interface userProfile {
  userProfile: userProfile_userProfile;
}

export interface userProfileVariables {
  username: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditProfile
// ====================================================

export interface EditProfile_editProfile_user_profile {
  __typename: "ProfileType";
  bio: string | null;
  gender: string | null;
  avatar: string;
}

export interface EditProfile_editProfile_user {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  firstName: string;
  lastName: string;
  profile: EditProfile_editProfile_user_profile | null;
}

export interface EditProfile_editProfile {
  __typename: "EditProfileResponse";
  ok: boolean | null;
  user: EditProfile_editProfile_user | null;
}

export interface EditProfile {
  editProfile: EditProfile_editProfile;
}

export interface EditProfileVariables {
  userName?: string | null;
  bio?: string | null;
  gender?: string | null;
  avatar?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteProfile
// ====================================================

export interface DeleteProfile_deleteProfile {
  __typename: "DeleteProfileResponse";
  ok: boolean | null;
}

export interface DeleteProfile {
  deleteProfile: DeleteProfile_deleteProfile;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchTerms
// ====================================================

export interface searchTerms_searchUsers_users_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
}

export interface searchTerms_searchUsers_users {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: searchTerms_searchUsers_users_profile | null;
}

export interface searchTerms_searchUsers {
  __typename: "SearchUsersResponse";
  users: (searchTerms_searchUsers_users | null)[] | null;
}

export interface searchTerms_searchCards_cards {
  __typename: "CardType";
  id: string;
  likeCount: number | null;
  commentCount: number | null;
  file: string | null;
}

export interface searchTerms_searchCards {
  __typename: "SearchCardsResponse";
  cards: (searchTerms_searchCards_cards | null)[] | null;
}

export interface searchTerms {
  searchUsers: searchTerms_searchUsers;
  searchCards: searchTerms_searchCards;
}

export interface searchTermsVariables {
  term: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompletePhoneVerification
// ====================================================

export interface CompletePhoneVerification_completePhoneVerification {
  __typename: "CompletePhoneVerificationResponse";
  ok: boolean | null;
  token: string | null;
}

export interface CompletePhoneVerification {
  completePhoneVerification: CompletePhoneVerification_completePhoneVerification;
}

export interface CompletePhoneVerificationVariables {
  key: string;
  phoneNumber: string;
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

// ====================================================
// GraphQL fragment: DetailParts
// ====================================================

export interface DetailParts_country {
  __typename: "CountryType";
  countryname: string | null;
}

export interface DetailParts_city {
  __typename: "CityType";
  cityname: string | null;
}

export interface DetailParts_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface DetailParts_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: DetailParts_comments_creator | null;
}

export interface DetailParts_creator_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface DetailParts_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: DetailParts_creator_profile | null;
}

export interface DetailParts {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  country: DetailParts_country | null;
  city: DetailParts_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
  comments: (DetailParts_comments | null)[] | null;
  creator: DetailParts_creator;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum NotificationVerb {
  COMMENT = "COMMENT",
  FOLLOW = "FOLLOW",
  LIKE = "LIKE",
  MOVE = "MOVE",
  UPLOAD = "UPLOAD",
}

//==============================================================
// END Enums and Input Objects
//==============================================================