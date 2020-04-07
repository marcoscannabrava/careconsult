import React from 'react';
import { Link } from 'gatsby'
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Link 
    className="navbar-item" 
    to={ROUTES.LANDING}
    onClick={firebase ? firebase.doSignOut : () => {}}
  >
    Sign Out
  </Link>
);

export default withFirebase(SignOutButton);
