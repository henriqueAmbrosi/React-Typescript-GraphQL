import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ConsultaProdutos from './components/produtos/consulta/consulta';
import FormProdutos from './components/produtos/form/form';
import AppBar from './components/appbar/appbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://primary-kodiak-51.hasura.app/v1/graphql',

      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': authToken,
        Authorization: `Bearer ${authToken}`,
      },
    }),

    cache: new InMemoryCache(),
  });
};

const client = createApolloClient(
  'SBm3Ik7K1WwaQKEipQjdokzbTrNtAIJtZtBaHF0NFtUFg6w0SYELwaKry0Fl6k8h'
);

const Routes = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/produtos/consulta" />
          </Route>

          <Route path="/produtos/consulta" component={ConsultaProdutos} />
          <Route path="/produtos/form" component={FormProdutos} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default Routes;
