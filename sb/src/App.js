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
import { Container, Spinner } from "react-bootstrap";
import useWindowSize from "./components/Hooks/useWindowSize";



function App() {
  const [isMobile] = useWindowSize()

  if (isMobile === undefined) {
    return (
      <MainLoader />
    )
  }
  else if (!isMobile)
    return (
      <Router>
        <TopMenu />

        <Container className="content">
          <SideMenu />
          <Switch>
            <Route path="/:page" component={PageRenderer} />
            <Route path="/" render={() => <Redirect to="/main" />} />
          </Switch>
        </Container>
      </Router>
    );
  else
    return (
      <Router>
        <TopMenu />
        <Container className="content">
          <Switch>
            <Route path="/:page" component={PageRenderer} />
            <Route path="/" render={() => <Redirect to="/main" />} />
          </Switch>
        </Container>
      </Router>
    )
}

const MainLoader = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <Spinner animation="grow" />
  </div>
)

export default App;
