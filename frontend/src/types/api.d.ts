

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleLikeCity
// ====================================================

export interface ToggleLikeCity_toggleLikeCity_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface ToggleLikeCity_toggleLikeCity_city {
  __typename: "CityType";
  id: string;
  isLiked: boolean | null;
  likeCount: number | null;
  country: ToggleLikeCity_toggleLikeCity_city_country;
}

export interface ToggleLikeCity_toggleLikeCity {
  __typename: "ToggleLikeCityResponse";
  ok: boolean | null;
  city: ToggleLikeCity_toggleLikeCity_city | null;
}

export interface ToggleLikeCity {
  toggleLikeCity: ToggleLikeCity_toggleLikeCity;
}

export interface ToggleLikeCityVariables {
  cityId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Match
// ====================================================

export interface Match_match_match_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface Match_match_match_city {
  __typename: "CityType";
  cityName: string | null;
  country: Match_match_match_city_country;
}

export interface Match_match_match_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface Match_match_match_host_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: Match_match_match_host_profile_currentCity_country;
}

export interface Match_match_match_host_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: Match_match_match_host_profile_currentCity | null;
}

export interface Match_match_match_host {
  __typename: "UserType";
  profile: Match_match_match_host_profile | null;
}

export interface Match_match_match_guest_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface Match_match_match_guest_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: Match_match_match_guest_profile_currentCity_country;
}

export interface Match_match_match_guest_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: Match_match_match_guest_profile_currentCity | null;
}

export interface Match_match_match_guest {
  __typename: "UserType";
  profile: Match_match_match_guest_profile | null;
}

export interface Match_match_match_coffee {
  __typename: "CoffeeType";
  id: string;
  target: CoffeeTarget;
}

export interface Match_match_match {
  __typename: "MatchType";
  id: string;
  naturalTime: string | null;
  city: Match_match_match_city | null;
  host: Match_match_match_host | null;
  guest: Match_match_match_guest | null;
  coffee: Match_match_match_coffee | null;
  isHost: boolean | null;
  isGuest: boolean | null;
  isMatching: boolean | null;
}

export interface Match_match {
  __typename: "MatchResponse";
  ok: boolean | null;
  coffeeId: number | null;
  match: Match_match_match | null;
}

export interface Match {
  match: Match_match;
}

export interface MatchVariables {
  coffeeId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnMatch
// ====================================================

export interface UnMatch_unMatch_coffee_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface UnMatch_unMatch_coffee_city {
  __typename: "CityType";
  cityName: string | null;
  country: UnMatch_unMatch_coffee_city_country;
}

export interface UnMatch_unMatch_coffee_host_profile {
  __typename: "ProfileType";
  avatar: string;
  isSelf: boolean | null;
}

export interface UnMatch_unMatch_coffee_host {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: UnMatch_unMatch_coffee_host_profile | null;
}

export interface UnMatch_unMatch_coffee {
  __typename: "CoffeeType";
  id: string;
  city: UnMatch_unMatch_coffee_city;
  host: UnMatch_unMatch_coffee_host;
  status: string | null;
  expires: any | null;
  target: CoffeeTarget;
  createdAt: any;
}

export interface UnMatch_unMatch {
  __typename: "UnMatchResponse";
  ok: boolean | null;
  matchId: number | null;
  coffee: UnMatch_unMatch_coffee | null;
}

export interface UnMatch {
  unMatch: UnMatch_unMatch;
}

export interface UnMatchVariables {
  matchId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_getComments_comments_creator_profile {
  __typename: "ProfileType";
  isSelf: boolean | null;
}

export interface GetComments_getComments_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetComments_getComments_comments_creator_profile | null;
}

export interface GetComments_getComments_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  edited: boolean;
  creator: GetComments_getComments_comments_creator | null;
  isLiked: boolean | null;
}

export interface GetComments_getComments {
  __typename: "GetCommentsResponse";
  comments: (GetComments_getComments_comments | null)[] | null;
}

export interface GetComments {
  getComments: GetComments_getComments;
}

export interface GetCommentsVariables {
  cardId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditComment
// ====================================================

export interface EditComment_editComment_comment_creator_profile {
  __typename: "ProfileType";
  isSelf: boolean | null;
}

export interface EditComment_editComment_comment_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: EditComment_editComment_comment_creator_profile | null;
}

export interface EditComment_editComment_comment {
  __typename: "CommentType";
  id: string;
  message: string;
  edited: boolean;
  creator: EditComment_editComment_comment_creator | null;
  isLiked: boolean | null;
}

export interface EditComment_editComment {
  __typename: "EditCommentResponse";
  comment: EditComment_editComment_comment | null;
}

export interface EditComment {
  editComment: EditComment_editComment;
}

export interface EditCommentVariables {
  cardId: number;
  commentId: number;
  message: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleLikeComment
// ====================================================

export interface ToggleLikeComment_toggleLikeComment_comment {
  __typename: "CommentType";
  isLiked: boolean | null;
}

export interface ToggleLikeComment_toggleLikeComment {
  __typename: "ToggleLikeCommentResponse";
  ok: boolean | null;
  comment: ToggleLikeComment_toggleLikeComment_comment | null;
}

export interface ToggleLikeComment {
  toggleLikeComment: ToggleLikeComment_toggleLikeComment;
}

export interface ToggleLikeCommentVariables {
  cardId: number;
  commentId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FollowUser
// ====================================================

export interface FollowUser_followUser_user_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface FollowUser_followUser_user_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: FollowUser_followUser_user_profile_currentCity_country;
}

export interface FollowUser_followUser_user_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: FollowUser_followUser_user_profile_currentCity | null;
}

export interface FollowUser_followUser_user {
  __typename: "UserType";
  profile: FollowUser_followUser_user_profile | null;
}

export interface FollowUser_followUser {
  __typename: "FollowUnfollowResponse";
  ok: boolean | null;
  user: FollowUser_followUser_user | null;
}

export interface FollowUser {
  followUser: FollowUser_followUser;
}

export interface FollowUserVariables {
  userId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCards
// ====================================================

export interface GetCards_getCards_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
}

export interface GetCards_getCards {
  __typename: "GetCardsResponse";
  page: number | null;
  hasNextPage: boolean | null;
  cards: (GetCards_getCards_cards | null)[] | null;
}

export interface GetCards {
  getCards: GetCards_getCards;
}

