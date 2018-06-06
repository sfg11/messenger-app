import gql from 'graphql-tag';

const SIGN_IN = gql`
  mutation signinUser(
    $email: String!,
    $password: String!
  ) {
    signinUser(
      email: $email,
      password: $password
    ) {
      token
    }
  }
`;

export default SIGN_IN;
