/* tslint:disable */
/* eslint-disable */
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
/* eslint-disable */
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
  avatarUrl: string | null;
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
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: Match_match_match_guest_profile_currentCity | null;
}

export interface Match_match_match_guest {
  __typename: "UserType";
  profile: Match_match_match_guest_profile | null;
}

export interface Match_match_match_coffee_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface Match_match_match_coffee_city {
  __typename: "CityType";
  cityId: string | null;
  cityName: string | null;
  country: Match_match_match_coffee_city_country;
}

export interface Match_match_match_coffee {
  __typename: "CoffeeType";
  id: string;
  uuid: any | null;
  target: CoffeeTarget;
  city: Match_match_match_coffee_city;
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
  coffeeId: string | null;
  cityId: string | null;
  countryCode: string | null;
  continentCode: string | null;
  match: Match_match_match | null;
}

export interface Match {
  match: Match_match;
}

export interface MatchVariables {
  coffeeId: string;
}

/* tslint:disable */
/* eslint-disable */
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
  cityId: string | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: UnMatch_unMatch_coffee_city_country;
}

export interface UnMatch_unMatch_coffee_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface UnMatch_unMatch_coffee_host_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: UnMatch_unMatch_coffee_host_profile_currentCity_country;
}

export interface UnMatch_unMatch_coffee_host_profile {
  __typename: "ProfileType";
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: UnMatch_unMatch_coffee_host_profile_currentCity | null;
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
  uuid: any | null;
  city: UnMatch_unMatch_coffee_city;
  host: UnMatch_unMatch_coffee_host;
  status: string | null;
  naturalTime: string | null;
  target: CoffeeTarget;
  createdAt: any;
}

export interface UnMatch_unMatch {
  __typename: "UnMatchResponse";
  ok: boolean | null;
  matchId: number | null;
  cityId: string | null;
  countryCode: string | null;
  continentCode: string | null;
  coffee: UnMatch_unMatch_coffee | null;
}

export interface UnMatch {
  unMatch: UnMatch_unMatch;
}

export interface UnMatchVariables {
  matchId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Header
// ====================================================

export interface Header_header_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  countryCode: string | null;
}

export interface Header_header_city {
  __typename: "CityType";
  cityId: string | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: Header_header_city_country;
  userCount: number | null;
  userLogCount: number | null;
}

export interface Header_header {
  __typename: "HeaderResponse";
  city: Header_header_city | null;
}

export interface Header {
  header: Header_header;
}

export interface HeaderVariables {
  cityId: string;
}

/* tslint:disable */
/* eslint-disable */
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
  id: string;
  username: string | null;
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: SearchTerms_searchUsers_users_profile_currentCity | null;
}

export interface SearchTerms_searchUsers_users {
  __typename: "UserType";
  profile: SearchTerms_searchUsers_users_profile | null;
}

export interface SearchTerms_searchUsers {
  __typename: "SearchUsersResponse";
  users: (SearchTerms_searchUsers_users | null)[] | null;
}

export interface SearchTerms_searchCountries_countries_continent {
  __typename: "ContinentType";
  continentCode: string | null;
  continentName: string | null;
}

export interface SearchTerms_searchCountries_countries {
  __typename: "CountryType";
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  cityCount: number | null;
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
  continentCode: string | null;
  continentPhoto: string | null;
}

export interface SearchTerms_searchContinents {
  __typename: "ContinentsResponse";
  continents: (SearchTerms_searchContinents_continents | null)[] | null;
}

export interface SearchTerms {
  searchUsers: SearchTerms_searchUsers;
  searchCountries: SearchTerms_searchCountries;
  searchContinents: SearchTerms_searchContinents;
}

export interface SearchTermsVariables {
  search: string;
}

/* tslint:disable */
/* eslint-disable */
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
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCity
// ====================================================

export interface CreateCity_createCity {
  __typename: "CreateCityResponse";
  ok: boolean | null;
}

export interface CreateCity {
  createCity: CreateCity_createCity;
}

export interface CreateCityVariables {
  cityId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCityPhoto
// ====================================================

export interface GetCityPhoto_getCityPhoto {
  __typename: "PhotoResponse";
  photo: string | null;
}

export interface GetCityPhoto {
  getCityPhoto: GetCityPhoto_getCityPhoto;
}

export interface GetCityPhotoVariables {
  cityId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
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
/* eslint-disable */
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
  firstName: string;
  lastName: string;
  email?: string | null;
  gender?: string | null;
  latitude: number;
  longitude: number;
  cityId: string;
  cityName: string;
  countryCode: string;
  fbId: string;
}

/* tslint:disable */
/* eslint-disable */
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
  avatarUrl: string | null;
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
  avatarUrl: string | null;
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

export interface CityProfile_cityProfile_city_country_continent {
  __typename: "ContinentType";
  id: string;
  continentName: string | null;
  continentCode: string | null;
  continentPhoto: string | null;
}

export interface CityProfile_cityProfile_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  countryCode: string | null;
  continent: CityProfile_cityProfile_city_country_continent | null;
}

export interface CityProfile_cityProfile_city {
  __typename: "CityType";
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityId: string | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: CityProfile_cityProfile_city_country;
  likeCount: number | null;
  isLiked: boolean | null;
  userCount: number | null;
  userLogCount: number | null;
  count: number | null;
  diff: number | null;
}