export interface GetCardsVariables {
  page?: number | null;
  location: string;
  cityName?: string | null;
  countryName?: string | null;
  continentName?: string | null;
  userName?: string | null;
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
// GraphQL mutation operation: ToggleLikeCard
// ====================================================

export interface ToggleLikeCard_toggleLikeCard_card {
  __typename: "CardType";
  isLiked: boolean | null;
  likeCount: number | null;
}

export interface ToggleLikeCard_toggleLikeCard {
  __typename: "ToggleLikeCardResponse";
  ok: boolean | null;
  card: ToggleLikeCard_toggleLikeCard_card | null;
}

export interface ToggleLikeCard {
  toggleLikeCard: ToggleLikeCard_toggleLikeCard;
}

export interface ToggleLikeCardVariables {
  cardId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditCard
// ====================================================

export interface EditCard_editCard_card_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface EditCard_editCard_card_city {
  __typename: "CityType";
  cityName: string | null;
  country: EditCard_editCard_card_city_country;
}

export interface EditCard_editCard_card_creator_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface EditCard_editCard_card_creator {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: EditCard_editCard_card_creator_profile | null;
}

export interface EditCard_editCard_card {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  city: EditCard_editCard_card_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
  creator: EditCard_editCard_card_creator;
}

export interface EditCard_editCard {
  __typename: "EditCardResponse";
  card: EditCard_editCard_card | null;
}

export interface EditCard {
  editCard: EditCard_editCard;
}

export interface EditCardVariables {
  cardId: number;
  cityName?: string | null;
  caption?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCard
// ====================================================

export interface DeleteCard_deleteCard {
  __typename: "DeleteCardResponse";
  ok: boolean | null;
  cardId: number | null;
}

export interface DeleteCard {
  deleteCard: DeleteCard_deleteCard;
}

export interface DeleteCardVariables {
  cardId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddComment
// ====================================================

export interface AddComment_addComment_comment_creator_profile {
  __typename: "ProfileType";
  isSelf: boolean | null;
}

export interface AddComment_addComment_comment_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: AddComment_addComment_comment_creator_profile | null;
}

export interface AddComment_addComment_comment {
  __typename: "CommentType";
  id: string;
  message: string;
  edited: boolean;
  creator: AddComment_addComment_comment_creator | null;
  isLiked: boolean | null;
}

export interface AddComment_addComment {
  __typename: "AddCommentResponse";
  comment: AddComment_addComment_comment | null;
}

export interface AddComment {
  addComment: AddComment_addComment;
}

export interface AddCommentVariables {
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
  cardId: number | null;
  commentId: number | null;
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
// GraphQL query operation: CardDetail
// ====================================================

export interface CardDetail_cardDetail_card_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CardDetail_cardDetail_card_city {
  __typename: "CityType";
  cityName: string | null;
  country: CardDetail_cardDetail_card_city_country;
}

export interface CardDetail_cardDetail_card_creator_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface CardDetail_cardDetail_card_creator {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: CardDetail_cardDetail_card_creator_profile | null;
}

export interface CardDetail_cardDetail_card {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  city: CardDetail_cardDetail_card_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
  creator: CardDetail_cardDetail_card_creator;
}

export interface CardDetail_cardDetail {
  __typename: "CardDetailResponse";
  card: CardDetail_cardDetail_card | null;
}

export interface CardDetail {
  cardDetail: CardDetail_cardDetail;
}

export interface CardDetailVariables {
  cardId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FrequentVisits
// ====================================================

export interface FrequentVisits_frequentVisits_cities_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface FrequentVisits_frequentVisits_cities {
  __typename: "CityType";
  count: number | null;
  diff: number | null;
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: FrequentVisits_frequentVisits_cities_country;
  likeCount: number | null;
  isLiked: boolean | null;
}

export interface FrequentVisits_frequentVisits {
  __typename: "CitiesResponse";
  cities: (FrequentVisits_frequentVisits_cities | null)[] | null;
}

export interface FrequentVisits {
  frequentVisits: FrequentVisits_frequentVisits;
}

export interface FrequentVisitsVariables {
  userName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CityProfile
// ====================================================

export interface CityProfile_cityProfile_usersNow_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CityProfile_cityProfile_usersNow_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CityProfile_cityProfile_usersNow_profile_currentCity_country;
}

export interface CityProfile_cityProfile_usersNow_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: CityProfile_cityProfile_usersNow_profile_currentCity | null;
}

export interface CityProfile_cityProfile_usersNow {
  __typename: "UserType";
  profile: CityProfile_cityProfile_usersNow_profile | null;
}

export interface CityProfile_cityProfile_usersBefore_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CityProfile_cityProfile_usersBefore_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CityProfile_cityProfile_usersBefore_actor_profile_currentCity_country;
}

export interface CityProfile_cityProfile_usersBefore_actor_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: CityProfile_cityProfile_usersBefore_actor_profile_currentCity | null;
}

export interface CityProfile_cityProfile_usersBefore_actor {
  __typename: "UserType";
  profile: CityProfile_cityProfile_usersBefore_actor_profile | null;
}

export interface CityProfile_cityProfile_usersBefore {
  __typename: "MoveNotificationType";
  actor: CityProfile_cityProfile_usersBefore_actor;
}

export interface CityProfile_cityProfile_coffees_host_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface CityProfile_cityProfile_coffees_host {
  __typename: "UserType";
  profile: CityProfile_cityProfile_coffees_host_profile | null;
}

export interface CityProfile_cityProfile_coffees {
  __typename: "CoffeeType";
  id: string;
  target: CoffeeTarget;
  host: CityProfile_cityProfile_coffees_host;
}

export interface CityProfile_cityProfile_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  countryCode: string | null;
}

export interface CityProfile_cityProfile_city {
  __typename: "CityType";
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: CityProfile_cityProfile_city_country;
  likeCount: number | null;
  isLiked: boolean | null;
  cardCount: number | null;
  userCount: number | null;
  userLogCount: number | null;
}

export interface CityProfile_cityProfile {
  __typename: "FirstAnnotateRespose";
  usersNow: (CityProfile_cityProfile_usersNow | null)[] | null;
  usersBefore: (CityProfile_cityProfile_usersBefore | null)[] | null;
  coffees: (CityProfile_cityProfile_coffees | null)[] | null;
  city: CityProfile_cityProfile_city | null;
}

export interface CityProfile {
  cityProfile: CityProfile_cityProfile;
}

export interface CityProfileVariables {
  page?: number | null;
  cityName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NearCities
// ====================================================

export interface NearCities_nearCities_cities_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface NearCities_nearCities_cities {
  __typename: "CityType";
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: NearCities_nearCities_cities_country;
  likeCount: number | null;
  isLiked: boolean | null;
}

export interface NearCities_nearCities {
  __typename: "CitiesResponse";
  cities: (NearCities_nearCities_cities | null)[] | null;
}

export interface NearCities {
  nearCities: NearCities_nearCities;
}

export interface NearCitiesVariables {
  cityName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CoffeeDetail
// ====================================================

export interface CoffeeDetail_coffeeDetail_coffee_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CoffeeDetail_coffeeDetail_coffee_host_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CoffeeDetail_coffeeDetail_coffee_host_profile_currentCity_country;
}

export interface CoffeeDetail_coffeeDetail_coffee_host_profile_nationality {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CoffeeDetail_coffeeDetail_coffee_host_profile {
  __typename: "ProfileType";
  isSelf: boolean | null;
  avatar: string;
  gender: string | null;
  currentCity: CoffeeDetail_coffeeDetail_coffee_host_profile_currentCity | null;
  isFollowing: boolean | null;
  nationality: CoffeeDetail_coffeeDetail_coffee_host_profile_nationality | null;
  followersCount: number | null;
  followingCount: number | null;
  tripCount: number | null;
}

export interface CoffeeDetail_coffeeDetail_coffee_host {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: CoffeeDetail_coffeeDetail_coffee_host_profile | null;
}

export interface CoffeeDetail_coffeeDetail_coffee {
  __typename: "CoffeeType";
  id: string;
  expires: any | null;
  naturalTime: string | null;
  status: string | null;
  target: CoffeeTarget;
  host: CoffeeDetail_coffeeDetail_coffee_host;
}

export interface CoffeeDetail_coffeeDetail {
  __typename: "CoffeeDetailResponse";
  coffee: CoffeeDetail_coffeeDetail_coffee | null;
}

export interface CoffeeDetail {
  coffeeDetail: CoffeeDetail_coffeeDetail;
}

export interface CoffeeDetailVariables {
  coffeeId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCoffees
// ====================================================

export interface GetCoffees_getCoffees_coffees_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetCoffees_getCoffees_coffees_city {
  __typename: "CityType";
  cityName: string | null;
  country: GetCoffees_getCoffees_coffees_city_country;
}

export interface GetCoffees_getCoffees_coffees_host_profile {
  __typename: "ProfileType";
  avatar: string;
  isSelf: boolean | null;
}

export interface GetCoffees_getCoffees_coffees_host {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetCoffees_getCoffees_coffees_host_profile | null;
}

export interface GetCoffees_getCoffees_coffees {
  __typename: "CoffeeType";
  id: string;
  city: GetCoffees_getCoffees_coffees_city;
  host: GetCoffees_getCoffees_coffees_host;
  status: string | null;
  expires: any | null;
  target: CoffeeTarget;
  createdAt: any;
}

export interface GetCoffees_getCoffees {
  __typename: "GetCoffeesResponse";
  coffees: (GetCoffees_getCoffees_coffees | null)[] | null;
}

export interface GetCoffees {
  getCoffees: GetCoffees_getCoffees;
}

export interface GetCoffeesVariables {
  cityName?: string | null;
  userName?: string | null;
  location: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContinentProfile
// ====================================================

export interface ContinentProfile_continentProfile_usersNow_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface ContinentProfile_continentProfile_usersNow_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: ContinentProfile_continentProfile_usersNow_profile_currentCity_country;
}

export interface ContinentProfile_continentProfile_usersNow_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: ContinentProfile_continentProfile_usersNow_profile_currentCity | null;
}

export interface ContinentProfile_continentProfile_usersNow {
  __typename: "UserType";
  profile: ContinentProfile_continentProfile_usersNow_profile | null;
}

export interface ContinentProfile_continentProfile_usersBefore_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface ContinentProfile_continentProfile_usersBefore_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: ContinentProfile_continentProfile_usersBefore_actor_profile_currentCity_country;
}

export interface ContinentProfile_continentProfile_usersBefore_actor_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: ContinentProfile_continentProfile_usersBefore_actor_profile_currentCity | null;
}

export interface ContinentProfile_continentProfile_usersBefore_actor {
  __typename: "UserType";
  profile: ContinentProfile_continentProfile_usersBefore_actor_profile | null;
}

export interface ContinentProfile_continentProfile_usersBefore {
  __typename: "MoveNotificationType";
  actor: ContinentProfile_continentProfile_usersBefore_actor;
}

export interface ContinentProfile_continentProfile_coffees_host_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface ContinentProfile_continentProfile_coffees_host {
  __typename: "UserType";
  profile: ContinentProfile_continentProfile_coffees_host_profile | null;
}

export interface ContinentProfile_continentProfile_coffees {
  __typename: "CoffeeType";
  id: string;
  target: CoffeeTarget;
  host: ContinentProfile_continentProfile_coffees_host;
}

export interface ContinentProfile_continentProfile_continent {
  __typename: "ContinentType";
  continentName: string | null;
  continentPhoto: string | null;
  countryCount: number | null;
}

export interface ContinentProfile_continentProfile_countries_continent {
  __typename: "ContinentType";
  continentName: string | null;
}

export interface ContinentProfile_continentProfile_countries {
  __typename: "CountryType";
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  continent: ContinentProfile_continentProfile_countries_continent | null;
  cityCount: number | null;
  cardCount: number | null;
}

export interface ContinentProfile_continentProfile {
  __typename: "ThirdAnnotateRespose";
  usersNow: (ContinentProfile_continentProfile_usersNow | null)[] | null;
  usersBefore: (ContinentProfile_continentProfile_usersBefore | null)[] | null;
  coffees: (ContinentProfile_continentProfile_coffees | null)[] | null;
  continent: ContinentProfile_continentProfile_continent | null;
  countries: (ContinentProfile_continentProfile_countries | null)[] | null;
}

export interface ContinentProfile {
  continentProfile: ContinentProfile_continentProfile;
}

export interface ContinentProfileVariables {
  page?: number | null;
  continentName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TopCountries
// ====================================================

export interface TopCountries_topCountries_countries_continent {
  __typename: "ContinentType";
  continentName: string | null;
}

export interface TopCountries_topCountries_countries {
  __typename: "CountryType";
  count: number | null;
  diff: number | null;
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  continent: TopCountries_topCountries_countries_continent | null;
}

export interface TopCountries_topCountries {
  __typename: "CountriesResponse";
  countries: (TopCountries_topCountries_countries | null)[] | null;
}

export interface TopCountries {
  topCountries: TopCountries_topCountries;
}

export interface TopCountriesVariables {
  userName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CountryProfile
// ====================================================

export interface CountryProfile_countryProfile_country_continent {
  __typename: "ContinentType";
  continentPhoto: string | null;
  continentName: string | null;
}

export interface CountryProfile_countryProfile_country {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  cityCount: number | null;
  cardCount: number | null;
  continent: CountryProfile_countryProfile_country_continent | null;
}

export interface CountryProfile_countryProfile_usersNow_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CountryProfile_countryProfile_usersNow_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CountryProfile_countryProfile_usersNow_profile_currentCity_country;
}

export interface CountryProfile_countryProfile_usersNow_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: CountryProfile_countryProfile_usersNow_profile_currentCity | null;
}

export interface CountryProfile_countryProfile_usersNow {
  __typename: "UserType";
  profile: CountryProfile_countryProfile_usersNow_profile | null;
}

export interface CountryProfile_countryProfile_usersBefore_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CountryProfile_countryProfile_usersBefore_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CountryProfile_countryProfile_usersBefore_actor_profile_currentCity_country;
}

