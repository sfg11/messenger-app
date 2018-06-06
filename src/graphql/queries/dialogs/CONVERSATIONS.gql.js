
import gql from 'graphql-tag';

const CONVERSATIONS = gql`
  {
    current_user {
      id
      conversations(order: "updated_at") {
        edges {
          node {
            id
            subject
            updated_at
            interlocutor {
              full_name
            }
          }
        }
      }
    }
  }
`

export default CONVERSATIONS;
