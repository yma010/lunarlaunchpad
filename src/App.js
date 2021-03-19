import React from 'react';
import { Switch, Route } from 'react'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing';
import AuthenticatedRoute from './session/AuthenticatedRoute'

export const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing}/>
      <AuthenticatedRoute exact path="/dashboard" component={Dashboard}/>
    </Switch>
  );
}

export default App;
