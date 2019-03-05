

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

export interface explore_latestUsers_users_profile_currentCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface explore_latestUsers_users_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
  currentCity: explore_latestUsers_users_profile_currentCity | null;
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
  latestUsers: explore_latestUsers;
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
// GraphQL query operation: FeedByCity
// ====================================================

export interface FeedByCity_feedByCity_cards_country {
  __typename: "CountryType";
  countryname: string | null;
}

export interface FeedByCity_feedByCity_cards_city {
  __typename: "CityType";
  cityname: string | null;
}

export interface FeedByCity_feedByCity_cards_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface FeedByCity_feedByCity_cards_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: FeedByCity_feedByCity_cards_comments_creator | null;
}

export interface FeedByCity_feedByCity_cards_creator_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface FeedByCity_feedByCity_cards_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: FeedByCity_feedByCity_cards_creator_profile | null;
}

export interface FeedByCity_feedByCity_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  country: FeedByCity_feedByCity_cards_country | null;
  city: FeedByCity_feedByCity_cards_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
  comments: (FeedByCity_feedByCity_cards_comments | null)[] | null;
  creator: FeedByCity_feedByCity_cards_creator;
}

export interface FeedByCity_feedByCity {
  __typename: "FeedByCityResponse";
  cards: (FeedByCity_feedByCity_cards | null)[] | null;
}

export interface FeedByCity {
  feedByCity: FeedByCity_feedByCity;
}

export interface FeedByCityVariables {
  page: number;
  cityname: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsersByCity
// ====================================================

export interface GetUsersByCity_getUsersByCity_locationLogs_creator_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface GetUsersByCity_getUsersByCity_locationLogs_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetUsersByCity_getUsersByCity_locationLogs_creator_profile | null;
}

export interface GetUsersByCity_getUsersByCity_locationLogs {
  __typename: "LocationLogType";
  creator: GetUsersByCity_getUsersByCity_locationLogs_creator | null;
}

export interface GetUsersByCity_getUsersByCity {
  __typename: "GetUsersByCityResponse";
  locationLogs: (GetUsersByCity_getUsersByCity_locationLogs | null)[] | null;
}

export interface GetUsersByCity {
  getUsersByCity: GetUsersByCity_getUsersByCity;
}

