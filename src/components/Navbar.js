import React from 'react'
import { Link } from 'gatsby'
import { AuthUserContext } from './Session';
import SignOutBtn from './SignOut';
import * as ROUTES from '../constants/routes';

import github from '../img/github-icon.svg'
import logo from '../img/careconsult.svg'

const NavbarComponent = () => (
  <AuthUserContext.Consumer>
    {authUser => <Navbar authUser={authUser} />}
  </AuthUserContext.Consumer>
);


const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="CareConsult" />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
              <Link className="navbar-item" to="/home">
                <b>Calendar</b>
              </Link>
            </div>

            <div className="navbar-end has-text-centered">
              {/* <Link className="navbar-item" to={ROUTES.SIGN_IN}>
                Log In
              </Link> */}
              {!this.props.authUser && (
                  <Link className="navbar-item" to={ROUTES.SIGN_IN}>Log In</Link>
              )}
              {!!this.props.authUser && (
                  <SignOutBtn className="navbar-item" to={ROUTES.SIGN_IN}>Log In</SignOutBtn>
              )}
              <a
                className="navbar-item"
                href="https://github.com/marcoscannabrava/free-covid-consultation-calendar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={github} alt="Github" />
                </span>
              </a>
            </div>

          </div>
        </div>
      </nav>
    )
  }
}

export default NavbarComponent