export interface CountryProfile_countryProfile_usersBefore_actor_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: CountryProfile_countryProfile_usersBefore_actor_profile_currentCity | null;
}

export interface CountryProfile_countryProfile_usersBefore_actor {
  __typename: "UserType";
  profile: CountryProfile_countryProfile_usersBefore_actor_profile | null;
}

export interface CountryProfile_countryProfile_usersBefore {
  __typename: "MoveNotificationType";
  actor: CountryProfile_countryProfile_usersBefore_actor;
}

export interface CountryProfile_countryProfile_coffees_host_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface CountryProfile_countryProfile_coffees_host {
  __typename: "UserType";
  profile: CountryProfile_countryProfile_coffees_host_profile | null;
}

export interface CountryProfile_countryProfile_coffees {
  __typename: "CoffeeType";
  id: string;
  target: CoffeeTarget;
  host: CountryProfile_countryProfile_coffees_host;
}

export interface CountryProfile_countryProfile_cities_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CountryProfile_countryProfile_cities {
  __typename: "CityType";
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: CountryProfile_countryProfile_cities_country;
  likeCount: number | null;
  isLiked: boolean | null;
}

export interface CountryProfile_countryProfile {
  __typename: "SecondAnnotateRespose";
  country: CountryProfile_countryProfile_country | null;
  usersNow: (CountryProfile_countryProfile_usersNow | null)[] | null;
  usersBefore: (CountryProfile_countryProfile_usersBefore | null)[] | null;
  coffees: (CountryProfile_countryProfile_coffees | null)[] | null;
  cities: (CountryProfile_countryProfile_cities | null)[] | null;
}

