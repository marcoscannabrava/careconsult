import React from 'react';
import { compose } from 'recompose';
import Calendar from '../components/Calendar';
import Layout from '../components/Layout';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import Messages from '../components/Messages';

const HomePageBase = () => (
  <div>
    <h1>Appointment Scheduling</h1>
    {/*The Home Page is accessible by every signed in user.*/}
    <Calendar/>
    <Messages />
  </div>
);

const condition = authUser => !!authUser;
const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

// const HomePage = HomePageBase;


export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
