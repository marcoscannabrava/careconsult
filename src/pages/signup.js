import React, { Fragment } from 'react';

import Layout from '../components/Layout';
import SignUpForm from '../components/SignUp';

const SignUpPage = () => (
  <Fragment>
    <SignUpForm />
  </Fragment>
);

export default () => (
  <Layout>
    <SignUpPage />
  </Layout>
);