export interface CountryProfile {
  countryProfile: CountryProfile_countryProfile;
}

export interface CountryProfileVariables {
  page?: number | null;
  countryName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LatestCities
// ====================================================

export interface LatestCities_latestCities_cities_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface LatestCities_latestCities_cities {
  __typename: "CityType";
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: LatestCities_latestCities_cities_country;
  likeCount: number | null;
  isLiked: boolean | null;
}

export interface LatestCities_latestCities {
  __typename: "CitiesResponse";
  cities: (LatestCities_latestCities_cities | null)[] | null;
}

export interface LatestCities {
  latestCities: LatestCities_latestCities;
}

export interface LatestCitiesVariables {
  latestCityPage?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Feed
// ====================================================

export interface Feed_feed_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  countryCode: string | null;
}

export interface Feed_feed_city {
  __typename: "CityType";
  cityName: string | null;
  cityPhoto: string | null;
  country: Feed_feed_city_country;
  userCount: number | null;
  userLogCount: number | null;
}

export interface Feed_feed {
  __typename: "FeedResponse";
  city: Feed_feed_city | null;
}

export interface Feed {
  feed: Feed_feed;
}

export interface FeedVariables {
  cityName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFeedCards
// ====================================================

export interface GetFeedCards_getFeedCards_cards_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetFeedCards_getFeedCards_cards_city {
  __typename: "CityType";
  cityName: string | null;
  country: GetFeedCards_getFeedCards_cards_city_country;
}

export interface GetFeedCards_getFeedCards_cards_creator_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface GetFeedCards_getFeedCards_cards_creator {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetFeedCards_getFeedCards_cards_creator_profile | null;
}

export interface GetFeedCards_getFeedCards_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  city: GetFeedCards_getFeedCards_cards_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
  creator: GetFeedCards_getFeedCards_cards_creator;
}

export interface GetFeedCards_getFeedCards {
  __typename: "GetCardsResponse";
  cards: (GetFeedCards_getFeedCards_cards | null)[] | null;
  hasNextPage: boolean | null;
  page: number | null;
}

export interface GetFeedCards {
  getFeedCards: GetFeedCards_getFeedCards;
}

export interface GetFeedCardsVariables {
  page?: number | null;
  cityName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecommandUsers
// ====================================================

export interface RecommandUsers_recommandUsers_users_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface RecommandUsers_recommandUsers_users_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: RecommandUsers_recommandUsers_users_profile_currentCity_country;
}

export interface RecommandUsers_recommandUsers_users_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: RecommandUsers_recommandUsers_users_profile_currentCity | null;
}

export interface RecommandUsers_recommandUsers_users {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: RecommandUsers_recommandUsers_users_profile | null;
}

export interface RecommandUsers_recommandUsers {
  __typename: "RecommandUsersResponse";
  users: (RecommandUsers_recommandUsers_users | null)[] | null;
}

export interface RecommandUsers {
  recommandUsers: RecommandUsers_recommandUsers;
}

