/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserRoute = ({ children, rest }) => {
    let { user } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email && user.role === "USER" ? (
                    <main className="content">
                        {children}
                    </main>

                ) : user.email && user.role === "ADMIN" ?
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: { from: location }
                        }}
                    />
                    : (
                        <Redirect
                            to={{
                                pathname: "/sign-in",
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

UserRoute.defaultProps = {
    isAuth: false,
    role: 'USER'
};

UserRoute.propTypes = {
    isAuth: PropType.bool,
    role: PropType.string,
    // eslint-disable-next-line react/require-default-props
    rest: PropType.any
};

export default connect(mapStateToProps)(UserRoute);
