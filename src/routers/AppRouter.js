import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from '../components/common/Navigation';
import Home from '../pages/home';
import Basket from '../components/basket/Basket';
import Footer from '../components/common/Footer';
import Search from '../pages/search';
import Shop from '../pages/shop';
import FeaturedProducts from '../pages/featured';
import RecommendedProducts from '../pages/recommended';
import SignIn from '../pages/auth/signin';
import SignUp from '../pages/auth/signup';
import ForgotPassword from '../pages/auth/forgot_password';
import UserAccount from '../pages/account/user_account';
import ViewProduct from '../pages/view_product';
import EditProfile from '../pages/account/edit_account';
import OrderSummary from '../pages/checkout/step1/index';
import ShippingDetails from '../pages/checkout/step2/index';
import Payment from '../pages/checkout/step3/index';
import Dashboard from '../pages/admin/dashboard';
import AddProduct from '../pages/admin/add_product/index';
import EditProduct from '../pages/admin/edit_product';
import { createBrowserHistory } from 'history';
import AuthProvider from '../Context/AuthProvider';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import PageNotFound from '../pages/error/PageNotFound';
import Products from '../pages/admin/products';
export const history = createBrowserHistory();
const AppRouter = () => {

  return (
    <AuthProvider>
      <Router history={history}>
        <Navigation />
        <Basket />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/search" component={Search} />
          <Route path="/shop" component={Shop} />
          <Route path="/featured" component={FeaturedProducts} />
          <Route path="/recommended-products" component={RecommendedProducts} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/product/:id">
            <ViewProduct />
          </Route>
          <UserRoute path="/account">
            <UserAccount />
          </UserRoute>
          <UserRoute path="/edit">
            <EditProfile />
          </UserRoute>
          <UserRoute path="/check-out-step-1">
            <OrderSummary />
          </UserRoute>
          <UserRoute path="/check-out-step-2">
            <ShippingDetails />
          </UserRoute>
          <UserRoute path="/check-out-step-3">
            <Payment />
          </UserRoute>
          <AdminRoute path="/dashboard">
            <Dashboard />
          </AdminRoute>
          <AdminRoute path="/admin-products">
            <Products />
          </AdminRoute>
          <AdminRoute path="/add-products">
            <AddProduct />
          </AdminRoute>
          <AdminRoute path="/edit-product">
            <EditProduct />
          </AdminRoute>
          <Route path="*" component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;