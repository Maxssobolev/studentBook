import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
//main styles
import './assets/scss/main.scss'

//Названия файлов, содержащих страницы, должны быть написаны строчными буквами
//Файлы со страницами должны лежать в папке ./pages
import PageRenderer from './page-renderer'


//components
import SideMenu from "./components/SideMenu/SideMenu";
import TopMenu from "./components/TopMenu/TopMenu";
import { Container } from "react-bootstrap";


//apolo client and api 
import { API } from "./config/api/api";
const client = new ApolloClient({
  uri: API.uri,
  cache: new InMemoryCache()
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <TopMenu />

        <Container className="content">
          <SideMenu />
          <Switch>
            <Route path="/:page" component={PageRenderer} />
            <Route path="/" render={() => <Redirect to="/main" />} />

          </Switch>
        </Container>
      </ApolloProvider>
    </Router>
  );
}

export default App;