export interface CityProfile_cityProfile {
  __typename: "FirstAnnotateResponse";
  count: number | null;
  usersNow: (CityProfile_cityProfile_usersNow | null)[] | null;
  usersBefore: (CityProfile_cityProfile_usersBefore | null)[] | null;
  city: CityProfile_cityProfile_city | null;
}

export interface CityProfile {
  cityProfile: CityProfile_cityProfile;
}

export interface CityProfileVariables {
  page?: number | null;
  cityId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSamenameCities
// ====================================================

export interface GetSamenameCities_getSamenameCities_cities_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetSamenameCities_getSamenameCities_cities {
  __typename: "CityType";
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityName: string | null;
  cityId: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: GetSamenameCities_getSamenameCities_cities_country;
  likeCount: number | null;
  isLiked: boolean | null;
}

export interface GetSamenameCities_getSamenameCities {
  __typename: "CitiesResponse";
  cities: (GetSamenameCities_getSamenameCities_cities | null)[] | null;
}

export interface GetSamenameCities {
  getSamenameCities: GetSamenameCities_getSamenameCities;
}

export interface GetSamenameCitiesVariables {
  cityId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CityUsersBefore
// ====================================================

export interface CityUsersBefore_cityUsersBefore_usersBefore_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CityUsersBefore_cityUsersBefore_usersBefore_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CityUsersBefore_cityUsersBefore_usersBefore_actor_profile_currentCity_country;
}

export interface CityUsersBefore_cityUsersBefore_usersBefore_actor_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: CityUsersBefore_cityUsersBefore_usersBefore_actor_profile_currentCity | null;
}

export interface CityUsersBefore_cityUsersBefore_usersBefore_actor {
  __typename: "UserType";
  profile: CityUsersBefore_cityUsersBefore_usersBefore_actor_profile | null;
}

export interface CityUsersBefore_cityUsersBefore_usersBefore {
  __typename: "MoveNotificationType";
  naturalTime: string | null;
  actor: CityUsersBefore_cityUsersBefore_usersBefore_actor;
}

export interface CityUsersBefore_cityUsersBefore {
  __typename: "usersBeforeResponse";
  page: number | null;
  hasNextPage: boolean | null;
  usersBefore: (CityUsersBefore_cityUsersBefore_usersBefore | null)[] | null;
}

export interface CityUsersBefore {
  cityUsersBefore: CityUsersBefore_cityUsersBefore;
}

export interface CityUsersBeforeVariables {
  page?: number | null;
  cityId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CityUsersNow
// ====================================================

export interface CityUsersNow_cityUsersNow_usersNow_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CityUsersNow_cityUsersNow_usersNow_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CityUsersNow_cityUsersNow_usersNow_profile_currentCity_country;
}

export interface CityUsersNow_cityUsersNow_usersNow_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: CityUsersNow_cityUsersNow_usersNow_profile_currentCity | null;
}

export interface CityUsersNow_cityUsersNow_usersNow {
  __typename: "UserType";
  profile: CityUsersNow_cityUsersNow_usersNow_profile | null;
}

export interface CityUsersNow_cityUsersNow {
  __typename: "UsersNowResponse";
  page: number | null;
  hasNextPage: boolean | null;
  usersNow: (CityUsersNow_cityUsersNow_usersNow | null)[] | null;
}

export interface CityUsersNow {
  cityUsersNow: CityUsersNow_cityUsersNow;
}

export interface CityUsersNowVariables {
  page?: number | null;
  cityId: string;
}

/* tslint:disable */
/* eslint-disable */
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
  cityId: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: NearCities_nearCities_cities_country;
  likeCount: number | null;
  isLiked: boolean | null;
}

export interface NearCities_nearCities {
  __typename: "NearCitiesResponse";
  cities: (NearCities_nearCities_cities | null)[] | null;
}

export interface NearCities {
  nearCities: NearCities_nearCities;
}

export interface NearCitiesVariables {
  cityId: string;
}

/* tslint:disable */
/* eslint-disable */
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
  avatarUrl: string | null;
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
  avatarUrl: string | null;
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

export interface ContinentProfile_continentProfile_continent {
  __typename: "ContinentType";
  countryCount: number | null;
  id: string;
  continentName: string | null;
  continentCode: string | null;
  continentPhoto: string | null;
}

export interface ContinentProfile_continentProfile_continents {
  __typename: "ContinentType";
  countryCount: number | null;
  id: string;
  continentName: string | null;
  continentCode: string | null;
  continentPhoto: string | null;
}

export interface ContinentProfile_continentProfile_countries_continent {
  __typename: "ContinentType";
  continentCode: string | null;
  continentName: string | null;
}

export interface ContinentProfile_continentProfile_countries {
  __typename: "CountryType";
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  cityCount: number | null;
  continent: ContinentProfile_continentProfile_countries_continent | null;
}

export interface ContinentProfile_continentProfile {
  __typename: "ThirdAnnotateResponse";
  count: number | null;
  usersNow: (ContinentProfile_continentProfile_usersNow | null)[] | null;
  usersBefore: (ContinentProfile_continentProfile_usersBefore | null)[] | null;
  continent: ContinentProfile_continentProfile_continent | null;
  continents: (ContinentProfile_continentProfile_continents | null)[] | null;
  countries: (ContinentProfile_continentProfile_countries | null)[] | null;
}

