import gql from 'graphql-tag';

const CURRENT_USER = gql`
  {
    current_user {
      id
      first_name
      last_name
      email
    }
  }
`

export default CURRENT_USER;
