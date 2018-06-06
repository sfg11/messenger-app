import gql from 'graphql-tag';

const SIGN_UP = gql`
  mutation createUser(
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $password: String!,
    $password_confirmation: String!
  ) {
    createUser(
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      password: $password,
      password_confirmation: $password_confirmation
    ) {
      token
    }
  }
`;

export default SIGN_UP;