export interface ContinentProfile {
  continentProfile: ContinentProfile_continentProfile;
}

export interface ContinentProfileVariables {
  page?: number | null;
  continentCode: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContinentUsersBefore
// ====================================================

export interface ContinentUsersBefore_continentUsersBefore_usersBefore_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface ContinentUsersBefore_continentUsersBefore_usersBefore_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: ContinentUsersBefore_continentUsersBefore_usersBefore_actor_profile_currentCity_country;
}

export interface ContinentUsersBefore_continentUsersBefore_usersBefore_actor_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: ContinentUsersBefore_continentUsersBefore_usersBefore_actor_profile_currentCity | null;
}

export interface ContinentUsersBefore_continentUsersBefore_usersBefore_actor {
  __typename: "UserType";
  profile: ContinentUsersBefore_continentUsersBefore_usersBefore_actor_profile | null;
}

export interface ContinentUsersBefore_continentUsersBefore_usersBefore {
  __typename: "MoveNotificationType";
  naturalTime: string | null;
  actor: ContinentUsersBefore_continentUsersBefore_usersBefore_actor;
}

export interface ContinentUsersBefore_continentUsersBefore {
  __typename: "usersBeforeResponse";
  page: number | null;
  hasNextPage: boolean | null;
  usersBefore: (ContinentUsersBefore_continentUsersBefore_usersBefore | null)[] | null;
}

export interface ContinentUsersBefore {
  continentUsersBefore: ContinentUsersBefore_continentUsersBefore;
}

export interface ContinentUsersBeforeVariables {
  page?: number | null;
  continentCode: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContinentUsersNow
// ====================================================

export interface ContinentUsersNow_continentUsersNow_usersNow_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface ContinentUsersNow_continentUsersNow_usersNow_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: ContinentUsersNow_continentUsersNow_usersNow_profile_currentCity_country;
}

export interface ContinentUsersNow_continentUsersNow_usersNow_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: ContinentUsersNow_continentUsersNow_usersNow_profile_currentCity | null;
}

export interface ContinentUsersNow_continentUsersNow_usersNow {
  __typename: "UserType";
  profile: ContinentUsersNow_continentUsersNow_usersNow_profile | null;
}

export interface ContinentUsersNow_continentUsersNow {
  __typename: "UsersNowResponse";
  page: number | null;
  hasNextPage: boolean | null;
  usersNow: (ContinentUsersNow_continentUsersNow_usersNow | null)[] | null;
}

export interface ContinentUsersNow {
  continentUsersNow: ContinentUsersNow_continentUsersNow;
}

export interface ContinentUsersNowVariables {
  page?: number | null;
  continentCode: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CountryProfile
// ====================================================

export interface CountryProfile_countryProfile_country_continent {
  __typename: "ContinentType";
  id: string;
  continentName: string | null;
  continentCode: string | null;
  continentPhoto: string | null;
}

export interface CountryProfile_countryProfile_country {
  __typename: "CountryType";
  latitude: number | null;
  longitude: number | null;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  countryCapital: string | null;
  countryCurrency: string | null;
  countryEmoji: string | null;
  totalLikeCount: number | null;
  cityCount: number | null;
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
  avatarUrl: string | null;
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
  avatarUrl: string | null;
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
  cityId: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: CountryProfile_countryProfile_cities_country;
  likeCount: number | null;
  isLiked: boolean | null;
}

export interface CountryProfile_countryProfile {
  __typename: "SecondAnnotateResponse";
  count: number | null;
  country: CountryProfile_countryProfile_country | null;
  usersNow: (CountryProfile_countryProfile_usersNow | null)[] | null;
  usersBefore: (CountryProfile_countryProfile_usersBefore | null)[] | null;
  cities: (CountryProfile_countryProfile_cities | null)[] | null;
}

export interface CountryProfile {
  countryProfile: CountryProfile_countryProfile;
}

export interface CountryProfileVariables {
  page?: number | null;
  countryCode: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCountries
// ====================================================

export interface GetCountries_getCountries_countries_continent {
  __typename: "ContinentType";
  continentCode: string | null;
  continentName: string | null;
}

export interface GetCountries_getCountries_countries {
  __typename: "CountryType";
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  cityCount: number | null;
  continent: GetCountries_getCountries_countries_continent | null;
}

export interface GetCountries_getCountries {
  __typename: "CountriesResponse";
  countries: (GetCountries_getCountries_countries | null)[] | null;
}

export interface GetCountries {
  getCountries: GetCountries_getCountries;
}

export interface GetCountriesVariables {
  countryCode: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CountryUsersBefore
// ====================================================

export interface CountryUsersBefore_countryUsersBefore_usersBefore_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CountryUsersBefore_countryUsersBefore_usersBefore_actor_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CountryUsersBefore_countryUsersBefore_usersBefore_actor_profile_currentCity_country;
}

export interface CountryUsersBefore_countryUsersBefore_usersBefore_actor_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: CountryUsersBefore_countryUsersBefore_usersBefore_actor_profile_currentCity | null;
}

export interface CountryUsersBefore_countryUsersBefore_usersBefore_actor {
  __typename: "UserType";
  profile: CountryUsersBefore_countryUsersBefore_usersBefore_actor_profile | null;
}

export interface CountryUsersBefore_countryUsersBefore_usersBefore {
  __typename: "MoveNotificationType";
  naturalTime: string | null;
  actor: CountryUsersBefore_countryUsersBefore_usersBefore_actor;
}

export interface CountryUsersBefore_countryUsersBefore {
  __typename: "usersBeforeResponse";
  page: number | null;
  hasNextPage: boolean | null;
  usersBefore: (CountryUsersBefore_countryUsersBefore_usersBefore | null)[] | null;
}

export interface CountryUsersBefore {
  countryUsersBefore: CountryUsersBefore_countryUsersBefore;
}

export interface CountryUsersBeforeVariables {
  page?: number | null;
  countryCode: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CountryUsersNow
// ====================================================

export interface CountryUsersNow_countryUsersNow_usersNow_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CountryUsersNow_countryUsersNow_usersNow_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CountryUsersNow_countryUsersNow_usersNow_profile_currentCity_country;
}

export interface CountryUsersNow_countryUsersNow_usersNow_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: CountryUsersNow_countryUsersNow_usersNow_profile_currentCity | null;
}

