import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from './components/Home/Home';
import { Detail } from './components/Detail/Detail';

// import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path='/Detail/:id' render={(props) => <Detail {...props} />} />
      </Layout>
    );
  }
}


