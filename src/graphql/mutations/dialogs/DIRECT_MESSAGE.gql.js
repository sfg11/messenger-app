import gql from 'graphql-tag';

const DIRECT_MESSAGE = gql`
  mutation sendMessage(
    $receiver_id: ID!,
    $subject: String!,
    $message: String!
  ) {
    sendMessage(
      receiver_id: $receiver_id,
      subject: $subject,
      body: $message
    ) {
      id
    }
  }
`;

export default DIRECT_MESSAGE;
