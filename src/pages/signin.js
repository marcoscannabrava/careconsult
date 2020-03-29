import React, { Fragment } from 'react';

import Layout from '../components/Layout';
import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from '../components/SignIn';
import { SignUpLink } from '../components/SignUp';
import { PasswordForgetLink } from '../components/PasswordForget';

const SignInPage = () => (
  <Fragment>
    <SignInForm />
    <div className="signup-form">
    <p>------- or--------</p>
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <PasswordForgetLink />
    <SignUpLink />
    </div>
  </Fragment>
);

export default () => (
  <Layout>
    <SignInPage />
  </Layout>
);
