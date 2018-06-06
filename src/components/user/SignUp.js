import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { setAuthToken } from '../../utils/authenticateHelpers';
import {
  validationEMailFiled,
  validationPasswordField,
  validationRequiredField,
  validationPasswordConfirmationField,
} from '../../utils/fieldsValidations';

import {
  Grid, Col, Form, FormGroup, ControlLabel, FormControl, Button, PageHeader,
} from 'react-bootstrap';

import SIGN_UP from '../../graphql/mutations/user/SIGN_UP.gql';

class SignUp extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  render() {
    const signUpForm = (
        <Mutation mutation={SIGN_UP}>
          {(signUp) => (
            <Grid>
            <Form
              horizontal
              onSubmit={e => {
                e.preventDefault();

                const { first_name, last_name, email, password, password_confirmation } = this.state;

                signUp({ variables: {
                  first_name, last_name, email, password, password_confirmation,
                }})
                .then((response) => {
                  if (response.data.createUser) {
                    setAuthToken( response.data.createUser.token );
                    this.props.history.push(`/`);
                  } else {
                    alert('Sign up error.')
                  }
                })
                .catch((error) => {
                  console.log('Sign up error', error)
                });
              }}
            >
              <FormGroup>
                <Col sm={3}></Col>
                <Col sm={6}><PageHeader align='center'><small>Sign Up</small></PageHeader></Col>
              </FormGroup>

              <FormGroup validationState={validationRequiredField(this.state.first_name)}>
                <Col componentClass={ControlLabel} sm={4}>First name</Col>
                <Col sm={4}>
                  <FormControl
                    value={this.state.first_name}
                    onChange={e => this.setState({ first_name: e.target.value })}
                    type='text'
                    placeholder='First name'
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>

              <FormGroup validationState={validationRequiredField(this.state.last_name)}>
                <Col componentClass={ControlLabel} sm={4}>Last name</Col>
                <Col sm={4}>
                  <FormControl
                    value={this.state.last_name}
                    onChange={e => this.setState({ last_name: e.target.value })}
                    type='text'
                    placeholder='Last name'
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>

              <FormGroup validationState={validationEMailFiled(this.state.email)}>
                <Col componentClass={ControlLabel} sm={4}>Email</Col>
                <Col sm={4}>
                  <FormControl
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    type='text'
                    placeholder='Email'
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>

              <FormGroup validationState={validationPasswordField(this.state.password)}>
                <Col componentClass={ControlLabel} sm={4}>Password</Col>
                <Col sm={4}>
                  <FormControl
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    type='password'
                    placeholder='Password'
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>

              <FormGroup
                validationState={validationPasswordConfirmationField(
                  this.state.password,
                  this.state.password_confirmation,
                )}
              >
                <Col componentClass={ControlLabel} sm={4}>Password confirmation</Col>
                <Col sm={4}>
                  <FormControl
                    value={this.state.password_confirmation}
                    onChange={e => this.setState({ password_confirmation: e.target.value })}
                    type='password'
                    placeholder='Password confirmation'
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={4}></Col>
                <Col sm={4}>
                  <Button type='submit' bsStyle="primary" block>Sign up</Button>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={4}></Col>
                <Col sm={4}>
                  <Button href='/signin' block>Sign in</Button>
                </Col>
              </FormGroup>
            </Form>
            </Grid>
          )}
      </Mutation>
    );

    return (signUpForm);
  };
};

export default SignUp
