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
import TopMenuMobile from "./components/mobile/TopMenuMobile/TopMenuMobile";
import FooterMobile from "./components/mobile/FooterMobile/FooterMobile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMobile } from "./state/reducers/windowReducer";



function App() {

  //set up window dimensions
  const [isMobile] = useWindowSize()
  const dispatch = useDispatch()
  const window = useSelector(state => state.window)


  useEffect(() => {
    dispatch(setMobile(isMobile))
  }, [dispatch, isMobile])
  // ----------------------


  if (window.isMobile === undefined) {
    return (
      <MainLoader />
    )
  }
  else if (!window.isMobile)
    return (
      <Router>
        <TopMenu />

        <Container className="content content_desktop">
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
        <Container className="content content_mobile">
          <TopMenuMobile />
          <Switch>
            <Route path="/:page" component={PageRenderer} />
            <Route path="/" render={() => <Redirect to="/main" />} />
          </Switch>
          <FooterMobile />
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
