import React from "react";
import { Router, Route, Switch } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

// route components
import App from "../../ui/App";
import { PageNotFound } from "../../ui/PageNotFound/PageNotFound";
import { EmailApp } from "../../ui/EmailApp/EmailApp";
import { FacebookApp } from "../../ui/FacebookApp/FacebookApp";

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={App} />
      {/* <Route exact path="/lists/:id" component={ListPageContainer} />
      <Route exact path="/signin" component={AuthPageSignIn} /> */}
      <Route exact path="/emailapp" component={EmailApp} />
      <Route exact path="/facebookapp" component={FacebookApp} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);
