
import React, { Component } from 'react';
import { isAuthenticated } from './utils/authenticateHelpers';
import AuthenticatedRouter from './routers/AuthenticatedRouter'
import UnauthenticatedRouter from './routers/UnauthenticatedRouter'

import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className=''>
        <Header />
        <div style={{ marginTop: 70 }}>
          { isAuthenticated() ? (
            <AuthenticatedRouter />
          ) : (
            <UnauthenticatedRouter />
          )}
        </div>
      </div>
    );
  }
}

export default App;