export interface RecommandUsersVariables {
  recommandUserPage?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RequestCoffee
// ====================================================

export interface RequestCoffee_requestCoffee_coffee_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface RequestCoffee_requestCoffee_coffee_city {
  __typename: "CityType";
  cityName: string | null;
  country: RequestCoffee_requestCoffee_coffee_city_country;
}

export interface RequestCoffee_requestCoffee_coffee_host_profile {
  __typename: "ProfileType";
  avatar: string;
  isSelf: boolean | null;
}

export interface RequestCoffee_requestCoffee_coffee_host {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: RequestCoffee_requestCoffee_coffee_host_profile | null;
}

export interface RequestCoffee_requestCoffee_coffee {
  __typename: "CoffeeType";
  id: string;
  city: RequestCoffee_requestCoffee_coffee_city;
  host: RequestCoffee_requestCoffee_coffee_host;
  status: string | null;
  expires: any | null;
  target: CoffeeTarget;
  createdAt: any;
}

export interface RequestCoffee_requestCoffee {
  __typename: "RequestCoffeeResponse";
  ok: boolean | null;
  coffee: RequestCoffee_requestCoffee_coffee | null;
}

export interface RequestCoffee {
  requestCoffee: RequestCoffee_requestCoffee;
}

export interface RequestCoffeeVariables {
  currentCity: string;
  target?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFollowers
// ====================================================

export interface GetFollowers_getFollowers_profiles_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetFollowers_getFollowers_profiles_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetFollowers_getFollowers_profiles_currentCity_country;
}

export interface GetFollowers_getFollowers_profiles {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: GetFollowers_getFollowers_profiles_currentCity | null;
}

export interface GetFollowers_getFollowers {
  __typename: "ProfileListResponse";
  profiles: (GetFollowers_getFollowers_profiles | null)[] | null;
}

export interface GetFollowers {
  getFollowers: GetFollowers_getFollowers;
}

export interface GetFollowersVariables {
  userName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFollowings
// ====================================================

export interface GetFollowings_getFollowings_profiles_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetFollowings_getFollowings_profiles_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetFollowings_getFollowings_profiles_currentCity_country;
}

export interface GetFollowings_getFollowings_profiles {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: GetFollowings_getFollowings_profiles_currentCity | null;
}

export interface GetFollowings_getFollowings {
  __typename: "ProfileListResponse";
  profiles: (GetFollowings_getFollowings_profiles | null)[] | null;
}

export interface GetFollowings {
  getFollowings: GetFollowings_getFollowings;
}

export interface GetFollowingsVariables {
  userName: string;
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
  currentContinent: string;
  cityPhotoURL: string;
  countryPhotoURL: string;
  continentPhotoURL: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMatches
// ====================================================

export interface GetMatches_getMatches_matches_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetMatches_getMatches_matches_city {
  __typename: "CityType";
  cityName: string | null;
  country: GetMatches_getMatches_matches_city_country;
}

export interface GetMatches_getMatches_matches_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetMatches_getMatches_matches_host_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetMatches_getMatches_matches_host_profile_currentCity_country;
}

export interface GetMatches_getMatches_matches_host_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: GetMatches_getMatches_matches_host_profile_currentCity | null;
}

export interface GetMatches_getMatches_matches_host {
  __typename: "UserType";
  profile: GetMatches_getMatches_matches_host_profile | null;
}

export interface GetMatches_getMatches_matches_guest_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetMatches_getMatches_matches_guest_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetMatches_getMatches_matches_guest_profile_currentCity_country;
}

export interface GetMatches_getMatches_matches_guest_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: GetMatches_getMatches_matches_guest_profile_currentCity | null;
}

export interface GetMatches_getMatches_matches_guest {
  __typename: "UserType";
  profile: GetMatches_getMatches_matches_guest_profile | null;
}

export interface GetMatches_getMatches_matches_coffee {
  __typename: "CoffeeType";
  id: string;
  target: CoffeeTarget;
}

export interface GetMatches_getMatches_matches {
  __typename: "MatchType";
  id: string;
  naturalTime: string | null;
  city: GetMatches_getMatches_matches_city | null;
  host: GetMatches_getMatches_matches_host | null;
  guest: GetMatches_getMatches_matches_guest | null;
  coffee: GetMatches_getMatches_matches_coffee | null;
  isHost: boolean | null;
  isGuest: boolean | null;
  isMatching: boolean | null;
}

export interface GetMatches_getMatches {
  __typename: "GetMatchesResponse";
  matches: (GetMatches_getMatches_matches | null)[] | null;
}

export interface GetMatches {
  getMatches: GetMatches_getMatches;
}

export interface GetMatchesVariables {
  matchPage?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNotifications
// ====================================================

export interface GetNotifications_getNotifications_notifications_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetNotifications_getNotifications_notifications_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetNotifications_getNotifications_notifications_actor_profile_currentCity_country;
}

export interface GetNotifications_getNotifications_notifications_actor_profile {
  __typename: "ProfileType";
  avatar: string;
  currentCity: GetNotifications_getNotifications_notifications_actor_profile_currentCity | null;
}

export interface GetNotifications_getNotifications_notifications_actor {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetNotifications_getNotifications_notifications_actor_profile | null;
}

export interface GetNotifications_getNotifications_notifications_card {
  __typename: "CardType";
  id: string;
}

export interface GetNotifications_getNotifications_notifications_comment {
  __typename: "CommentType";
  id: string;
  message: string;
}

export interface GetNotifications_getNotifications_notifications_match {
  __typename: "MatchType";
  id: string;
}

export interface GetNotifications_getNotifications_notifications {
  __typename: "NotificationType";
  id: string;
  actor: GetNotifications_getNotifications_notifications_actor;
  verb: NotificationVerb;
  card: GetNotifications_getNotifications_notifications_card | null;
  comment: GetNotifications_getNotifications_notifications_comment | null;
  match: GetNotifications_getNotifications_notifications_match | null;
  read: boolean;
  naturalTime: string | null;
}

export interface GetNotifications_getNotifications {
  __typename: "GetNotificationsResponse";
  page: number | null;
  hasNextPage: boolean | null;
  notifications: (GetNotifications_getNotifications_notifications | null)[] | null;
}

export interface GetNotifications {
  getNotifications: GetNotifications_getNotifications;
}

export interface GetNotificationsVariables {
  page?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MarkAsRead
// ====================================================

export interface MarkAsRead_markAsRead {
  __typename: "MarkAsReadResponse";
  notificationId: number | null;
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
// GraphQL query operation: SearchTerms
// ====================================================

export interface SearchTerms_searchUsers_users_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface SearchTerms_searchUsers_users_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: SearchTerms_searchUsers_users_profile_currentCity_country;
}

export interface SearchTerms_searchUsers_users_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: SearchTerms_searchUsers_users_profile_currentCity | null;
}

