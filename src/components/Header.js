import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, removeAuthToken } from '../utils/authenticateHelpers';

import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

class Header extends Component {
  render() {
    const navHeader = (
      <Navbar fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>
              My Messenger
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        { isAuthenticated() ? (
          <Nav pullRight>
            <NavItem href='/'>
              Dialogs
            </NavItem>
            <NavItem href='/profile'>
              Profile
            </NavItem>
            <NavItem href='/search'>
              Search
            </NavItem>
            <NavItem onClick={() => {
                removeAuthToken();
                this.props.history.push(`/`);
              }}
              href='/signin'
            >
              Sign out
            </NavItem>
          </Nav>
        ) : (
          <Nav pullRight>
            <NavItem href='/signin'>
              Sign in
            </NavItem>
            <NavItem href='/signup'>
              Sign up
            </NavItem>
          </Nav>
        )}
      </Navbar>
    );

    return (navHeader);
  };
};

export default Header;
