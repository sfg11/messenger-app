import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { setAuthToken } from '../../utils/authenticateHelpers';
import { validationEMailFiled, validationPasswordField } from '../../utils/fieldsValidations';

import {
  Grid, Col, Form, FormGroup, ControlLabel, FormControl, Button, PageHeader,
} from 'react-bootstrap';

import SIGN_IN from '../../graphql/mutations/user/SIGN_IN.gql';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    const signInForm = (
      <Mutation mutation={SIGN_IN}>
        {(signIn) => (
          <Grid>
          <Form
            horizontal
            onSubmit={e => {
              e.preventDefault();

              const { email, password } = this.state;

              signIn({ variables: {
                email, password,
              }})
              .then((response) => {
                if (response.data.signinUser) {
                  setAuthToken( response.data.signinUser.token );
                  this.props.history.push(`/`);
                } else {
                  alert('Login or password is incorrect.')
                }
              })
              .catch((error) => {
                console.log('Sign in error', error)
              });
            }}
          >
            <FormGroup>
              <Col sm={3}></Col>
              <Col sm={6}><PageHeader align='center'><small>Sign In</small></PageHeader></Col>
            </FormGroup>

            <FormGroup validationState={validationEMailFiled(this.state.email)}>
              <Col componentClass={ControlLabel} sm={4}>Email</Col>
              <Col sm={4}>
                <FormControl
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  type='text'
                  placeholder='Your email address'
                />
              </Col>
            </FormGroup>

            <FormGroup validationState={validationPasswordField(this.state.password)}>
              <Col componentClass={ControlLabel} sm={4}>Password</Col>
              <Col sm={4}>
                <FormControl
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  type='password'
                  placeholder='Your password'
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={4}></Col>
              <Col sm={4}>
                <Button type='submit' bsStyle="primary" block>Sign in</Button>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={4}></Col>
              <Col sm={4}>
                <Button href='/signup' block>Sign up</Button>
              </Col>
            </FormGroup>
          </Form>
          </Grid>
        )}
      </Mutation>
    );

    return (signInForm);
  };
};

export default SignIn;
