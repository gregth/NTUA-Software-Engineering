import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Login from './components/views/login';
import Admin from './components/views/admin';
import Visitor from './components/views/visitor';
import Register from './components/views/register';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />
    <Route path='register' component={Register} />
    <Route path='admin' component={Admin} />
    <Route path='visitor' component={Visitor} />
    <Route path='*' component={Home} />
  </Route>
);