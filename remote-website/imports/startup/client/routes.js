import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import PageNotFound from '../../ui/PageNotFound/PageNotFound';
import EmailApp from '../../ui/EmailApp/EmailApp';
import FacebookApp from '../../ui/FacebookApp/FacebookApp';
import Index from '../../ui/Index/Index.jsx';

const browserHistory = createBrowserHistory();

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/emailapp" component={EmailApp} />
      <Route exact path="/emailapp/:guid" component={EmailApp} />
      <Route exact path="/facebookapp" component={FacebookApp} />
      <Route exact path="/facebookapp/:guid" component={FacebookApp} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);

export default renderRoutes;
