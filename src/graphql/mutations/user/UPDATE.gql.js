import gql from 'graphql-tag';

const UPDATE = gql`
  mutation updateUser(
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $current_password: String!,
    $password: String,
    $password_confirmation: String
  ) {
    updateUser(
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      current_password: $current_password,
      password: $password,
      password_confirmation: $password_confirmation
    ) {
      id
    }
  }
`;

export default UPDATE;
