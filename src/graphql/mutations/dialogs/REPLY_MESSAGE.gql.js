import gql from 'graphql-tag';

const REPLY_MESSAGE = gql`
  mutation replyMessage(
    $conversation_id: ID!,
    $message: String!
  ) {
    replyMessage(
      conversation_id: $conversation_id,
      body: $message
    ) {
      id
    }
  }
`;

export default REPLY_MESSAGE;
