import gql from 'graphql-tag';

const CONVERSATION = gql`
  query current_users($id: ID!) {
    current_user {
      id
      conversation_from_id(id: $id) {
        id
        subject
        interlocutor {
            full_name
        }
        messages(order: "updated_at") {
          edges {
            node {
              id
              body
              sender {
                id
                full_name
              }
            }
          }
        }
      }
    }
  }
`

export default CONVERSATION;
