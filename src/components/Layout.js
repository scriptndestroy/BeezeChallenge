import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { NavMenu } from "./NavMenu/NavMenu";
// import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container fluid className="p-0">{this.props.children}</Container>
      </div>
    );
  }
}