export interface CountryUsersNow_countryUsersNow_usersNow {
  __typename: "UserType";
  profile: CountryUsersNow_countryUsersNow_usersNow_profile | null;
}

export interface CountryUsersNow_countryUsersNow {
  __typename: "UsersNowResponse";
  page: number | null;
  hasNextPage: boolean | null;
  usersNow: (CountryUsersNow_countryUsersNow_usersNow | null)[] | null;
}

export interface CountryUsersNow {
  countryUsersNow: CountryUsersNow_countryUsersNow;
}

export interface CountryUsersNowVariables {
  page?: number | null;
  countryCode: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CoffeeDetail
// ====================================================

export interface CoffeeDetail_coffeeDetail_coffee_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CoffeeDetail_coffeeDetail_coffee_city {
  __typename: "CityType";
  cityId: string | null;
  cityName: string | null;
  country: CoffeeDetail_coffeeDetail_coffee_city_country;
}

export interface CoffeeDetail_coffeeDetail_coffee_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CoffeeDetail_coffeeDetail_coffee_host_profile_currentCity {
  __typename: "CityType";
  cityId: string | null;
  cityName: string | null;
  country: CoffeeDetail_coffeeDetail_coffee_host_profile_currentCity_country;
}

export interface CoffeeDetail_coffeeDetail_coffee_host_profile_nationality {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
  countryEmoji: string | null;
}

export interface CoffeeDetail_coffeeDetail_coffee_host_profile_residence {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
  countryEmoji: string | null;
}

export interface CoffeeDetail_coffeeDetail_coffee_host_profile {
  __typename: "ProfileType";
  username: string | null;
  isSelf: boolean | null;
  avatarUrl: string | null;
  gender: ProfileGender | null;
  currentCity: CoffeeDetail_coffeeDetail_coffee_host_profile_currentCity | null;
  nationality: CoffeeDetail_coffeeDetail_coffee_host_profile_nationality | null;
  residence: CoffeeDetail_coffeeDetail_coffee_host_profile_residence | null;
  tripCount: number | null;
}

export interface CoffeeDetail_coffeeDetail_coffee_host {
  __typename: "UserType";
  id: string;
  profile: CoffeeDetail_coffeeDetail_coffee_host_profile | null;
}

export interface CoffeeDetail_coffeeDetail_coffee {
  __typename: "CoffeeType";
  id: string;
  uuid: any | null;
  expires: any | null;
  naturalTime: string | null;
  status: string | null;
  target: CoffeeTarget;
  city: CoffeeDetail_coffeeDetail_coffee_city;
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
  coffeeId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCoffee
// ====================================================

export interface DeleteCoffee_deleteCoffee {
  __typename: "DeleteCoffeeResponse";
  ok: boolean | null;
  coffeeId: string | null;
  username: string | null;
}

export interface DeleteCoffee {
  deleteCoffee: DeleteCoffee_deleteCoffee;
}

export interface DeleteCoffeeVariables {
  coffeeId: string;
}

/* tslint:disable */
/* eslint-disable */
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
  id: string;
  username: string | null;
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: RecommandUsers_recommandUsers_users_profile_currentCity | null;
}

export interface RecommandUsers_recommandUsers_users {
  __typename: "UserType";
  profile: RecommandUsers_recommandUsers_users_profile | null;
}

export interface RecommandUsers_recommandUsers {
  __typename: "RecommandUsersResponse";
  page: number | null;
  hasNextPage: boolean | null;
  users: (RecommandUsers_recommandUsers_users | null)[] | null;
}

export interface RecommandUsers {
  recommandUsers: RecommandUsers_recommandUsers;
}

export interface RecommandUsersVariables {
  page?: number | null;
}

/* tslint:disable */
/* eslint-disable */
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
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartEmailVerification
// ====================================================

export interface StartEmailVerification_startEmailVerification {
  __typename: "StartEmailVerificationResponse";
  ok: boolean | null;
}

export interface StartEmailVerification {
  startEmailVerification: StartEmailVerification_startEmailVerification;
}

export interface StartEmailVerificationVariables {
  emailAddress: string;
}

/* tslint:disable */
/* eslint-disable */
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
  currentCityId?: string | null;
  currentCityName: string;
  currentCountryCode: string;
}

