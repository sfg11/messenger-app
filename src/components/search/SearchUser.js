import React, { Component } from 'react';
import { Query } from 'react-apollo';

import {
  Grid, Row, Col, Form, FormGroup, FormControl, Panel,
} from 'react-bootstrap';
import Pager from 'react-pager';
import DirectMessageWidget from './DirectMessageWidget';

import ALL_USERS from '../../graphql/queries/user/ALL_USERS.gql';
import { USERS_PER_PAGE } from '../../constants';

class SearchUser extends Component {
  constructor(props) {
    super(props)

    this.handlePageChanged = this.handlePageChanged.bind(this);
    this.handleDirectMessageWidgetShow = this.handleDirectMessageWidgetShow.bind(this);
    this.handleDirectMessageWidgetClose = this.handleDirectMessageWidgetClose.bind(this);

    this.state = {
      skip: 0,
      first: USERS_PER_PAGE,
      search: '',
      total: 0,
      current_page: 0,

      receiver_id: 0,
      receiver_name: '',
      receiver_email: '',
      subject: '',
      message: '',
      show: false,
    };
  };

  render() {
    return (
      <Grid>

        <Form
          horizontal
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <FormGroup>
            <Col sm={3}></Col>
            <Col sm={6}>
              <FormControl
                value={this.state.search}
                onChange={e => {
                  this.setState({ search: e.target.value })
                  this.handlePageChanged(0)
                }}
                type='text'
                placeholder='Type name or email'
              />
            </Col>
          </FormGroup>
        </Form>

        <Query query={ALL_USERS} variables={ this.state }>
          {({ loading, error, data }) => {
            if (loading) return <div align='center'><h3>Loading...</h3></div>;
            if (error) return <div align='center'><h3>Error! {error.message}</h3></div>;

            this.state.total = Math.ceil( data.all_users.users_count / USERS_PER_PAGE );

            return (
              <div>
                { data.all_users.users.map((user) => this.userItem(user)) }

                <div align='center'>
                  <Pager
                    total={this.state.total}
                    current={this.state.current_page}
                    visiblePages={5}
                    titles={{ first: 'First', last: 'Last' }}
                    className='pagination-sm'
                    onPageChanged={this.handlePageChanged}
                  />
                </div>
              </div>
            );
          }}
        </Query>

        <DirectMessageWidget
          receiver_id={this.state.receiver_id}
          receiver_name={this.state.receiver_name}
          receiver_email={this.state.receiver_email}
          subject={this.state.subject}
          message={this.state.message}
          show={this.state.show}
          handleClose={this.handleDirectMessageWidgetClose}
          history={this.props.history}
        />

      </Grid>
    );
  };

  handlePageChanged(newPage) {
    this.setState({
      current_page: newPage,
      skip: newPage * USERS_PER_PAGE,
    });
  };

  userItem(user) {
    return (
      <Row key={user.id}>
        <Col sm={3}></Col>
        <Col sm={6}>
        <Panel>
          <Panel.Body>
            <h4>{user.full_name}</h4>
            <h4>{user.email}</h4>
          </Panel.Body>
          <Panel.Heading>
            <Panel.Title toggle>
              <h5 onClick={() => {
                this.handleDirectMessageWidgetShow(user)
              }}>Direct message</h5>
            </Panel.Title>
          </Panel.Heading>
        </Panel>
        </Col>
      </Row>
    );
  };

  handleDirectMessageWidgetShow(user) {
    this.setState({
      receiver_id: user.id,
      receiver_name: user.full_name,
      receiver_email: user.email,
      show: true,
    });
  };

  handleDirectMessageWidgetClose() {
    this.setState({
      receiver_id: 0,
      receiver_name: '',
      receiver_email: '',
      show: false,
    });
  };
};

export default SearchUser;
