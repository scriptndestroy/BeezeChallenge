import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from './components/Home/Home';

// import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        
      </Layout>
    );
  }
}
// <Route path='/poliza/:id' render={(props) => <Poliza {...props} lang={this.state.language} userCountries={this.state.userCountries} />} />

