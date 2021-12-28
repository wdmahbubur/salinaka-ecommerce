import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import SocialLogin from '../../../components/common/SocialLogin';
import CustomInput from '../../../components/formik/CustomInput';
// import { FORGOT_PASSWORD, SIGNUP } from 'constants/routes';
import { Field, Form, Formik } from 'formik';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useDocumentTitle';
import PropType from 'prop-types';
import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
});

const SignIn = () => {
  const { login, success, user, loading, error } = useAuth();
  let history = useHistory();
  const location = useLocation();

  useScrollTop();
  useDocumentTitle('Sign In | Salinaka');

  

  const onSignUp = () => history.push("/sign-up");

  const onSubmitForm = (form) => {
    login(form.email, form.password);
  };

    const url = location.state?.from?.pathname || '/';
  useEffect(() => {
        if (user?.email) {
            history.push(url, { replace: true });
        }
  }, [user, history, url])

  return (
    <div className="auth-content">
      {success && (
        <div className="loader">
          <h3 className="toast-success auth-success">
            Sign In Success
            <LoadingOutlined />
          </h3>
        </div>
      )}
      {!success && (
        <>
          {error && (
            <h5 className="text-center toast-error">
              {error}
            </h5>
          )}
          <div className={`auth ${error && (error && 'input-error')}`}>
            <div className="auth-main">
              <h3>Sign in to Salinaka</h3>
              <br />
              <div className="auth-wrapper">
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validateOnChange
                  validationSchema={SignInSchema}
                  onSubmit={onSubmitForm}
                >
                  {() => (
                    <Form>
                      <div className="auth-field">
                        <Field
                          disabled={loading}
                          name="email"
                          type="email"
                          label="Email"
                          placeholder="test@example.com"
                          component={CustomInput}
                        />
                      </div>
                      <div className="auth-field">
                        <Field
                          disabled={loading}
                          name="password"
                          type="password"
                          label="Password"
                          placeholder="Your Password"
                          component={CustomInput}
                        />
                      </div>
                      <br />
                      <div className="auth-field auth-action">
                        <Link
                          style={{ textDecoration: 'underline' }}
                          to={"#"}
                        >
                          <span>Forgot password?</span>
                        </Link>
                        <button
                          className="button auth-button"
                          disabled={loading}
                          type="submit"
                        >
                          {loading ? 'Signing In' : 'Sign In'}
                          &nbsp;
                          {loading ? <LoadingOutlined /> : <ArrowRightOutlined />}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="auth-divider">
              <h6>OR</h6>
            </div>
            <SocialLogin isLoading={loading} />
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>Don&apos;t have an account?</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray button-icon"
              disabled={loading}
              onClick={onSignUp}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </>
      )}
    </div>
  );
};

SignIn.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default SignIn;
