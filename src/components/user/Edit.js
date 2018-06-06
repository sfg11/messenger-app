import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  validationRequiredField,
  validationEMailFiled,
  validationPasswordField,
  validationPasswordConfirmationField,
} from '../../utils/fieldsValidations';

import {
  Grid, Col, Form, FormGroup, ControlLabel, FormControl, Button, PageHeader,
} from 'react-bootstrap';

import UPDATE from '../../graphql/mutations/user/UPDATE.gql';

class Edit extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    current_password: '',
    password: '',
    password_confirmation: '',
  };

  render() {
    const editProfile = (
      <Mutation mutation={UPDATE}>
        {(update) => (
          <Grid>
            <Form
              horizontal
              onSubmit={e => {
                e.preventDefault();

                const {
                  first_name,
                  last_name,
                  email,
                  current_password,
                  password,
                  password_confirmation,
                } = this.state;

                update({ variables: {
                  first_name,
                  last_name,
                  email,
                  current_password,
                  password,
                  password_confirmation,
                }})
                .then((response) => {
                  if (response.data.updateUser) {
                    this.props.history.push(`/profile`);
                  } else {
                    alert('Something went wrong.')
                  }
                })
                .catch((error) => {
                  console.log('Edit profile error', error)
                });
              }}
            >

            <FormGroup>
              <Col sm={3}></Col>
              <Col sm={6}><PageHeader align='center'><small>Edit Profile</small></PageHeader></Col>
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

            <FormGroup validationState={validationPasswordField(this.state.current_password)}>
              <Col componentClass={ControlLabel} sm={4}>Current Password</Col>
              <Col sm={4}>
                <FormControl
                  value={this.state.current_password}
                  onChange={e => this.setState({ current_password: e.target.value })}
                  type='password'
                  placeholder='Current Password'
                />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={4}></Col>
              <Col sm={4}><p>If you don't want to change password leave empty fields below.</p></Col>
            </FormGroup>
            <FormGroup validationState={this._validPassword()}>
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
            <FormGroup validationState={this._validPasswordConfirmation() }>
              <Col componentClass={ControlLabel} sm={4}>Password Confirmation</Col>
              <Col sm={4}>
                <FormControl
                  value={this.state.password_confirmation}
                  onChange={e => this.setState({ password_confirmation: e.target.value })}
                  type='password'
                  placeholder='Password Confirmation'
                />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={4}></Col>
              <Col sm={4}>
                <Button type='submit' bsStyle="primary" block>Save changes</Button>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={4}></Col>
              <Col sm={4}>
                <Button href='/profile' block>Cancel</Button>
              </Col>
            </FormGroup>
          </Form>
        </Grid>
        )}
      </Mutation>
    );
    return (editProfile);
  };
  _validPassword() {
    if (this.state.password === '' && this.state.password_confirmation === '') return true;
    return validationPasswordField(this.state.password);
  }
  _validPasswordConfirmation() {
    if (this.state.password === '' && this.state.password_confirmation === '') return true;
    return validationPasswordConfirmationField(this.state.password, this.state.password_confirmation);
  }
};
export default Edit;
