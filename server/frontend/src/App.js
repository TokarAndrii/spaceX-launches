import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
import LaunchesList from './components/launchesList/LaunchesList'


import styles from './App.module.css'
import logo from './images/SpaceXLogo.svg'

const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className={styles.app}>
          <header className={styles.appheader}>
            <img src={logo} className={styles.applogo} alt="logo" />
          </header>
          <main className={styles.mainContentPage}>
            <LaunchesList></LaunchesList>
          </main>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
