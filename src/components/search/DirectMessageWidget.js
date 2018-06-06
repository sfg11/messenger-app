import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import {
  Form, FormGroup, FormControl, Modal, ControlLabel, Button,
} from 'react-bootstrap';

import DIRECT_MESSAGE from '../../graphql/mutations/dialogs/DIRECT_MESSAGE.gql';

class DirectMessageWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      receiver_id: 0,
      receiver_name: '',
      receiver_email: '',
      subject: '',
      message: '',
      show: false,
    };

    this.handleClose = props.handleClose;
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
        receiver_id: nextProps.receiver_id,
        receiver_name: nextProps.receiver_name,
        receiver_email: nextProps.receiver_email,
        subject: nextProps.subject,
        message: nextProps.message,
        show: nextProps.show,
    });
  }

  render() {
    return (
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Direct message for {this.state.receiver_name} ({this.state.receiver_email})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Mutation mutation={DIRECT_MESSAGE}>
            {(directMessage) => (
              <Form
                horizontal
                onSubmit={e => {
                  e.preventDefault();

                  const { receiver_id, subject, message, } = this.state;

                  directMessage({ variables: {
                    receiver_id, subject, message,
                  }})
                  .then((response) => {
                    const url = '/dialog/' + response.data.sendMessage.id
                    this.props.history.push(url)
                  })
                  .catch((error) => {
                    console.log('Direct message error', error)
                  });
                }}
              >

                <FormGroup>
                  <ControlLabel>Subject</ControlLabel>
                  <FormControl
                    value={this.state.subject}
                    onChange={e => this.setState({ subject: e.target.value })}
                    type='text'
                    placeholder='Type subject'
                  />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Message</ControlLabel>
                  <FormControl
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                    type='text'
                    componentClass='textarea'
                    style={{ height: 200 }}
                    placeholder='Type message'
                  />
                </FormGroup>

                <FormGroup align='right'>
                  <Button
                    type='submit'
                    bsStyle='primary'
                  >Send message</Button>
                  {' '}
                  <Button onClick={this.handleClose}>Cancel</Button>
                </FormGroup>
              </Form>
            )}
          </Mutation>
        </Modal.Body>
      </Modal>
    );
  };
};

export default DirectMessageWidget;
