import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { Grid, Col, } from 'react-bootstrap';

import Messages from './Messages';
import InputMessageWidget  from './InputMessageWidget';

import CHAT from '../../graphql/queries/dialogs/CHAT.gql';

class ChatWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active_conversation: this.props.match.params.id,
      messages: [],
    };
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.active_conversation !== nextProps.active_conversation) {
      this.setState({ active_conversation: nextProps.active_conversation });
    }
  };

  render() {
    return (
      <Grid>
        <Col sm={3}>
          <Link to='/'>Dialogs</Link>
        </Col>
        <Col sm={6}>
          <Query query={CHAT} variables={ { id: this.state.active_conversation } }>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              if (data.current_user.conversation_from_id) {
                this.state.messages = data.current_user.conversation_from_id.messages.edges;
              };

              return (
                <div>
                  { data.current_user.conversation_from_id ? (
                    <div>
                      <Messages messages={this.state.messages} />
                      <InputMessageWidget active_conversation={this.state.active_conversation} />
                    </div>
                    ) : (
                      <div align='center'>
                        <h1>Dialog do not exists</h1>
                      </div>
                    )
                  }
                </div>
              );
            }}
          </Query>
        </Col>
      </Grid>
    );
  };
};

export default ChatWidget;
