import gql from "graphql-tag";

export const EDIT_PROFILE = gql`
    mutation EditProfile($username: String
$bio: 
$website: String
$gender: String
$avatar: String
$first_name: String
$last_name: String
$email: String)
{
    editPorfile(username:$username
bio:$bio
website:$website
gender:$gender
avatar:$avatar
first_name:$first_name
last_name:$last_name
email:$email){
    ok
    }
}`;
