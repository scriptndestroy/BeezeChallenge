import React, { Component } from "react";
import "./detail.css";
import { GetHero } from "../Home/functions";
import {
  Jumbotron,
  Container,
  Button,
  Col,
  Row,
  Card,
  Nav,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export class Detail extends Component {
  static displayName = Detail.name;

  constructor(props) {
    super(props);

    this.state = {
      heroId: this.props.match.params.id,
      hero: [],
      series: [],
      comics: [],
      events: [],
      stories: [],
      img: "",
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    GetHero(this.state.heroId).then((hero) => {
      const heroState = hero.data.results[0];
      heroState.name = heroState.name.toUpperCase();

      this.setState({
        hero: heroState,
        comics: heroState.comics,
        events: heroState.events,
        stories: heroState.stories,
        series: heroState.series,
        img: heroState.thumbnail.path + "." + heroState.thumbnail.extension,
      });
    });
  }

  render() {
    return (
      <div>
        <Jumbotron fluid className="bg-dark miniBackground mb-0 pt-0 pb-0">
          <Container className="text-white text-center">
            <Row>
              <Col md={3}>
                <img
                  src={this.state.img}
                  className="img-fluid"
                  alt="Not found"
                />
              </Col>
              <Col md={9}>
                <h1 className="display-4 font-weight-bold">
                  {this.state.hero.name}
                </h1>
                <p className="lead">{this.state.hero.description}</p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container className="pt-5 pb-5">
          <Row>
            <Col md={12}>
              <div className="card">
                <Tabs
                  defaultActiveKey="comics"
                  className="custom-tab pt-3 pl-2"
                >
                  <Tab
                    eventKey="comics"
                    title="Comics"
                    className="p-4 container"
                  >
                    {this.state.comics.items !== undefined
                      ? this.state.comics.items.map((item, i) => (
                          <Card key={i} className="mb-2 custom-card">
                            <Card.Body>
                              <Card.Title>{item.name}</Card.Title>
                              <Card.Link
                                href={item.resourceURI}
                                className="stretched-link"
                              ></Card.Link>
                            </Card.Body>
                          </Card>
                        ))
                      : null}
                  </Tab>
                  <Tab eventKey="events" title="Events" className="p-4">
                  {this.state.events.items !== undefined
                    ? this.state.events.items.map((item, i) => (
                        <Card key={i} className="mb-2 custom-card">
                          <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Link
                              href={item.resourceURI}
                              className="stretched-link"
                            ></Card.Link>
                          </Card.Body>
                        </Card>
                      ))
                    : null}
                  </Tab>
                  <Tab eventKey="series" title="Series" className="p-4">
                  {this.state.series.items !== undefined
                    ? this.state.series.items.map((item, i) => (
                        <Card key={i} className="mb-2 custom-card">
                          <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Link
                              href={item.resourceURI}
                              className="stretched-link"
                            ></Card.Link>
                          </Card.Body>
                        </Card>
                      ))
                    : null}
                  </Tab>
                  <Tab eventKey="stories" title="Stories" className="p-4">
                  {this.state.stories.items !== undefined
                    ? this.state.stories.items.map((item, i) => (
                        <Card key={i} className="mb-2 custom-card">
                          <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Link
                              href={item.resourceURI}
                              className="stretched-link"
                            ></Card.Link>
                          </Card.Body>
                        </Card>
                      ))
                    : null}
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
