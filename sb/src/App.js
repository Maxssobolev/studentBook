import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//main styles
import './assets/scss/main.scss'

//Названия файлов, содержащих страницы, должны быть написаны строчными буквами
//Файлы со страницами должны лежать в папке ./pages
import PageRenderer from './page-renderer'


//components
import SideMenu from "./components/SideMenu/SideMenu";
import TopMenu from "./components/TopMenu/TopMenu";
import { Container } from "react-bootstrap";


function App() {
  return (
    <Router>

      <TopMenu />

      <Container className="content">
        <SideMenu />
        <Switch>
          <Route path="/:page" component={PageRenderer} />
          <Route path="/" render={() => <Redirect to="/main" />} />
          <Route component={() => 404} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
