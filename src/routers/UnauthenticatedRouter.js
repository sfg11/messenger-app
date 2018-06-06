import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignIn from '../components/user/SignIn';
import SignUp from '../components/user/SignUp';
import NotFound from '../components/errors/NotFound';

const UnauthenticatedRouter = () => {
  return(
    <Switch>
      <Route exact path='/' render={() => ( <Redirect to='/signin' /> ) } />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='*' component={NotFound} />
    </Switch>
  )
};

export default UnauthenticatedRouter;