export interface SearchTerms_searchUsers_users {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: SearchTerms_searchUsers_users_profile | null;
}

export interface SearchTerms_searchUsers {
  __typename: "SearchUsersResponse";
  users: (SearchTerms_searchUsers_users | null)[] | null;
}

export interface SearchTerms_searchCards_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
}

export interface SearchTerms_searchCards {
  __typename: "SearchCardsResponse";
  cards: (SearchTerms_searchCards_cards | null)[] | null;
}

export interface SearchTerms_searchCities_cities_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface SearchTerms_searchCities_cities {
  __typename: "CityType";
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: SearchTerms_searchCities_cities_country;
  likeCount: number | null;
  isLiked: boolean | null;
}

export interface SearchTerms_searchCities {
  __typename: "CitiesResponse";
  cities: (SearchTerms_searchCities_cities | null)[] | null;
}

export interface SearchTerms_searchCountries_countries_continent {
  __typename: "ContinentType";
  continentName: string | null;
}

export interface SearchTerms_searchCountries_countries {
  __typename: "CountryType";
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  continent: SearchTerms_searchCountries_countries_continent | null;
}

export interface SearchTerms_searchCountries {
  __typename: "CountriesResponse";
  countries: (SearchTerms_searchCountries_countries | null)[] | null;
}

export interface SearchTerms_searchContinents_continents {
  __typename: "ContinentType";
  id: string;
  continentName: string | null;
  continentPhoto: string | null;
}

export interface SearchTerms_searchContinents {
  __typename: "ContinentsResponse";
  continents: (SearchTerms_searchContinents_continents | null)[] | null;
}

export interface SearchTerms {
  searchUsers: SearchTerms_searchUsers;
  searchCards: SearchTerms_searchCards;
  searchCities: SearchTerms_searchCities;
  searchCountries: SearchTerms_searchCountries;
  searchContinents: SearchTerms_searchContinents;
}

export interface SearchTermsVariables {
  term: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TripProfile
// ====================================================

export interface TripProfile_tripProfile_usersBefore_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface TripProfile_tripProfile_usersBefore_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: TripProfile_tripProfile_usersBefore_actor_profile_currentCity_country;
}

export interface TripProfile_tripProfile_usersBefore_actor_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: TripProfile_tripProfile_usersBefore_actor_profile_currentCity | null;
}

export interface TripProfile_tripProfile_usersBefore_actor {
  __typename: "UserType";
  profile: TripProfile_tripProfile_usersBefore_actor_profile | null;
}

export interface TripProfile_tripProfile_usersBefore {
  __typename: "MoveNotificationType";
  actor: TripProfile_tripProfile_usersBefore_actor;
}

export interface TripProfile_tripProfile_coffees_host_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface TripProfile_tripProfile_coffees_host {
  __typename: "UserType";
  profile: TripProfile_tripProfile_coffees_host_profile | null;
}

export interface TripProfile_tripProfile_coffees {
  __typename: "CoffeeType";
  id: string;
  target: CoffeeTarget;
  host: TripProfile_tripProfile_coffees_host;
}

export interface TripProfile_tripProfile_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  countryCode: string | null;
}

export interface TripProfile_tripProfile_city {
  __typename: "CityType";
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: TripProfile_tripProfile_city_country;
  cardCount: number | null;
  userCount: number | null;
  userLogCount: number | null;
}

export interface TripProfile_tripProfile {
  __typename: "TripProfileResponse";
  usersBefore: (TripProfile_tripProfile_usersBefore | null)[] | null;
  userCount: number | null;
  coffees: (TripProfile_tripProfile_coffees | null)[] | null;
  city: TripProfile_tripProfile_city | null;
}

export interface TripProfile {
  tripProfile: TripProfile_tripProfile;
}

export interface TripProfileVariables {
  cityName: string;
  startDate: any;
  endDate: any;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDurationCards
// ====================================================

export interface GetDurationCards_getDurationCards_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
}

export interface GetDurationCards_getDurationCards {
  __typename: "DurationCardsResponse";
  hasNextPage: boolean | null;
  cards: (GetDurationCards_getDurationCards_cards | null)[] | null;
}

export interface GetDurationCards {
  getDurationCards: GetDurationCards_getDurationCards;
}

export interface GetDurationCardsVariables {
  page?: number | null;
  cityName: string;
  startDate: any;
  endDate: any;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadCard
// ====================================================

export interface UploadCard_uploadCard_card_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface UploadCard_uploadCard_card_city {
  __typename: "CityType";
  cityName: string | null;
  country: UploadCard_uploadCard_card_city_country;
}

export interface UploadCard_uploadCard_card_creator_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface UploadCard_uploadCard_card_creator {
  __typename: "UserType";
  id: string;
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
  city: UploadCard_uploadCard_card_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
  creator: UploadCard_uploadCard_card_creator;
}

export interface UploadCard_uploadCard {
  __typename: "UploadCardResponse";
  card: UploadCard_uploadCard_card | null;
}

export interface UploadCard {
  uploadCard: UploadCard_uploadCard;
}

export interface UploadCardVariables {
  caption: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserList
// ====================================================

export interface UserList_userList_users_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface UserList_userList_users_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: UserList_userList_users_profile_currentCity_country;
}

export interface UserList_userList_users_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: UserList_userList_users_profile_currentCity | null;
}

export interface UserList_userList_users {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: UserList_userList_users_profile | null;
}

export interface UserList_userList {
  __typename: "UserListResponse";
  users: (UserList_userList_users | null)[] | null;
}

export interface UserList {
  userList: UserList_userList;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfile
// ====================================================

export interface UserProfile_userProfile_user_profile_followings_user_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface UserProfile_userProfile_user_profile_followings_user {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: UserProfile_userProfile_user_profile_followings_user_profile | null;
}

export interface UserProfile_userProfile_user_profile_followings {
  __typename: "ProfileType";
  id: string;
  user: UserProfile_userProfile_user_profile_followings_user;
}

export interface UserProfile_userProfile_user_profile_followers_user_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface UserProfile_userProfile_user_profile_followers_user {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: UserProfile_userProfile_user_profile_followers_user_profile | null;
}

export interface UserProfile_userProfile_user_profile_followers {
  __typename: "ProfileType";
  id: string;
  user: UserProfile_userProfile_user_profile_followers_user;
}

export interface UserProfile_userProfile_user_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
}

