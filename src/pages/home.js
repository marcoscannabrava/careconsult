import React from 'react';
import { compose } from 'recompose';
<<<<<<< HEAD
import Calendar from '../components/Calendar';
=======

>>>>>>> cff2a1c7a98b421292594ef650bcebc417b478f8
import Layout from '../components/Layout';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import Messages from '../components/Messages';

const HomePageBase = () => (
  <div>
<<<<<<< HEAD
    <h1>Appointment Scheduling</h1>
    {/*The Home Page is accessible by every signed in user.*/}
    <Calendar/>
=======
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

>>>>>>> cff2a1c7a98b421292594ef650bcebc417b478f8
    <Messages />
  </div>
);

const condition = authUser => !!authUser;

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
