import React, { Component } from 'react';
import { Query } from 'react-apollo';

import {
  Grid, Row, Col, Button, PageHeader,
} from 'react-bootstrap';

import CURRENT_USER from '../../graphql/queries/user/CURRENT_USER.gql';

class Profile extends Component {

  render() {
    const profile = (
      <Query query={CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const { first_name, last_name, email } =  data.current_user;

          return (
            <Grid>
              <Row>
                <Col sm={3}></Col>
                <Col sm={6}><PageHeader align='center'><small>Profile</small></PageHeader></Col>
              </Row>
              <Row>
                <Col sm={3}></Col>
                <Col sm={3}><h4>First name:</h4></Col>
                <Col sm={3}><h4>{ first_name }</h4></Col>
              </Row>
              <Row>
                <Col sm={3}></Col>
                <Col sm={3}><h4>Last name:</h4></Col>
                <Col sm={3}><h4>{ last_name }</h4></Col>
              </Row>
              <Row>
                <Col sm={3}></Col>
                <Col sm={3}><h4>Email:</h4></Col>
                <Col sm={3}><h4>{ email }</h4></Col>
              </Row>
              <div style={{height: 10}}></div>
              <Row>
                <Col sm={4}></Col>
                <Col sm={4}>
                  <Button href='/profile/edit' block>Edit profile</Button>
                </Col>
              </Row>
            </Grid>
          );
        }}
      </Query>
    );

    return (profile);
  };
};

export default Profile;
