import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import SocialLogin from '../../../components/common/SocialLogin';
import CustomInput from '../../../components/formik/CustomInput';
// import { SIGNIN } from 'constants/routes';
import { Field, Form, Formik } from 'formik';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useDocumentTitle';
import PropType from 'prop-types';
import React, { useEffect } from 'react';

import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password length should be at least 8 characters.')
    .matches(/[A-Z\W]/g, 'Password should contain at least 1 uppercase letter.'),
  fullname: Yup.string()
    .required('Full name is required.')
    .min(4, 'Name should be at least 4 characters.')
});

const SignUp = () => {
  const { createAccount, user, success, loading, error } = useAuth();
  let history = useHistory();
  const location = useLocation();

  useScrollTop();
  useDocumentTitle('Sign Up | Salinaka');

  const onClickSignIn = () => history.push("/sign-in");

  const onFormSubmit = (form) => {
    createAccount(
      form.fullname.trim(),
      form.email.trim().toLowerCase(),
      form.password.trim()
    )
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
            Sign Up Success
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
          <div className={`auth ${success && (!success && 'input-error')}`}>
            <div className="auth-main">
              <h3>Sign up to Salinaka</h3>
              <Formik
                initialValues={{
                  fullname: '',
                  email: '',
                  password: ''
                }}
                validateOnChange
                validationSchema={SignInSchema}
                onSubmit={onFormSubmit}
              >
                {() => (
                  <Form>
                    <div className="auth-field">
                      <Field
                        disabled={loading}
                        name="fullname"
                        type="text"
                        label="* Full Name"
                        placeholder="John Doe"
                        style={{ textTransform: 'capitalize' }}
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={loading}
                        name="email"
                        type="email"
                        label="* Email"
                        placeholder="test@example.com"
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={loading}
                        name="password"
                        type="password"
                        label="* Password"
                        placeholder="Your Password"
                        component={CustomInput}
                      />
                    </div>
                    <br />
                    <div className="auth-field auth-action auth-action-signup">
                      <button
                        className="button auth-button"
                        disabled={loading}
                        type="submit"
                      >
                        {loading ? 'Signing Up' : 'Sign Up'}
                        &nbsp;
                        {loading ? <LoadingOutlined /> : <ArrowRightOutlined />}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="auth-divider">
              <h6>OR</h6>
            </div>
            <SocialLogin isLoading={loading} />
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>Already have an account?</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray"
              disabled={loading}
              onClick={onClickSignIn}
              type="button"
            >
              Sign In
            </button>
          </div>
        </>
      )}
    </div>
  );
};

SignUp.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default SignUp;
