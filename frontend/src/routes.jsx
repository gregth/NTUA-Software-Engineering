import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Login from './components/views/login';
import Admin from './components/views/admin';
import Register from './components/views/register';
import Search from './components/views/home';
import Shop from './components/views/addshop';
import Product from './components/views/addprice';
import newProduct from './components/views/new_product';
import AllProducts from './components/views/all_products';
import EditProduct from './components/views/edit_product';
import AllShops from './components/views/all_shops';
import EditShop from './components/views/edit_shop';
import SearchShopProduct from './components/views/search_shop';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Search}/>
    <Route path='login' component={Login} />
    <Route path='register' component={Register} />
    <Route path='admin' component={Admin} />
    <Route path='addshop' component={Shop} />
    <Route path='addprice' component={Product} />
    <Route path='newproduct' component={newProduct} />
    <Route path='products' component={AllProducts} />
    <Route path='shops' component={AllShops} />
    <Route path='edit_product' component={EditProduct} />
    <Route path='edit_shop' component={EditShop} />
    <Route path='search' component={SearchShopProduct} />
    <Route path='*' component={Search} />
  </Route>
);