import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Login from './components/views/login';
import Admin from './components/views/admin';
import Register from './components/views/register';
import Search from './components/views/search';
import Shop from './components/views/addshop';
import Product from './components/views/addproduct';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />
    <Route path='register' component={Register} />
    <Route path='admin' component={Admin} />
    <Route path='search' component={Search} />
    <Route path='addshop' component={Shop} />
    <Route path='addproduct' component={Product} />
    <Route path='*' component={Home} />
  </Route>
);
