import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { Grid, Col, Nav, NavItem, Button, } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';

import CONVERSATIONS from '../../graphql/queries/dialogs/CONVERSATIONS.gql';

class MyDialogs extends Component {

  render() {
    return (
      <Grid>
        <Col sm={3}></Col>
        <Col sm={6}>
          <Scrollbars
            autoHeight
            autoHeightMin={0}
            autoHeightMax={580}
          >
            <Query query={CONVERSATIONS}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                const conversations = data.current_user.conversations.edges;

                if (conversations.length === 0) {
                  return (
                    <div align='center'>
                      <h1>You do not have any dialogs.</h1>
                      <h2>Search the new interlocutor and send him the first message.</h2>
                      <Button href='/search' bsStyle='primary'>Search</Button>
                    </div>
                  );
                } else {
                  return (
                    <Nav bsStyle='pills' stacked>
                      {data.current_user.conversations.edges.map(
                        (conversation) => this.conversationItem(conversation.node)
                      )}
                    </Nav>
                  );
                }
              }}
            </Query>
          </Scrollbars>
        </Col>
      </Grid>
    );
  };

  conversationItem(node) {
    const redirect_url = '/dialog/' + node.id;

    return (
      <NavItem
        key={node.id}
        href={redirect_url}
      >
        <div>
          <strong>{ node.interlocutor.full_name }</strong>
        </div>
        <div>
          Subject: { node.subject }
        </div>
      </NavItem>
    );
  };
};

export default MyDialogs;