export interface UserProfile_userProfile_user_profile_currentCity {
  __typename: "CityType";
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: UserProfile_userProfile_user_profile_currentCity_country;
}

export interface UserProfile_userProfile_user_profile {
  __typename: "ProfileType";
  bio: string | null;
  gender: string | null;
  avatar: string;
  website: string | null;
  postCount: number | null;
  followersCount: number | null;
  followingCount: number | null;
  tripCount: number | null;
  cityCount: number | null;
  countryCount: number | null;
  continentCount: number | null;
  followings: (UserProfile_userProfile_user_profile_followings | null)[] | null;
  followers: (UserProfile_userProfile_user_profile_followers | null)[] | null;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: UserProfile_userProfile_user_profile_currentCity | null;
}

export interface UserProfile_userProfile_user {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  firstName: string;
  lastName: string;
  profile: UserProfile_userProfile_user_profile | null;
}

export interface UserProfile_userProfile {
  __typename: "UserProfileResponse";
  user: UserProfile_userProfile_user | null;
}

export interface UserProfile {
  userProfile: UserProfile_userProfile;
}

export interface UserProfileVariables {
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
// GraphQL query operation: GetTrips
// ====================================================

export interface GetTrips_getTrips_trip_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
}

export interface GetTrips_getTrips_trip_city {
  __typename: "CityType";
  cityName: string | null;
  cityPhoto: string | null;
  country: GetTrips_getTrips_trip_city_country;
}

export interface GetTrips_getTrips_trip {
  __typename: "MoveNotificationType";
  id: string;
  city: GetTrips_getTrips_trip_city | null;
  startDate: any | null;
  endDate: any | null;
  naturalTime: string | null;
  diffDays: number | null;
}

export interface GetTrips_getTrips {
  __typename: "TripResponse";
  trip: (GetTrips_getTrips_trip | null)[] | null;
}

export interface GetTrips {
  getTrips: GetTrips_getTrips;
}

export interface GetTripsVariables {
  username: string;
  tripPage?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddTrip
// ====================================================

export interface AddTrip_addTrip_moveNotification_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
}

export interface AddTrip_addTrip_moveNotification_city {
  __typename: "CityType";
  cityName: string | null;
  cityPhoto: string | null;
  country: AddTrip_addTrip_moveNotification_city_country;
}

export interface AddTrip_addTrip_moveNotification {
  __typename: "MoveNotificationType";
  startDate: any | null;
  endDate: any | null;
  city: AddTrip_addTrip_moveNotification_city | null;
}

export interface AddTrip_addTrip {
  __typename: "AddTripResponse";
  ok: boolean | null;
  moveNotification: AddTrip_addTrip_moveNotification | null;
}

export interface AddTrip {
  addTrip: AddTrip_addTrip;
}

export interface AddTripVariables {
  cityName: string;
  startDate: any;
  endDate: any;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditTrip
// ====================================================

export interface EditTrip_editTrip_moveNotification_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
}

export interface EditTrip_editTrip_moveNotification_city {
  __typename: "CityType";
  cityName: string | null;
  cityPhoto: string | null;
  country: EditTrip_editTrip_moveNotification_city_country;
}

export interface EditTrip_editTrip_moveNotification {
  __typename: "MoveNotificationType";
  id: string;
  city: EditTrip_editTrip_moveNotification_city | null;
  startDate: any | null;
  endDate: any | null;
  naturalTime: string | null;
}

export interface EditTrip_editTrip {
  __typename: "EditTripResponse";
  moveNotification: EditTrip_editTrip_moveNotification | null;
  ok: boolean | null;
}

export interface EditTrip {
  editTrip: EditTrip_editTrip;
}

