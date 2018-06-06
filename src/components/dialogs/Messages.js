import React, { Component } from 'react';

import { Panel } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';

class Messages extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: props.messages,
    };
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.messages !== nextProps.messages) {
      this.setState({ messages: nextProps.messages });
    }
  };

  componentDidMount() {
    this.refs.demoScrollBar.scrollToBottom();
  };

  render() {
    return (
      <Scrollbars
        autoHeight
        autoHeightMin={460}
        autoHeightMax={460}
        ref='demoScrollBar'
      >
        {this.state.messages.map(
          (message) => this.messageItem(message.node)
        )}
      </Scrollbars>
    );
  };

  messageItem(node) {
    return (
      <div key={node.id}>
        <Panel>
          <Panel.Heading>
            {node.sender.full_name}
          </Panel.Heading>
          <Panel.Body>
            {node.body}
          </Panel.Body>
        </Panel>
      </div>
    );
  };
};

export default Messages;
