/* eslint-disable no-nested-ternary */
// import { SIGNIN } from 'constants/routes';
import { calculateTotal } from '../../../helpers/utils';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const withCheckout = (Component) => withRouter((props) => {
  const user = useAuth();
  const state = useSelector((store) => ({
    basket: store.basket,
    shipping: store.checkout.shipping,
    payment: store.checkout.payment
  }));

  const shippingFee = state.shipping.isInternational ? 50 : 0;
  const subtotal = calculateTotal(state.basket.map((product) => product.price * product.quantity));

  if (!user.user.email) {
    return <Redirect to="/sign-in" />;
  } if (state.basket.length === 0) {
    return <Redirect to="/" />;
  } if (user.user.email && state.basket.length !== 0) {
    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        basket={state.basket}
        payment={state.payment}
        profile={user.user}
        shipping={state.shipping}
        subtotal={Number(subtotal + shippingFee)}
      />
    );
  }
  return null;
});

export default withCheckout;
