import { FacebookOutlined, GithubFilled, GoogleOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const SocialLogin = ({ isLoading }) => {
  const { user, googleSignIn } = useAuth();
  return (
    <div className="auth-provider">
      <button
        className="button auth-provider-button provider-facebook"
        disabled={isLoading}
        type="button"
      >
        {/* <i className="fab fa-facebook" /> */}
        <FacebookOutlined />
        Continue with Facebook
      </button>
      <button
        className="button auth-provider-button provider-google"
        disabled={isLoading}
        onClick={googleSignIn}
        type="button"
      >
        <GoogleOutlined />
        Continue with Google
      </button>
      <button
        className="button auth-provider-button provider-github"
        disabled={isLoading}
        type="button"
      >
        <GithubFilled />
        Continue with GitHub
      </button>
    </div>
  );
};

SocialLogin.propTypes = {
  isLoading: PropType.bool.isRequired
};

export default SocialLogin;