/* tslint:disable */
/* eslint-disable */
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
  countryPhoneNumber: string;
  countryPhoneCode: string;
  cityId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompleteEmailVerification
// ====================================================

export interface CompleteEmailVerification_completeEmailVerification {
  __typename: "CompleteEmailVerificationResponse";
  ok: boolean | null;
  token: string | null;
}

export interface CompleteEmailVerification {
  completeEmailVerification: CompleteEmailVerification_completeEmailVerification;
}

export interface CompleteEmailVerificationVariables {
  key: string;
  cityId: string;
}

/* tslint:disable */
/* eslint-disable */
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
  avatarUrl: string | null;
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
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: GetMatches_getMatches_matches_guest_profile_currentCity | null;
}

export interface GetMatches_getMatches_matches_guest {
  __typename: "UserType";
  profile: GetMatches_getMatches_matches_guest_profile | null;
}

export interface GetMatches_getMatches_matches_coffee_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface GetMatches_getMatches_matches_coffee_city {
  __typename: "CityType";
  cityId: string | null;
  cityName: string | null;
  country: GetMatches_getMatches_matches_coffee_city_country;
}

export interface GetMatches_getMatches_matches_coffee {
  __typename: "CoffeeType";
  id: string;
  uuid: any | null;
  target: CoffeeTarget;
  city: GetMatches_getMatches_matches_coffee_city;
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
/* eslint-disable */
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
  cityId: string | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: RequestCoffee_requestCoffee_coffee_city_country;
}

export interface RequestCoffee_requestCoffee_coffee_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface RequestCoffee_requestCoffee_coffee_host_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: RequestCoffee_requestCoffee_coffee_host_profile_currentCity_country;
}

export interface RequestCoffee_requestCoffee_coffee_host_profile {
  __typename: "ProfileType";
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: RequestCoffee_requestCoffee_coffee_host_profile_currentCity | null;
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
  uuid: any | null;
  city: RequestCoffee_requestCoffee_coffee_city;
  host: RequestCoffee_requestCoffee_coffee_host;
  status: string | null;
  naturalTime: string | null;
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
  currentCityId: string;
  target?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TripProfile
// ====================================================

export interface TripProfile_tripProfile_city_country_continent {
  __typename: "ContinentType";
  id: string;
  continentName: string | null;
  continentCode: string | null;
  continentPhoto: string | null;
}

export interface TripProfile_tripProfile_city_country {
  __typename: "CountryType";
  countryName: string | null;
  countryPhoto: string | null;
  countryCode: string | null;
  continent: TripProfile_tripProfile_city_country_continent | null;
}

export interface TripProfile_tripProfile_city {
  __typename: "CityType";
  id: string;
  latitude: number | null;
  longitude: number | null;
  cityId: string | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: TripProfile_tripProfile_city_country;
  likeCount: number | null;
  isLiked: boolean | null;
  userCount: number | null;
  userLogCount: number | null;
  count: number | null;
  diff: number | null;
}

export interface TripProfile_tripProfile_usersBefore_actor_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface TripProfile_tripProfile_usersBefore_actor_profile_currentCity {
  __typename: "CityType";
  cityId: string | null;
  cityName: string | null;
  country: TripProfile_tripProfile_usersBefore_actor_profile_currentCity_country;
}

export interface TripProfile_tripProfile_usersBefore_actor_profile {
  __typename: "ProfileType";
  id: string;
  username: string | null;
  avatarUrl: string | null;
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
  avatarUrl: string | null;
}

export interface TripProfile_tripProfile_coffees_host {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: TripProfile_tripProfile_coffees_host_profile | null;
}

export interface TripProfile_tripProfile_coffees {
  __typename: "CoffeeType";
  id: string;
  uuid: any | null;
  target: CoffeeTarget;
  host: TripProfile_tripProfile_coffees_host;
}

export interface TripProfile_tripProfile {
  __typename: "TripProfileResponse";
  city: TripProfile_tripProfile_city | null;
  count: number | null;
  usersBefore: (TripProfile_tripProfile_usersBefore | null)[] | null;
  userCount: number | null;
  coffees: (TripProfile_tripProfile_coffees | null)[] | null;
}

export interface TripProfile {
  tripProfile: TripProfile_tripProfile;
}

export interface TripProfileVariables {
  cityId: string;
  startDate: any;
  endDate: any;
}

/* tslint:disable */
/* eslint-disable */
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
  cityId: string | null;
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
/* eslint-disable */
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
  cityId: string | null;
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
  cityName: string | null;
  country: GetCoffees_getCoffees_coffees_host_profile_currentCity_country;
}

