import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MyDialogs from '../components/dialogs/MyDialogs';
import ChatWidget from '../components/dialogs/ChatWidget';
import Profile from '../components/user/Profile';
import Edit from '../components/user/Edit';
import NotFound from '../components/errors/NotFound';
import SearchUser from '../components/search/SearchUser';

const AuthenticatedRouter = () => {
  return(
    <Switch>
      <Route exact path='/' component={MyDialogs} />
      <Route exact path='/dialog/:id' component={ChatWidget} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/profile/edit' component={Edit} />
      <Route exact path='/search' component={SearchUser} />
      <Route exact path='*' component={NotFound} />
    </Switch>
  )
};

export default AuthenticatedRouter;
