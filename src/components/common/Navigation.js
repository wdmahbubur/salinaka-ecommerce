/* eslint-disable indent */
import { FilterOutlined, ShoppingOutlined } from '@ant-design/icons';
import logo from '../../images/logo-full.png';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Link, NavLink, useLocation
} from 'react-router-dom';
import UserAvatar from '../../pages/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import FiltersToggle from './FiltersToggle';
import MobileNavigation from './MobileNavigation';
import SearchBar from './SearchBar';
import useAuth from '../../hooks/useAuth';

const Navigation = () => {
  const navbar = useRef(null);
  const { pathname } = useLocation();

  const { user } = useAuth();

  const store = useSelector((state) => ({
    basketLength: state.basket.length,
    isLoading: state.app.loading
  }));

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 70) {
        navbar.current.classList.add('is-nav-scrolled');
      } else {
        navbar.current.classList.remove('is-nav-scrolled');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);


  // // disable the basket toggle to these pathnames
  // const basketDisabledpathnames = [
  //   ROUTE.CHECKOUT_STEP_1,
  //   ROUTE.CHECKOUT_STEP_2,
  //   ROUTE.CHECKOUT_STEP_3,
  //   ROUTE.SIGNIN,
  //   ROUTE.SIGNUP,
  //   ROUTE.FORGOT_PASSWORD
  // ];

  // if (user?.email && user?.role === 'ADMIN') {
  //   return null;
  // } 
  if (window.screen.width <= 800) {
    return (
      <MobileNavigation
        // eslint-disable-next-line react/jsx-props-no-spreading
        // {...store}
        // disabledPaths={basketDisabledpathnames}
        pathname={pathname}
      />
    );
  }
  return (
    <nav className="navigation" ref={navbar}>
      <div className="logo">
        <Link to="/"><img alt="Logo" src={logo} /></Link>
      </div>
      <ul className="navigation-menu-main">
        <li><NavLink activeClassName="navigation-menu-active" to="/">Home</NavLink></li>
        <li><NavLink activeClassName="navigation-menu-active" to="/shop">Shop</NavLink></li>
        <li><NavLink activeClassName="navigation-menu-active" to="/featured">Featured</NavLink></li>
        <li><NavLink activeClassName="navigation-menu-active" to="recommended-products">Recommended</NavLink></li>
      </ul>
      {(pathname === "shop" || pathname === "search") && (
        <FiltersToggle>
          <button className="button-muted button-small" type="button">
            Filters &nbsp;
            <FilterOutlined />
          </button>
        </FiltersToggle>
      )}
      <SearchBar />
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <BasketToggle>
            {({ onClickToggle }) => (
              <button
                className="button-link navigation-menu-link basket-toggle"

                onClick={onClickToggle}
                type="button"
              >
                <Badge count={store.basketLength}>
                  <ShoppingOutlined style={{ fontSize: '2.4rem' }} />
                </Badge>
              </button>
            )}
          </BasketToggle>
        </li>
        {user?.email ? (
          <li className="navigation-menu-item">
            <UserAvatar />
          </li>
        ) : (
          <li className="navigation-action">
            {pathname !== "sign-up" && (
              <Link
                className="button button-small"
                to="/sign-up"
              >
                Sign Up
              </Link>
            )}
            {pathname !== "sign-in" && (
              <Link
                className="button button-small button-muted margin-left-s"
                to="/sign-in"
              >
                Sign In
              </Link>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
