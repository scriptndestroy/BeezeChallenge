import React, { Component } from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";
import "./home.css";
import { GetHeroes } from "./functions";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {};

    this.onGetHeroesClick = this.onGetHeroesClick.bind(this);
  }

  componentDidMount() {}

  onGetHeroesClick() {
    GetHeroes();
  }

  render() {
    return (
      <>
        <Jumbotron fluid className="head miniBackground">
          <Container className="text-white text-center">
            <h1>MARVEL API</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>

            <Button variant="danger" onClick={this.onGetHeroesClick}>
              Get heroes
            </Button>
          </Container>
        </Jumbotron>
        <Container>asdads</Container>
      </>
    );
  }
}
