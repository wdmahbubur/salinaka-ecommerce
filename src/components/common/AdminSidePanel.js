// import { ADMIN_PRODUCTS } from 'constants/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavigation = () => (
  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to="/dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to="/admin-products"
        >
          Products
        </NavLink>
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to="/add-products"
        >
          Add Products
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <h4 className="sidenavigation-menu my-0">Users</h4>
      </div>
    </div>
  </aside>
);

export default SideNavigation;
