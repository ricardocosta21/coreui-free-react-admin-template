import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const SignIn = React.lazy(() => import('./views/pages/login/SignIn'));
const SignUp = React.lazy(() => import('./views/pages/signup/SignUp'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));



class App extends Component {

  render() {
    return (
      <HashRouter>
          <Suspense fallback={loading}>
            <Switch>
              <Route exact path="/signin" name="SignIn Page" render={props => <SignIn {...props}/>} />
              <Route exact path="/signup" name="SignUp Page" render={props => <SignUp {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </Suspense>
      </HashRouter>
    );
  }
}

export default App;