export interface EditTripVariables {
  moveNotificationId: number;
  cityName?: string | null;
  startDate?: any | null;
  endDate?: any | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTrip
// ====================================================

export interface DeleteTrip_deleteTrip {
  __typename: "DeleteTripResponse";
  ok: boolean | null;
  tripId: number | null;
}

export interface DeleteTrip {
  deleteTrip: DeleteTrip_deleteTrip;
}

export interface DeleteTripVariables {
  moveNotificationId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCities
// ====================================================

export interface GetCities_getCities_trip_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetCities_getCities_trip_city {
  __typename: "CityType";
  cityName: string | null;
  cityPhoto: string | null;
  country: GetCities_getCities_trip_city_country;
}

export interface GetCities_getCities_trip {
  __typename: "MoveNotificationType";
  id: string;
  city: GetCities_getCities_trip_city | null;
}

export interface GetCities_getCities {
  __typename: "TripResponse";
  trip: (GetCities_getCities_trip | null)[] | null;
}

export interface GetCities {
  getCities: GetCities_getCities;
}

export interface GetCitiesVariables {
  username: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountries
// ====================================================

export interface GetCountries_getCountries_trip_city_country_continent {
  __typename: "ContinentType";
  continentName: string | null;
}

export interface GetCountries_getCountries_trip_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  continent: GetCountries_getCountries_trip_city_country_continent | null;
}

export interface GetCountries_getCountries_trip_city {
  __typename: "CityType";
  country: GetCountries_getCountries_trip_city_country;
}

export interface GetCountries_getCountries_trip {
  __typename: "MoveNotificationType";
  id: string;
  city: GetCountries_getCountries_trip_city | null;
}

export interface GetCountries_getCountries {
  __typename: "TripResponse";
  trip: (GetCountries_getCountries_trip | null)[] | null;
}

export interface GetCountries {
  getCountries: GetCountries_getCountries;
}

export interface GetCountriesVariables {
  username: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContinents
// ====================================================

export interface GetContinents_getContinents_trip_city_country_continent {
  __typename: "ContinentType";
  continentName: string | null;
  continentPhoto: string | null;
}

export interface GetContinents_getContinents_trip_city_country {
  __typename: "CountryType";
  continent: GetContinents_getContinents_trip_city_country_continent | null;
}

export interface GetContinents_getContinents_trip_city {
  __typename: "CityType";
  country: GetContinents_getContinents_trip_city_country;
}

export interface GetContinents_getContinents_trip {
  __typename: "MoveNotificationType";
  id: string;
  city: GetContinents_getContinents_trip_city | null;
}

export interface GetContinents_getContinents {
  __typename: "TripResponse";
  trip: (GetContinents_getContinents_trip | null)[] | null;
}

export interface GetContinents {
  getContinents: GetContinents_getContinents;
}

export interface GetContinentsVariables {
  username: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetKnowingFollowers
// ====================================================

export interface GetKnowingFollowers_getKnowingFollowers_profiles_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetKnowingFollowers_getKnowingFollowers_profiles_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetKnowingFollowers_getKnowingFollowers_profiles_currentCity_country;
}

export interface GetKnowingFollowers_getKnowingFollowers_profiles {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  currentCity: GetKnowingFollowers_getKnowingFollowers_profiles_currentCity | null;
}

export interface GetKnowingFollowers_getKnowingFollowers {
  __typename: "KnowingFollowersResponse";
  count: number | null;
  profiles: (GetKnowingFollowers_getKnowingFollowers_profiles | null)[] | null;
}

export interface GetKnowingFollowers {
  getKnowingFollowers: GetKnowingFollowers_getKnowingFollowers;
}

export interface GetKnowingFollowersVariables {
  username: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCoffee
// ====================================================

export interface DeleteCoffee_deleteCoffee {
  __typename: "DeleteCoffeeResponse";
  ok: boolean | null;
  coffeeId: number | null;
  username: string | null;
}

export interface DeleteCoffee {
  deleteCoffee: DeleteCoffee_deleteCoffee;
}

export interface DeleteCoffeeVariables {
  coffeeId: number;
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
  cityName: string | null;
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

export interface UserParts_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface UserParts_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: UserParts_profile_currentCity_country;
}

export interface UserParts_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
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
// GraphQL fragment: ProfileParts
// ====================================================

export interface ProfileParts_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface ProfileParts_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: ProfileParts_currentCity_country;
}

export interface ProfileParts {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: ProfileParts_currentCity | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CardParts
// ====================================================

export interface CardParts {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CityParts
// ====================================================

export interface CityParts_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CityParts {
  __typename: "CityType";
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: CityParts_country;
  likeCount: number | null;
  isLiked: boolean | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CountryParts
// ====================================================

export interface CountryParts_continent {
  __typename: "ContinentType";
  continentName: string | null;
}

export interface CountryParts {
  __typename: "CountryType";
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  continent: CountryParts_continent | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContinentParts
// ====================================================

export interface ContinentParts {
  __typename: "ContinentType";
  id: string;
  continentName: string | null;
  continentPhoto: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DetailParts
// ====================================================

export interface DetailParts_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface DetailParts_city {
  __typename: "CityType";
  cityName: string | null;
  country: DetailParts_city_country;
}

export interface DetailParts_creator_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface DetailParts_creator {
  __typename: "UserType";
  id: string;
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
  city: DetailParts_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
  creator: DetailParts_creator;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NotificationParts
// ====================================================

export interface NotificationParts_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface NotificationParts_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: NotificationParts_actor_profile_currentCity_country;
}

export interface NotificationParts_actor_profile {
  __typename: "ProfileType";
  avatar: string;
  currentCity: NotificationParts_actor_profile_currentCity | null;
}

export interface NotificationParts_actor {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: NotificationParts_actor_profile | null;
}

export interface NotificationParts_card {
  __typename: "CardType";
  id: string;
}

export interface NotificationParts_comment {
  __typename: "CommentType";
  id: string;
  message: string;
}

export interface NotificationParts_match {
  __typename: "MatchType";
  id: string;
}

export interface NotificationParts {
  __typename: "NotificationType";
  id: string;
  actor: NotificationParts_actor;
  verb: NotificationVerb;
  card: NotificationParts_card | null;
  comment: NotificationParts_comment | null;
  match: NotificationParts_match | null;
  read: boolean;
  naturalTime: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CoffeeParts
// ====================================================

export interface CoffeeParts_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CoffeeParts_city {
  __typename: "CityType";
  cityName: string | null;
  country: CoffeeParts_city_country;
}

export interface CoffeeParts_host_profile {
  __typename: "ProfileType";
  avatar: string;
  isSelf: boolean | null;
}

export interface CoffeeParts_host {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: CoffeeParts_host_profile | null;
}

export interface CoffeeParts {
  __typename: "CoffeeType";
  id: string;
  city: CoffeeParts_city;
  host: CoffeeParts_host;
  status: string | null;
  expires: any | null;
  target: CoffeeTarget;
  createdAt: any;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MatchParts
// ====================================================

export interface MatchParts_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface MatchParts_city {
  __typename: "CityType";
  cityName: string | null;
  country: MatchParts_city_country;
}

export interface MatchParts_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface MatchParts_host_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: MatchParts_host_profile_currentCity_country;
}

export interface MatchParts_host_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: MatchParts_host_profile_currentCity | null;
}

export interface MatchParts_host {
  __typename: "UserType";
  profile: MatchParts_host_profile | null;
}

export interface MatchParts_guest_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface MatchParts_guest_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: MatchParts_guest_profile_currentCity_country;
}

export interface MatchParts_guest_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
  currentCity: MatchParts_guest_profile_currentCity | null;
}

export interface MatchParts_guest {
  __typename: "UserType";
  profile: MatchParts_guest_profile | null;
}

export interface MatchParts_coffee {
  __typename: "CoffeeType";
  id: string;
  target: CoffeeTarget;
}

export interface MatchParts {
  __typename: "MatchType";
  id: string;
  naturalTime: string | null;
  city: MatchParts_city | null;
  host: MatchParts_host | null;
  guest: MatchParts_guest | null;
  coffee: MatchParts_coffee | null;
  isHost: boolean | null;
  isGuest: boolean | null;
  isMatching: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum CoffeeTarget {
  EVERYONE = "EVERYONE",
  FOLLOWERS = "FOLLOWERS",
  GENDER = "GENDER",
  NATIONALITY = "NATIONALITY",
}

/**
 * An enumeration.
 */
export enum NotificationVerb {
  COMMENT = "COMMENT",
  FOLLOW = "FOLLOW",
  LIKE = "LIKE",
  LIKE_COMMENT = "LIKE_COMMENT",
  MATCH = "MATCH",
  UPLOAD = "UPLOAD",
}

//==============================================================
// END Enums and Input Objects
//==============================================================