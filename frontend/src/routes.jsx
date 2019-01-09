import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Login from './components/views/login';
import Admin from './components/views/admin';
import Register from './components/views/register';
import Search from './components/views/search';
import Shop from './components/views/addshop';
import Product from './components/views/addprice';
import Products from './components/views/favourite_products';
import newProduct from './components/views/new_product';

/*
const fakeAuth = {
  isAuthenticated: false,
   authenticate(cb) {
    this.isAuthenticated = true;
  },
  signout(cb) {
    this.isAuthenticated = false;
  }
};


const PrivateRoute = ({ component: Component, _ }) => (
  <Route render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
*/
export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />
    <Route path='register' component={Register} />
    <Route path='admin' component={Admin} />
    <PrivateRoute path='search' component={Search} />
    <Route path='addshop' component={Shop} />
    <Route path='addprice' component={Product} />
    <Route path='products' component={Products} />
    <Route path='newproduct' component={newProduct} />
    <Route path='*' component={Home} />
  </Route>
);