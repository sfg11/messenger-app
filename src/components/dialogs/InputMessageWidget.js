import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { Form, FormGroup, FormControl, Button, Col, } from 'react-bootstrap';

import REPLY_MESSAGE from '../../graphql/mutations/dialogs/REPLY_MESSAGE.gql';

class InputMessageWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active_conversation: props.active_conversation,
      message: '',
    };
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.active_conversation !== nextProps.active_conversation) {
      this.setState({ active_conversation: nextProps.active_conversation });
    }
  }

  render() {
    return (
      <div>
        { this.showWidget() ? (
          <Mutation mutation={REPLY_MESSAGE}>
            {(replyMessage) => (
              <Form
                horizontal
                onSubmit={e => {
                  e.preventDefault();

                  replyMessage({ variables: {
                    conversation_id: this.state.active_conversation,
                    message: this.state.message,
                  }})
                  .then((response) => {
                    this.setState({ message: '' });
                  })
                  .catch((error) => {
                    console.log('Reply message error', error);
                  });
                }}
              >

                <FormGroup>
                  <Col sm={12}>
                  <FormControl
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                    type='text'
                    componentClass='textarea'
                    style={{ height: 80 }}
                    placeholder='Type message'
                  />
                  <div align='right'>
                    <Button
                      type='submit'
                      bsStyle='primary'
                      style={{ width: 100, marginTop: 10 }}
                    >Send</Button>
                  </div>
                  </Col>
                </FormGroup>

              </Form>
            )}
          </Mutation>
        ) : ('')}
      </div>
    );
  };

  showWidget() {
    return this.state.active_conversation !== -1;
  };
};

export default InputMessageWidget;
