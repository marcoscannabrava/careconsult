import React, { Component, Fragment } from 'react';

import Navigation from './Navigation';
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';


class LayoutTemplate extends Component {
  state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <AppWithAuthentication {...this.props} />
      </FirebaseContext.Provider>
    );
  }
}

const AppWithAuthentication = withAuthentication(({ children }) => (
  <Fragment>
    <Navigation />
    <hr />
    { children }
  </Fragment>
));

// export default LayoutTemplate;












// Layout.JS

// import React from 'react'
// import { Helmet } from 'react-helmet'
// import './all.sass'
// import useSiteMetadata from './SiteMetadata'
// import { withPrefix } from 'gatsby'

// import Navbar from './Navbar'
// import Footer from './Footer'

// const TemplateWrapper = ({ children }) => {
//   const { title, description } = useSiteMetadata()
//   return (
//     <div>
//       <Helmet>
//         <html lang="en" />
//         <title>{title}</title>
//         <meta name="description" content={description} />

//         <link
//           rel="apple-touch-icon"
//           sizes="180x180"
//           href={`${withPrefix('/')}img/apple-touch-icon.png`}
//         />
//         <link
//           rel="icon"
//           type="image/png"
//           href={`${withPrefix('/')}img/stethoscope-icon.png`}//32x32 is preferred
//           sizes="32x32"
//         />
//         <link
//           rel="icon"
//           type="image/png"
//           href={`${withPrefix('/')}img/stethoscope-icon.png`}//16x16 is preferred
//           sizes="16x16"
//         />

//         <link
//           rel="mask-icon"
//           href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
//           color="#ff4400"
//         />
//         <meta name="theme-color" content="#fff" />

//         <meta property="og:type" content="business.business" />
//         <meta property="og:title" content={title} />
//         <meta property="og:url" content="/" />
//         <meta
//           property="og:image"
//           content={`${withPrefix('/')}img/og-image.jpg`}
//         />
//       </Helmet>
//       <Navbar />
//       <div>{children}</div>
//       <Footer />
//     </div>
//   )
// }

// export default TemplateWrapper