export interface GetUsersByCityVariables {
  cityname: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFootprints
// ====================================================

export interface GetFootprints_getFootprints_footprints_country {
  __typename: "CountryType";
  countryname: string | null;
  countrycode: string | null;
}

export interface GetFootprints_getFootprints_footprints_city {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetFootprints_getFootprints_footprints {
  __typename: "LocationLogType";
  id: string;
  country: GetFootprints_getFootprints_footprints_country | null;
  city: GetFootprints_getFootprints_footprints_city | null;
  createdAt: any;
}

export interface GetFootprints_getFootprints {
  __typename: "FootprintsResponse";
  footprints: (GetFootprints_getFootprints_footprints | null)[] | null;
}

export interface GetFootprints {
  getFootprints: GetFootprints_getFootprints;
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
// GraphQL query operation: GetCities
// ====================================================

export interface GetCities_getCities_cities_country {
  __typename: "CountryType";
  id: string;
  countryname: string | null;
  countrycode: string | null;
}

export interface GetCities_getCities_cities {
  __typename: "CityType";
  id: string;
  cityname: string | null;
  country: GetCities_getCities_cities_country;
}

export interface GetCities_getCities {
  __typename: "CitiesResponse";
  cities: (GetCities_getCities_cities | null)[] | null;
}

export interface GetCities {
  getCities: GetCities_getCities;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNotifictions
// ====================================================

export interface GetNotifictions_getNotifications_notifications_actor_profile_currentCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_actor_profile {
  __typename: "ProfileType";
  avatar: string;
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

export interface GetNotifictions_getNotifications_notifications_payload_city {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetNotifictions_getNotifications_notifications_payload {
  __typename: "CardType";
  id: string;
  city: GetNotifictions_getNotifications_notifications_payload_city | null;
  caption: string;
}

export interface GetNotifictions_getNotifications_notifications_comment {
  __typename: "CommentType";
  message: string;
}

export interface GetNotifictions_getNotifications_notifications {
  __typename: "NotificationType";
  id: string;
  actor: GetNotifictions_getNotifications_notifications_actor;
  verb: NotificationVerb;
  payload: GetNotifictions_getNotifications_notifications_payload | null;
  read: boolean;
  comment: GetNotifictions_getNotifications_notifications_comment | null;
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
// GraphQL query operation: GetMoveNotifications
// ====================================================

export interface GetMoveNotifications_getMoveNotifications_notifications_actor_profile_currentCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetMoveNotifications_getMoveNotifications_notifications_actor_profile {
  __typename: "ProfileType";
  avatar: string;
  currentCity: GetMoveNotifications_getMoveNotifications_notifications_actor_profile_currentCity | null;
}

export interface GetMoveNotifications_getMoveNotifications_notifications_actor {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetMoveNotifications_getMoveNotifications_notifications_actor_profile | null;
}

export interface GetMoveNotifications_getMoveNotifications_notifications_fromCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetMoveNotifications_getMoveNotifications_notifications_fromCountry {
  __typename: "CountryType";
  countryname: string | null;
  countrycode: string | null;
}

export interface GetMoveNotifications_getMoveNotifications_notifications_toCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface GetMoveNotifications_getMoveNotifications_notifications_toCountry {
  __typename: "CountryType";
  countryname: string | null;
  countrycode: string | null;
}

export interface GetMoveNotifications_getMoveNotifications_notifications {
  __typename: "MoveNotificationType";
  id: string;
  actor: GetMoveNotifications_getMoveNotifications_notifications_actor;
  verb: MoveNotificationVerb;
  fromCity: GetMoveNotifications_getMoveNotifications_notifications_fromCity | null;
  fromCountry: GetMoveNotifications_getMoveNotifications_notifications_fromCountry | null;
  toCity: GetMoveNotifications_getMoveNotifications_notifications_toCity | null;
  toCountry: GetMoveNotifications_getMoveNotifications_notifications_toCountry | null;
  createdAt: string | null;
}

export interface GetMoveNotifications_getMoveNotifications {
  __typename: "GetMoveNotificationsResponse";
  ok: boolean | null;
  notifications: (GetMoveNotifications_getMoveNotifications_notifications | null)[] | null;
}

export interface GetMoveNotifications {
  getMoveNotifications: GetMoveNotifications_getMoveNotifications;
}

export interface GetMoveNotificationsVariables {
  page: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MarkAsRead
// ====================================================

export interface MarkAsRead_markAsRead {
  __typename: "MarkAsReadResponse";
  ok: boolean | null;
}

export interface MarkAsRead {
  markAsRead: MarkAsRead_markAsRead;
}

export interface MarkAsReadVariables {
  notificationId: number;
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
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
  borderRadius: string;
  bgColor: string | null;
  font: string | null;
  fontColor: string | null;
  fontSize: string | null;
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

export interface searchTerms_searchUsers_users_profile_currentCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface searchTerms_searchUsers_users_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
  currentCity: searchTerms_searchUsers_users_profile_currentCity | null;
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
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
  borderRadius: string;
  bgColor: string | null;
  font: string | null;
  fontColor: string | null;
  fontSize: string | null;
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
// GraphQL mutation operation: UploadCard
// ====================================================

export interface UploadCard_uploadCard_card_country {
  __typename: "CountryType";
  countryname: string | null;
}

export interface UploadCard_uploadCard_card_city {
  __typename: "CityType";
  cityname: string | null;
}

export interface UploadCard_uploadCard_card_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface UploadCard_uploadCard_card_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: UploadCard_uploadCard_card_comments_creator | null;
}

export interface UploadCard_uploadCard_card_creator_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface UploadCard_uploadCard_card_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: UploadCard_uploadCard_card_creator_profile | null;
}

export interface UploadCard_uploadCard_card {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  country: UploadCard_uploadCard_card_country | null;
  city: UploadCard_uploadCard_card_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  createdAt: string | null;
  comments: (UploadCard_uploadCard_card_comments | null)[] | null;
  creator: UploadCard_uploadCard_card_creator;
}

export interface UploadCard_uploadCard {
  __typename: "UploadCardResponse";
  ok: boolean | null;
  card: UploadCard_uploadCard_card | null;
}

export interface UploadCard {
  uploadCard: UploadCard_uploadCard;
}

export interface UploadCardVariables {
  caption: string;
  fontColor?: string | null;
  font?: string | null;
  fontSize?: string | null;
  borderRadius: string;
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
// GraphQL query operation: Me
// ====================================================

export interface Me_me_user_profile_currentCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface Me_me_user_profile {
  __typename: "ProfileType";
  currentCity: Me_me_user_profile_currentCity | null;
}

export interface Me_me_user {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: Me_me_user_profile | null;
}

export interface Me_me {
  __typename: "UserProfileResponse";
  user: Me_me_user | null;
}

export interface Me {
  me: Me_me;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserParts
// ====================================================

export interface UserParts_profile_currentCity {
  __typename: "CityType";
  cityname: string | null;
}

export interface UserParts_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
  currentCity: UserParts_profile_currentCity | null;
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
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
  borderRadius: string;
  bgColor: string | null;
  font: string | null;
  fontColor: string | null;
  fontSize: string | null;
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

/**
 * An enumeration.
 */
export enum MoveNotificationVerb {
  MOVE = "MOVE",
}

//==============================================================
// END Enums and Input Objects
//==============================================================