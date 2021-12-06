import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import PageRenderer from './page-renderer'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:page" component={PageRenderer} />
        <Route path="/" render={() => <Redirect to="/main" />} />
        <Route component={() => 404} />
      </Switch>
    </Router>

  );
}

export default App;
