import gql from 'graphql-tag';

const ALL_USERS = gql`
  query all_users($first: Int, $skip: Int, $search: String!) {
    all_users(first: $first, skip: $skip, search: $search) {
      users {
        id
        full_name
        email
      }
      users_count
    }
  }
`

export default ALL_USERS;
