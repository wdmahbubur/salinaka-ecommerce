/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import AdminNavigation from '../components/common/AdminNavigation';
import AdminSideBar from '../components/common/AdminSidePanel';
import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children, rest }) => {
    let { user } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email && user.role === "ADMIN" ? (
                    <>
                        <main className="content-admin">
                            <AdminSideBar />
                            <div className="content-admin-wrapper">
                                {children}
                            </div>
                        </main>
                    </>

                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = ({ auth }) => ({
    isAuth: !!auth,
    role: auth?.role || ''
});

AdminRoute.defaultProps = {
    isAuth: false,
    role: 'USER'
};

AdminRoute.propTypes = {
    isAuth: PropType.bool,
    role: PropType.string,
    // eslint-disable-next-line react/require-default-props
    rest: PropType.any
};

export default connect(mapStateToProps)(AdminRoute);
