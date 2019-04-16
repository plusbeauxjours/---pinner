

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Match
// ====================================================

export interface Match_match {
  __typename: "MatchResponse";
  ok: boolean | null;
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

export interface UnMatch_unMatch {
  __typename: "UnMatchResponse";
  ok: boolean | null;
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
// GraphQL mutation operation: FollowUser
// ====================================================

export interface FollowUser_followUser {
  __typename: "FollowUnfollowResponse";
  ok: boolean | null;
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
// GraphQL mutation operation: LikeCard
// ====================================================

export interface LikeCard_likeCard {
  __typename: "LikeCardResponse";
  ok: boolean | null;
}

export interface LikeCard {
  likeCard: LikeCard_likeCard;
}

export interface LikeCardVariables {
  cardId: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCard
// ====================================================

export interface DeleteCard_deleteCard {
  __typename: "DeleteCardResponse";
  ok: boolean | null;
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

export interface AddComment_addComment_comment_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface AddComment_addComment_comment {
  __typename: "CommentType";
  id: string;
  creator: AddComment_addComment_comment_creator | null;
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

export interface CardDetail_cardDetail_card_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CardDetail_cardDetail_card_city {
  __typename: "CityType";
  cityName: string | null;
}

export interface CardDetail_cardDetail_card_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface CardDetail_cardDetail_card_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: CardDetail_cardDetail_card_comments_creator | null;
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
  country: CardDetail_cardDetail_card_country | null;
  city: CardDetail_cardDetail_card_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
  comments: (CardDetail_cardDetail_card_comments | null)[] | null;
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
  id: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CityProfile
// ====================================================

export interface CityProfile_cityProfile_cards_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CityProfile_cityProfile_cards_city {
  __typename: "CityType";
  cityName: string | null;
}

export interface CityProfile_cityProfile_cards_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface CityProfile_cityProfile_cards_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: CityProfile_cityProfile_cards_comments_creator | null;
}

export interface CityProfile_cityProfile_cards_creator_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface CityProfile_cityProfile_cards_creator {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: CityProfile_cityProfile_cards_creator_profile | null;
}

export interface CityProfile_cityProfile_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  country: CityProfile_cityProfile_cards_country | null;
  city: CityProfile_cityProfile_cards_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
  comments: (CityProfile_cityProfile_cards_comments | null)[] | null;
  creator: CityProfile_cityProfile_cards_creator;
}

export interface CityProfile_cityProfile_usersNow_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface CityProfile_cityProfile_usersNow {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: CityProfile_cityProfile_usersNow_profile | null;
}

export interface CityProfile_cityProfile_usersBefore_actor_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface CityProfile_cityProfile_usersBefore_actor {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: CityProfile_cityProfile_usersBefore_actor_profile | null;
}

export interface CityProfile_cityProfile_usersBefore {
  __typename: "MoveNotificationType";
  id: string;
  actor: CityProfile_cityProfile_usersBefore_actor;
}

export interface CityProfile_cityProfile_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  countryCode: string | null;
}

export interface CityProfile_cityProfile_city {
  __typename: "CityType";
  lat: number | null;
  lng: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: CityProfile_cityProfile_city_country;
  cardCount: number | null;
  userCount: number | null;
  userLogCount: number | null;
}

export interface CityProfile_cityProfile {
  __typename: "FirstAnnotateRespose";
  cards: (CityProfile_cityProfile_cards | null)[] | null;
  usersNow: (CityProfile_cityProfile_usersNow | null)[] | null;
  usersBefore: (CityProfile_cityProfile_usersBefore | null)[] | null;
  city: CityProfile_cityProfile_city | null;
}

export interface CityProfile {
  cityProfile: CityProfile_cityProfile;
}

export interface CityProfileVariables {
  page: number;
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
  lat: number | null;
  lng: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: NearCities_nearCities_cities_country;
}

export interface NearCities_nearCities {
  __typename: "CitiesResponse";
  cities: (NearCities_nearCities_cities | null)[] | null;
}

export interface NearCities {
  nearCities: NearCities_nearCities;
}

export interface NearCitiesVariables {
  nearCityPage?: number | null;
  cityName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NearCountries
// ====================================================

export interface NearCountries_nearCountries_countries_continent {
  __typename: "ContinentType";
  continentName: string | null;
}

export interface NearCountries_nearCountries_countries {
  __typename: "CountryType";
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  continent: NearCountries_nearCountries_countries_continent | null;
}

export interface NearCountries_nearCountries {
  __typename: "CountriesResponse";
  countries: (NearCountries_nearCountries_countries | null)[] | null;
}

export interface NearCountries {
  nearCountries: NearCountries_nearCountries;
}

export interface NearCountriesVariables {
  nearCountryPage?: number | null;
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
  status: CoffeeStatus;
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
// GraphQL query operation: ContinentProfile
// ====================================================

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

export interface ContinentProfile_continentProfile_cards_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface ContinentProfile_continentProfile_cards_city {
  __typename: "CityType";
  cityName: string | null;
}

export interface ContinentProfile_continentProfile_cards_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface ContinentProfile_continentProfile_cards_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: ContinentProfile_continentProfile_cards_comments_creator | null;
}

export interface ContinentProfile_continentProfile_cards_creator_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface ContinentProfile_continentProfile_cards_creator {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: ContinentProfile_continentProfile_cards_creator_profile | null;
}

export interface ContinentProfile_continentProfile_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  country: ContinentProfile_continentProfile_cards_country | null;
  city: ContinentProfile_continentProfile_cards_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
  comments: (ContinentProfile_continentProfile_cards_comments | null)[] | null;
  creator: ContinentProfile_continentProfile_cards_creator;
}

export interface ContinentProfile_continentProfile {
  __typename: "ThirdAnnotateRespose";
  continent: ContinentProfile_continentProfile_continent | null;
  countries: (ContinentProfile_continentProfile_countries | null)[] | null;
  cards: (ContinentProfile_continentProfile_cards | null)[] | null;
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

export interface CountryProfile_countryProfile_usersNow_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface CountryProfile_countryProfile_usersNow {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: CountryProfile_countryProfile_usersNow_profile | null;
}

export interface CountryProfile_countryProfile_usersBefore_actor_profile {
  __typename: "ProfileType";
  avatar: string;
}

export interface CountryProfile_countryProfile_usersBefore_actor {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: CountryProfile_countryProfile_usersBefore_actor_profile | null;
}

export interface CountryProfile_countryProfile_usersBefore {
  __typename: "MoveNotificationType";
  id: string;
  actor: CountryProfile_countryProfile_usersBefore_actor;
}

export interface CountryProfile_countryProfile_cities_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CountryProfile_countryProfile_cities {
  __typename: "CityType";
  id: string;
  lat: number | null;
  lng: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: CountryProfile_countryProfile_cities_country;
}

export interface CountryProfile_countryProfile_cards_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CountryProfile_countryProfile_cards_city {
  __typename: "CityType";
  cityName: string | null;
}

export interface CountryProfile_countryProfile_cards_comments_creator {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface CountryProfile_countryProfile_cards_comments {
  __typename: "CommentType";
  id: string;
  message: string;
  creator: CountryProfile_countryProfile_cards_comments_creator | null;
}

export interface CountryProfile_countryProfile_cards_creator_profile {
  __typename: "ProfileType";
  avatar: string;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface CountryProfile_countryProfile_cards_creator {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: CountryProfile_countryProfile_cards_creator_profile | null;
}

export interface CountryProfile_countryProfile_cards {
  __typename: "CardType";
  id: string;
  file: string | null;
  caption: string;
  country: CountryProfile_countryProfile_cards_country | null;
  city: CountryProfile_countryProfile_cards_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
  comments: (CountryProfile_countryProfile_cards_comments | null)[] | null;
  creator: CountryProfile_countryProfile_cards_creator;
}

export interface CountryProfile_countryProfile {
  __typename: "SecondAnnotateRespose";
  country: CountryProfile_countryProfile_country | null;
  usersNow: (CountryProfile_countryProfile_usersNow | null)[] | null;
  usersBefore: (CountryProfile_countryProfile_usersBefore | null)[] | null;
  cities: (CountryProfile_countryProfile_cities | null)[] | null;
  cards: (CountryProfile_countryProfile_cards | null)[] | null;
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
  lat: number | null;
  lng: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: LatestCities_latestCities_cities_country;
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

export interface Feed_feed_cards_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface Feed_feed_cards_city {
  __typename: "CityType";
  cityName: string | null;
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
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface Feed_feed_cards_creator {
  __typename: "UserType";
  id: string;
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
  naturalTime: string | null;
  comments: (Feed_feed_cards_comments | null)[] | null;
  creator: Feed_feed_cards_creator;
}

export interface Feed_feed_usersNow_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface Feed_feed_usersNow_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: Feed_feed_usersNow_profile_currentCity_country;
}

export interface Feed_feed_usersNow_profile {
  __typename: "ProfileType";
  avatar: string;
  currentCity: Feed_feed_usersNow_profile_currentCity | null;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface Feed_feed_usersNow {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: Feed_feed_usersNow_profile | null;
}

export interface Feed_feed_usersBefore_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface Feed_feed_usersBefore_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: Feed_feed_usersBefore_actor_profile_currentCity_country;
}

export interface Feed_feed_usersBefore_actor_profile {
  __typename: "ProfileType";
  avatar: string;
  currentCity: Feed_feed_usersBefore_actor_profile_currentCity | null;
  isFollowing: boolean | null;
  isSelf: boolean | null;
}

export interface Feed_feed_usersBefore_actor {
  __typename: "UserType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: Feed_feed_usersBefore_actor_profile | null;
}

export interface Feed_feed_usersBefore {
  __typename: "MoveNotificationType";
  id: string;
  actor: Feed_feed_usersBefore_actor;
}

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
  cards: (Feed_feed_cards | null)[] | null;
  usersNow: (Feed_feed_usersNow | null)[] | null;
  usersBefore: (Feed_feed_usersBefore | null)[] | null;
  city: Feed_feed_city | null;
}

export interface Feed {
  feed: Feed_feed;
}

export interface FeedVariables {
  page: number;
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
  country: RecommandUsers_recommandUsers_users_profile_currentCity_country;
  cityName: string | null;
}

export interface RecommandUsers_recommandUsers_users_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
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
  isFollowing: boolean | null;
}

export interface RequestCoffee_requestCoffee_coffee_host {
  __typename: "UserType";
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
  target: CoffeeTarget;
  naturalTime: string | null;
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
  currentCountry: string;
  target?: string | null;
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
  id: string;
  lat: number | null;
  lng: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: GetCoffees_getCoffees_coffees_city_country;
}

export interface GetCoffees_getCoffees_coffees_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetCoffees_getCoffees_coffees_host_profile_currentCity {
  __typename: "CityType";
  country: GetCoffees_getCoffees_coffees_host_profile_currentCity_country;
  cityName: string | null;
}

export interface GetCoffees_getCoffees_coffees_host_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
  currentCity: GetCoffees_getCoffees_coffees_host_profile_currentCity | null;
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
  expires: any | null;
  status: CoffeeStatus;
  target: CoffeeTarget;
  naturalTime: string | null;
}

export interface GetCoffees_getCoffees {
  __typename: "GetCoffeesResponse";
  coffees: (GetCoffees_getCoffees_coffees | null)[] | null;
}

export interface GetCoffees {
  getCoffees: GetCoffees_getCoffees;
}

export interface GetCoffeesVariables {
  cityName: string;
  coffeePage?: number | null;
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
  id: string;
  lat: number | null;
  lng: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: GetMatches_getMatches_matches_city_country;
}

export interface GetMatches_getMatches_matches_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetMatches_getMatches_matches_host_profile_currentCity {
  __typename: "CityType";
  country: GetMatches_getMatches_matches_host_profile_currentCity_country;
  cityName: string | null;
}

export interface GetMatches_getMatches_matches_host_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
  currentCity: GetMatches_getMatches_matches_host_profile_currentCity | null;
}

export interface GetMatches_getMatches_matches_host {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetMatches_getMatches_matches_host_profile | null;
}

export interface GetMatches_getMatches_matches_guest_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetMatches_getMatches_matches_guest_profile_currentCity {
  __typename: "CityType";
  country: GetMatches_getMatches_matches_guest_profile_currentCity_country;
  cityName: string | null;
}

export interface GetMatches_getMatches_matches_guest_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
  currentCity: GetMatches_getMatches_matches_guest_profile_currentCity | null;
}

export interface GetMatches_getMatches_matches_guest {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: GetMatches_getMatches_matches_guest_profile | null;
}

export interface GetMatches_getMatches_matches {
  __typename: "MatchType";
  id: string;
  naturalTime: string | null;
  city: GetMatches_getMatches_matches_city | null;
  host: GetMatches_getMatches_matches_host | null;
  guest: GetMatches_getMatches_matches_guest | null;
  status: MatchStatus;
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
// GraphQL query operation: GetNotifictions
// ====================================================

export interface GetNotifictions_getNotifications_notifications_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetNotifictions_getNotifications_notifications_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetNotifictions_getNotifications_notifications_actor_profile_currentCity_country;
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

export interface GetNotifictions_getNotifications_notifications_payload {
  __typename: "CardType";
  id: string;
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
  comment: GetNotifictions_getNotifications_notifications_comment | null;
  read: boolean;
  naturalTime: string | null;
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
// GraphQL query operation: GetMatchNotifications
// ====================================================

export interface GetMatchNotifications_getMatchNotifications_matchNotifications_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetMatchNotifications_getMatchNotifications_matchNotifications_host_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetMatchNotifications_getMatchNotifications_matchNotifications_host_profile_currentCity_country;
}

export interface GetMatchNotifications_getMatchNotifications_matchNotifications_host_profile {
  __typename: "ProfileType";
  username: string | null;
  avatar: string;
  currentCity: GetMatchNotifications_getMatchNotifications_matchNotifications_host_profile_currentCity | null;
}

export interface GetMatchNotifications_getMatchNotifications_matchNotifications_host {
  __typename: "UserType";
  profile: GetMatchNotifications_getMatchNotifications_matchNotifications_host_profile | null;
}

export interface GetMatchNotifications_getMatchNotifications_matchNotifications_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetMatchNotifications_getMatchNotifications_matchNotifications_city {
  __typename: "CityType";
  cityName: string | null;
  country: GetMatchNotifications_getMatchNotifications_matchNotifications_city_country;
}

export interface GetMatchNotifications_getMatchNotifications_matchNotifications {
  __typename: "MatchNotificationType";
  id: string;
  host: GetMatchNotifications_getMatchNotifications_matchNotifications_host;
  verb: MatchNotificationVerb;
  city: GetMatchNotifications_getMatchNotifications_matchNotifications_city;
  read: boolean;
  naturalTime: string | null;
}

export interface GetMatchNotifications_getMatchNotifications {
  __typename: "GetMatchNotificationsResponse";
  ok: boolean | null;
  matchNotifications: (GetMatchNotifications_getMatchNotifications_matchNotifications | null)[] | null;
}

export interface GetMatchNotifications {
  getMatchNotifications: GetMatchNotifications_getMatchNotifications;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCoffeeNotifications
// ====================================================

export interface GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_host_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_host_profile_currentCity_country;
}

export interface GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_host_profile {
  __typename: "ProfileType";
  username: string | null;
  avatar: string;
  currentCity: GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_host_profile_currentCity | null;
}

export interface GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_host {
  __typename: "UserType";
  profile: GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_host_profile | null;
}

export interface GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_payload {
  __typename: "CoffeeType";
  id: string;
  expires: any | null;
}

export interface GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_city {
  __typename: "CityType";
  cityName: string | null;
  country: GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_city_country;
}

export interface GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications {
  __typename: "CoffeeNotificationType";
  id: string;
  host: GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_host;
  target: string;
  verb: CoffeeNotificationVerb;
  payload: GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_payload | null;
  city: GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications_city;
  read: boolean;
  naturalTime: string | null;
}

export interface GetCoffeeNotifications_getCoffeeNotifications {
  __typename: "GetCoffeeNotificationsResponse";
  ok: boolean | null;
  coffeeNotifications: (GetCoffeeNotifications_getCoffeeNotifications_coffeeNotifications | null)[] | null;
}

export interface GetCoffeeNotifications {
  getCoffeeNotifications: GetCoffeeNotifications_getCoffeeNotifications;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMoveNotifications
// ====================================================

export interface GetMoveNotifications_getMoveNotifications_notifications_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetMoveNotifications_getMoveNotifications_notifications_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: GetMoveNotifications_getMoveNotifications_notifications_actor_profile_currentCity_country;
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

export interface GetMoveNotifications_getMoveNotifications_notifications_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
}

export interface GetMoveNotifications_getMoveNotifications_notifications_city {
  __typename: "CityType";
  cityName: string | null;
  country: GetMoveNotifications_getMoveNotifications_notifications_city_country;
}

export interface GetMoveNotifications_getMoveNotifications_notifications {
  __typename: "MoveNotificationType";
  id: string;
  actor: GetMoveNotifications_getMoveNotifications_notifications_actor;
  verb: MoveNotificationVerb;
  city: GetMoveNotifications_getMoveNotifications_notifications_city | null;
  read: boolean;
  naturalTime: string | null;
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
// GraphQL query operation: SearchTerms
// ====================================================

export interface SearchTerms_searchUsers_users_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface SearchTerms_searchUsers_users_profile_currentCity {
  __typename: "CityType";
  country: SearchTerms_searchUsers_users_profile_currentCity_country;
  cityName: string | null;
}

export interface SearchTerms_searchUsers_users_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
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
  lat: number | null;
  lng: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: SearchTerms_searchCities_cities_country;
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

export interface TripProfile_tripProfile_usersNow {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
}

export interface TripProfile_tripProfile_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  countryCode: string | null;
}

export interface TripProfile_tripProfile_city {
  __typename: "CityType";
  cityName: string | null;
  cityPhoto: string | null;
  country: TripProfile_tripProfile_city_country;
  cardCount: number | null;
  userCount: number | null;
  userLogCount: number | null;
}

export interface TripProfile_tripProfile {
  __typename: "TripProfileResponse";
  usersNow: (TripProfile_tripProfile_usersNow | null)[] | null;
  city: TripProfile_tripProfile_city | null;
}

export interface TripProfile {
  tripProfile: TripProfile_tripProfile;
}

export interface TripProfileVariables {
  cityName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDurationAvatars
// ====================================================

export interface GetDurationAvatars_getDurationAvatars_usersBefore_actor_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatar: string;
}

export interface GetDurationAvatars_getDurationAvatars_usersBefore_actor {
  __typename: "UserType";
  profile: GetDurationAvatars_getDurationAvatars_usersBefore_actor_profile | null;
}

export interface GetDurationAvatars_getDurationAvatars_usersBefore {
  __typename: "MoveNotificationType";
  actor: GetDurationAvatars_getDurationAvatars_usersBefore_actor;
}

export interface GetDurationAvatars_getDurationAvatars {
  __typename: "DurationAvatarsResponse";
  usersBefore: (GetDurationAvatars_getDurationAvatars_usersBefore | null)[] | null;
  days: number | null;
}

export interface GetDurationAvatars {
  getDurationAvatars: GetDurationAvatars_getDurationAvatars;
}

export interface GetDurationAvatarsVariables {
  page?: number | null;
  cityName: string;
  startDate: any;
  endDate: any;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDurationDays
// ====================================================

export interface GetDurationDays_getDurationDays_myTrips {
  __typename: "MoveNotificationType";
  id: string;
}

export interface GetDurationDays_getDurationDays {
  __typename: "DurationDaysResponse";
  myTrips: (GetDurationDays_getDurationDays_myTrips | null)[] | null;
}

export interface GetDurationDays {
  getDurationDays: GetDurationDays_getDurationDays;
}

export interface GetDurationDaysVariables {
  page?: number | null;
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
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
}

export interface GetDurationCards_getDurationCards {
  __typename: "DurationCardsResponse";
  cards: (GetDurationCards_getDurationCards_cards | null)[] | null;
}

export interface GetDurationCards {
  getDurationCards: GetDurationCards_getDurationCards;
}

export interface GetDurationCardsVariables {
  page: number;
  cityName: string;
  startDate: any;
  endDate: any;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadCard
// ====================================================

export interface UploadCard_uploadCard_card_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface UploadCard_uploadCard_card_city {
  __typename: "CityType";
  cityName: string | null;
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
  country: UploadCard_uploadCard_card_country | null;
  city: UploadCard_uploadCard_card_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
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
  country: UserList_userList_users_profile_currentCity_country;
  cityName: string | null;
}

export interface UserList_userList_users_profile {
  __typename: "ProfileType";
  isFollowing: boolean | null;
  avatar: string;
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

export interface UserProfile_userProfile_user_cards {
  __typename: "CardType";
  id: string;
  caption: string;
  likeCount: number | null;
  commentCount: number | null;
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
  cards: (UserProfile_userProfile_user_cards | null)[] | null;
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

export interface GetTrips_getTrips_footprints_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
}

export interface GetTrips_getTrips_footprints_city {
  __typename: "CityType";
  cityName: string | null;
  cityPhoto: string | null;
  country: GetTrips_getTrips_footprints_city_country;
}

export interface GetTrips_getTrips_footprints {
  __typename: "MoveNotificationType";
  id: string;
  city: GetTrips_getTrips_footprints_city | null;
  startDate: any | null;
  endDate: any | null;
  naturalTime: string | null;
}

export interface GetTrips_getTrips {
  __typename: "FootprintsResponse";
  footprints: (GetTrips_getTrips_footprints | null)[] | null;
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
  moveNotification: AddTrip_addTrip_moveNotification | null;
  ok: boolean | null;
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
}

export interface EditTrip_editTrip_moveNotification_city {
  __typename: "CityType";
  cityName: string | null;
  cityPhoto: string | null;
  country: EditTrip_editTrip_moveNotification_city_country;
}

export interface EditTrip_editTrip_moveNotification {
  __typename: "MoveNotificationType";
  startDate: any | null;
  endDate: any | null;
  city: EditTrip_editTrip_moveNotification_city | null;
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
// GraphQL query operation: TopCountries
// ====================================================

export interface TopCountries_topCountries_footprints_city_country_continent {
  __typename: "ContinentType";
  continentName: string | null;
}

export interface TopCountries_topCountries_footprints_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  continent: TopCountries_topCountries_footprints_city_country_continent | null;
}

export interface TopCountries_topCountries_footprints_city {
  __typename: "CityType";
  country: TopCountries_topCountries_footprints_city_country;
}

export interface TopCountries_topCountries_footprints {
  __typename: "MoveNotificationType";
  id: string;
  city: TopCountries_topCountries_footprints_city | null;
}

export interface TopCountries_topCountries {
  __typename: "FootprintsResponse";
  footprints: (TopCountries_topCountries_footprints | null)[] | null;
}

export interface TopCountries {
  topCountries: TopCountries_topCountries;
}

export interface TopCountriesVariables {
  username: string;
  topCountryPage?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FrequentVisits
// ====================================================

export interface FrequentVisits_frequentVisits_footprints_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface FrequentVisits_frequentVisits_footprints_city {
  __typename: "CityType";
  lat: number | null;
  lng: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: FrequentVisits_frequentVisits_footprints_city_country;
}

export interface FrequentVisits_frequentVisits_footprints {
  __typename: "MoveNotificationType";
  id: string;
  city: FrequentVisits_frequentVisits_footprints_city | null;
}

export interface FrequentVisits_frequentVisits {
  __typename: "FootprintsResponse";
  footprints: (FrequentVisits_frequentVisits_footprints | null)[] | null;
}

export interface FrequentVisits {
  frequentVisits: FrequentVisits_frequentVisits;
}

export interface FrequentVisitsVariables {
  username: string;
  frequentVisitPage?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCities
// ====================================================

export interface GetCities_getCities_footprints_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetCities_getCities_footprints_city {
  __typename: "CityType";
  cityName: string | null;
  cityPhoto: string | null;
  country: GetCities_getCities_footprints_city_country;
}

export interface GetCities_getCities_footprints {
  __typename: "MoveNotificationType";
  id: string;
  city: GetCities_getCities_footprints_city | null;
}

export interface GetCities_getCities {
  __typename: "FootprintsResponse";
  footprints: (GetCities_getCities_footprints | null)[] | null;
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

export interface GetCountries_getCountries_footprints_city_country_continent {
  __typename: "ContinentType";
  continentName: string | null;
}

export interface GetCountries_getCountries_footprints_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  continent: GetCountries_getCountries_footprints_city_country_continent | null;
}

export interface GetCountries_getCountries_footprints_city {
  __typename: "CityType";
  country: GetCountries_getCountries_footprints_city_country;
}

export interface GetCountries_getCountries_footprints {
  __typename: "MoveNotificationType";
  id: string;
  city: GetCountries_getCountries_footprints_city | null;
}

export interface GetCountries_getCountries {
  __typename: "FootprintsResponse";
  footprints: (GetCountries_getCountries_footprints | null)[] | null;
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

export interface GetContinents_getContinents_footprints_city_country_continent {
  __typename: "ContinentType";
  continentName: string | null;
  continentPhoto: string | null;
}

export interface GetContinents_getContinents_footprints_city_country {
  __typename: "CountryType";
  continent: GetContinents_getContinents_footprints_city_country_continent | null;
}

export interface GetContinents_getContinents_footprints_city {
  __typename: "CityType";
  country: GetContinents_getContinents_footprints_city_country;
}

export interface GetContinents_getContinents_footprints {
  __typename: "MoveNotificationType";
  id: string;
  city: GetContinents_getContinents_footprints_city | null;
}

export interface GetContinents_getContinents {
  __typename: "FootprintsResponse";
  footprints: (GetContinents_getContinents_footprints | null)[] | null;
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
  username: string;
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
  country: UserParts_profile_currentCity_country;
  cityName: string | null;
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
  lat: number | null;
  lng: number | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: CityParts_country;
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

export interface DetailParts_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface DetailParts_city {
  __typename: "CityType";
  cityName: string | null;
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
  country: DetailParts_country | null;
  city: DetailParts_city | null;
  likeCount: number | null;
  commentCount: number | null;
  isLiked: boolean | null;
  naturalTime: string | null;
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
export enum CoffeeStatus {
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
  REQUESTING = "REQUESTING",
}

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
export enum MatchStatus {
  CANCELED = "CANCELED",
  ONGOING = "ONGOING",
}

/**
 * An enumeration.
 */
export enum NotificationVerb {
  COMMENT = "COMMENT",
  FOLLOW = "FOLLOW",
  LIKE = "LIKE",
  UPLOAD = "UPLOAD",
}

/**
 * An enumeration.
 */
export enum MatchNotificationVerb {
  MATCH = "MATCH",
}

/**
 * An enumeration.
 */
export enum CoffeeNotificationVerb {
  COFFEE = "COFFEE",
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