export interface GetCoffees_getCoffees_coffees_host_profile {
  __typename: "ProfileType";
  avatarUrl: string | null;
  isSelf: boolean | null;
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
  uuid: any | null;
  city: GetCoffees_getCoffees_coffees_city;
  host: GetCoffees_getCoffees_coffees_host;
  status: string | null;
  naturalTime: string | null;
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
  cityId?: string | null;
  countryCode?: string | null;
  continentCode?: string | null;
  userName?: string | null;
  location: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TopContinents
// ====================================================

export interface TopContinents_topContinents_continents {
  __typename: "ContinentType";
  count: number | null;
  diff: number | null;
  id: string;
  continentName: string | null;
  continentCode: string | null;
  continentPhoto: string | null;
}

export interface TopContinents_topContinents {
  __typename: "ContinentsResponse";
  continents: (TopContinents_topContinents_continents | null)[] | null;
}

export interface TopContinents {
  topContinents: TopContinents_topContinents;
}

export interface TopContinentsVariables {
  userName: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TopCountries
// ====================================================

export interface TopCountries_topCountries_countries_continent {
  __typename: "ContinentType";
  continentCode: string | null;
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
  cityCount: number | null;
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
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompleteEditEmailVerification
// ====================================================

export interface CompleteEditEmailVerification_completeEditEmailVerification {
  __typename: "CompleteEditEmailVerificationResponse";
  ok: boolean | null;
  username: string | null;
  emailAddress: string | null;
  isVerifiedEmailAddress: boolean | null;
}

export interface CompleteEditEmailVerification {
  completeEditEmailVerification: CompleteEditEmailVerification_completeEditEmailVerification;
}

export interface CompleteEditEmailVerificationVariables {
  key: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditProfile
// ====================================================

export interface EditProfile_editProfile_user_profile_nationality_continent {
  __typename: "ContinentType";
  continentCode: string | null;
  continentName: string | null;
}

export interface EditProfile_editProfile_user_profile_nationality {
  __typename: "CountryType";
  countryEmoji: string | null;
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  cityCount: number | null;
  continent: EditProfile_editProfile_user_profile_nationality_continent | null;
}

export interface EditProfile_editProfile_user_profile_residence_continent {
  __typename: "ContinentType";
  continentCode: string | null;
  continentName: string | null;
}

export interface EditProfile_editProfile_user_profile_residence {
  __typename: "CountryType";
  countryEmoji: string | null;
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  cityCount: number | null;
  continent: EditProfile_editProfile_user_profile_residence_continent | null;
}

export interface EditProfile_editProfile_user_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
  countryCode: string | null;
}

export interface EditProfile_editProfile_user_profile_currentCity {
  __typename: "CityType";
  latitude: number | null;
  longitude: number | null;
  cityId: string | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: EditProfile_editProfile_user_profile_currentCity_country;
}

export interface EditProfile_editProfile_user_profile {
  __typename: "ProfileType";
  bio: string | null;
  gender: ProfileGender | null;
  avatarUrl: string | null;
  website: string | null;
  distance: number | null;
  countryPhoneNumber: string | null;
  countryPhoneCode: string | null;
  phoneNumber: string | null;
  emailAddress: string | null;
  isVerifiedPhoneNumber: boolean;
  isVerifiedEmailAddress: boolean;
  nationality: EditProfile_editProfile_user_profile_nationality | null;
  residence: EditProfile_editProfile_user_profile_residence | null;
  postCount: number | null;
  tripCount: number | null;
  coffeeCount: number | null;
  cityCount: number | null;
  countryCount: number | null;
  continentCount: number | null;
  isSelf: boolean | null;
  isDarkMode: boolean;
  isHideTrips: boolean;
  isHideCoffees: boolean;
  isHideCities: boolean;
  isHideCountries: boolean;
  isHideContinents: boolean;
  isAutoLocationReport: boolean;
  currentCity: EditProfile_editProfile_user_profile_currentCity | null;
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
  token: string | null;
  user: EditProfile_editProfile_user | null;
}

export interface EditProfile {
  editProfile: EditProfile_editProfile;
}

export interface EditProfileVariables {
  username?: string | null;
  bio?: string | null;
  gender?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  nationalityCode?: string | null;
  residenceCode?: string | null;
}

/* tslint:disable */
/* eslint-disable */
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
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartEditPhoneVerification
// ====================================================

export interface StartEditPhoneVerification_startEditPhoneVerification {
  __typename: "StartEditPhoneVerificationResponse";
  ok: boolean | null;
}

export interface StartEditPhoneVerification {
  startEditPhoneVerification: StartEditPhoneVerification_startEditPhoneVerification;
}

export interface StartEditPhoneVerificationVariables {
  phoneNumber: string;
  countryPhoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompleteEditPhoneVerification
// ====================================================

export interface CompleteEditPhoneVerification_completeEditPhoneVerification {
  __typename: "CompleteEditPhoneVerificationResponse";
  ok: boolean | null;
  phoneNumber: string | null;
  countryPhoneNumber: string | null;
  countryPhoneCode: string | null;
  isVerifiedPhoneNumber: boolean | null;
}

export interface CompleteEditPhoneVerification {
  completeEditPhoneVerification: CompleteEditPhoneVerification_completeEditPhoneVerification;
}

export interface CompleteEditPhoneVerificationVariables {
  key: string;
  phoneNumber: string;
  countryPhoneNumber: string;
  countryPhoneCode: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartEditEmailVerification
// ====================================================

export interface StartEditEmailVerification_startEditEmailVerification {
  __typename: "StartEditEmailVerificationResponse";
  ok: boolean | null;
}

export interface StartEditEmailVerification {
  startEditEmailVerification: StartEditEmailVerification_startEditEmailVerification;
}

export interface StartEditEmailVerificationVariables {
  emailAddress: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleSettings
// ====================================================

export interface ToggleSettings_toggleSettings_user_profile {
  __typename: "ProfileType";
  isSelf: boolean | null;
  isDarkMode: boolean;
  isHideTrips: boolean;
  isHideCoffees: boolean;
  isHideCities: boolean;
  isHideCountries: boolean;
  isHideContinents: boolean;
  isAutoLocationReport: boolean;
}

export interface ToggleSettings_toggleSettings_user {
  __typename: "UserType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
  profile: ToggleSettings_toggleSettings_user_profile | null;
}

export interface ToggleSettings_toggleSettings {
  __typename: "ToggleSettingsResponse";
  ok: boolean | null;
  user: ToggleSettings_toggleSettings_user | null;
}

export interface ToggleSettings {
  toggleSettings: ToggleSettings_toggleSettings;
}

export interface ToggleSettingsVariables {
  payload: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAvatarDetail
// ====================================================

export interface GetAvatarDetail_getAvatarDetail_avatar {
  __typename: "AvatarType";
  id: string;
  uuid: any | null;
  image: string | null;
  isMain: boolean;
  likeCount: number | null;
  thumbnail: string | null;
}

export interface GetAvatarDetail_getAvatarDetail {
  __typename: "AvatarDetailResponse";
  avatar: GetAvatarDetail_getAvatarDetail_avatar | null;
}

export interface GetAvatarDetail {
  getAvatarDetail: GetAvatarDetail_getAvatarDetail;
}

export interface GetAvatarDetailVariables {
  avatarId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfile
// ====================================================

export interface UserProfile_userProfile_user_profile_nationality_continent {
  __typename: "ContinentType";
  continentCode: string | null;
  continentName: string | null;
}

export interface UserProfile_userProfile_user_profile_nationality {
  __typename: "CountryType";
  countryEmoji: string | null;
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  cityCount: number | null;
  continent: UserProfile_userProfile_user_profile_nationality_continent | null;
}

export interface UserProfile_userProfile_user_profile_residence_continent {
  __typename: "ContinentType";
  continentCode: string | null;
  continentName: string | null;
}

export interface UserProfile_userProfile_user_profile_residence {
  __typename: "CountryType";
  countryEmoji: string | null;
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  cityCount: number | null;
  continent: UserProfile_userProfile_user_profile_residence_continent | null;
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
  cityId: string | null;
  cityPhoto: string | null;
  country: UserProfile_userProfile_user_profile_currentCity_country;
}

export interface UserProfile_userProfile_user_profile {
  __typename: "ProfileType";
  bio: string | null;
  gender: ProfileGender | null;
  avatarUrl: string | null;
  website: string | null;
  distance: number | null;
  countryPhoneNumber: string | null;
  countryPhoneCode: string | null;
  phoneNumber: string | null;
  emailAddress: string | null;
  isVerifiedPhoneNumber: boolean;
  isVerifiedEmailAddress: boolean;
  nationality: UserProfile_userProfile_user_profile_nationality | null;
  residence: UserProfile_userProfile_user_profile_residence | null;
  postCount: number | null;
  tripCount: number | null;
  coffeeCount: number | null;
  cityCount: number | null;
  countryCount: number | null;
  continentCount: number | null;
  isSelf: boolean | null;
  isDarkMode: boolean;
  isHideTrips: boolean;
  isHideCoffees: boolean;
  isHideCities: boolean;
  isHideCountries: boolean;
  isHideContinents: boolean;
  isAutoLocationReport: boolean;
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
/* eslint-disable */
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
  cityId: string | null;
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
/* eslint-disable */
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
  cityId: string | null;
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
  distance: number | null;
  moveNotification: AddTrip_addTrip_moveNotification | null;
}

export interface AddTrip {
  addTrip: AddTrip_addTrip;
}

export interface AddTripVariables {
  cityId: string;
  startDate: any;
  endDate: any;
}

/* tslint:disable */
/* eslint-disable */
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
  cityId: string | null;
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
  ok: boolean | null;
  distance: number | null;
  moveNotification: EditTrip_editTrip_moveNotification | null;
}

export interface EditTrip {
  editTrip: EditTrip_editTrip;
}

export interface EditTripVariables {
  moveNotificationId: number;
  cityId?: string | null;
  startDate?: any | null;
  endDate?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTrip
// ====================================================

export interface DeleteTrip_deleteTrip {
  __typename: "DeleteTripResponse";
  ok: boolean | null;
  distance: number | null;
  tripId: number | null;
}

export interface DeleteTrip {
  deleteTrip: DeleteTrip_deleteTrip;
}

export interface DeleteTripVariables {
  moveNotificationId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAvatars
// ====================================================

export interface GetAvatars_getAvatars_avatars {
  __typename: "AvatarType";
  id: string;
  uuid: any | null;
  image: string | null;
  isMain: boolean;
  likeCount: number | null;
  thumbnail: string | null;
}

export interface GetAvatars_getAvatars {
  __typename: "AvatarListResponse";
  avatars: (GetAvatars_getAvatars_avatars | null)[] | null;
}

export interface GetAvatars {
  getAvatars: GetAvatars_getAvatars;
}

export interface GetAvatarsVariables {
  userName: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadAvatar
// ====================================================

export interface UploadAvatar_uploadAvatar_avatar {
  __typename: "AvatarType";
  id: string;
  uuid: any | null;
  image: string | null;
  isMain: boolean;
  likeCount: number | null;
  thumbnail: string | null;
}

export interface UploadAvatar_uploadAvatar {
  __typename: "UploadAvatarResponse";
  ok: boolean | null;
  preAvatarUUID: string | null;
  newAvatarUUID: string | null;
  avatar: UploadAvatar_uploadAvatar_avatar | null;
}

export interface UploadAvatar {
  uploadAvatar: UploadAvatar_uploadAvatar;
}

export interface UploadAvatarVariables {
  file: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteAvatar
// ====================================================

export interface DeleteAvatar_deleteAvatar {
  __typename: "DeleteAvatarResponse";
  ok: boolean | null;
  uuid: string | null;
}

export interface DeleteAvatar {
  deleteAvatar: DeleteAvatar_deleteAvatar;
}

export interface DeleteAvatarVariables {
  uuid: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MarkAsMain
// ====================================================

export interface MarkAsMain_markAsMain_avatar {
  __typename: "AvatarType";
  id: string;
  uuid: any | null;
  image: string | null;
  isMain: boolean;
  likeCount: number | null;
  thumbnail: string | null;
}

export interface MarkAsMain_markAsMain {
  __typename: "MarkAsMainResponse";
  ok: boolean | null;
  preAvatarUUID: string | null;
  newAvatarUUID: string | null;
  avatar: MarkAsMain_markAsMain_avatar | null;
}

export interface MarkAsMain {
  markAsMain: MarkAsMain_markAsMain;
}

export interface MarkAsMainVariables {
  uuid: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CalculateDistance
// ====================================================

export interface CalculateDistance_calculateDistance {
  __typename: "CalculateDistanceResponse";
  distance: number | null;
}

export interface CalculateDistance {
  calculateDistance: CalculateDistance_calculateDistance;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SlackReportUsers
// ====================================================

export interface SlackReportUsers_slackReportUsers {
  __typename: "SlackReportUsersResponse";
  ok: boolean | null;
}

export interface SlackReportUsers {
  slackReportUsers: SlackReportUsers_slackReportUsers;
}

export interface SlackReportUsersVariables {
  targetUsername: string;
  payload: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_user_profile_currentCity {
  __typename: "CityType";
  cityId: string | null;
  cityName: string | null;
}

export interface Me_me_user_profile {
  __typename: "ProfileType";
  avatarUrl: string | null;
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
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SlackReportLocations
// ====================================================

export interface SlackReportLocations_slackReportLocations {
  __typename: "SlackReportLocationResponse";
  ok: boolean | null;
}

export interface SlackReportLocations {
  slackReportLocations: SlackReportLocations_slackReportLocations;
}

export interface SlackReportLocationsVariables {
  targetLocationId: string;
  targetLocationType: string;
  payload: string;
}

/* tslint:disable */
/* eslint-disable */
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
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: ProfileParts_currentCity | null;
}

/* tslint:disable */
/* eslint-disable */
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
  cityId: string | null;
  cityPhoto: string | null;
  distance: number | null;
  country: CityParts_country;
  likeCount: number | null;
  isLiked: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CountryParts
// ====================================================

export interface CountryParts_continent {
  __typename: "ContinentType";
  continentCode: string | null;
  continentName: string | null;
}

export interface CountryParts {
  __typename: "CountryType";
  id: string;
  countryName: string | null;
  countryCode: string | null;
  countryPhoto: string | null;
  cityCount: number | null;
  continent: CountryParts_continent | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContinentParts
// ====================================================

export interface ContinentParts {
  __typename: "ContinentType";
  id: string;
  continentName: string | null;
  continentCode: string | null;
  continentPhoto: string | null;
}

/* tslint:disable */
/* eslint-disable */
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
  cityId: string | null;
  cityName: string | null;
  cityPhoto: string | null;
  country: CoffeeParts_city_country;
}

export interface CoffeeParts_host_profile_currentCity_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface CoffeeParts_host_profile_currentCity {
  __typename: "CityType";
  cityName: string | null;
  country: CoffeeParts_host_profile_currentCity_country;
}

export interface CoffeeParts_host_profile {
  __typename: "ProfileType";
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: CoffeeParts_host_profile_currentCity | null;
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
  uuid: any | null;
  city: CoffeeParts_city;
  host: CoffeeParts_host;
  status: string | null;
  naturalTime: string | null;
  target: CoffeeTarget;
  createdAt: any;
}

/* tslint:disable */
/* eslint-disable */
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
  avatarUrl: string | null;
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
  avatarUrl: string | null;
  isSelf: boolean | null;
  currentCity: MatchParts_guest_profile_currentCity | null;
}

export interface MatchParts_guest {
  __typename: "UserType";
  profile: MatchParts_guest_profile | null;
}

export interface MatchParts_coffee_city_country {
  __typename: "CountryType";
  countryName: string | null;
}

export interface MatchParts_coffee_city {
  __typename: "CityType";
  cityId: string | null;
  cityName: string | null;
  country: MatchParts_coffee_city_country;
}

export interface MatchParts_coffee {
  __typename: "CoffeeType";
  id: string;
  uuid: any | null;
  target: CoffeeTarget;
  city: MatchParts_coffee_city;
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
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum CoffeeTarget {
  EVERYONE = "EVERYONE",
  GENDER = "GENDER",
  NATIONALITY = "NATIONALITY",
}

/**
 * An enumeration.
 */
export enum ProfileGender {
  FEMALE = "FEMALE",
  MALE = "MALE",
  OTHER = "OTHER",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
