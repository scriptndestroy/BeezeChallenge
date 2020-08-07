import React, { Component } from "react";
import { Paginator } from "primereact/paginator";
import { AutoComplete } from "primereact/autocomplete";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {
  Jumbotron,
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";
import "./home.css";
import { GetHeroes, GetEvents } from "./functions";
import { Link } from "react-router-dom";
import heroesJson from "../../JsonData/HeroNames.json";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      limit: "limit=24",
      offset: "offset=24",
      orderBy: "name&",
      nameStartsWith: "",
      events: [],
      selectedEvents: [],
      total: 0,
      pagination: [],
      cards: [],
      heroesSuggestions: null,
    };

    this.heroes = heroesJson;

    this.onGetHeroesClick = this.onGetHeroesClick.bind(this);
    this.onClear = this.onClear.bind(this);
    this.loadData = this.loadData.bind(this);
    this.suggestHeroes = this.suggestHeroes.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {}

  //--DATA--
  loadData() {
    Promise.all([GetHeroes(this.state.limit + "&"), GetEvents()]).then(
      (values) => {
        const totalPagination = Math.round(values[0].data.total / 24);
        const cards = this.GetCards(values[0].data.results);

        this.setState({
          events: values[1].data.results,
          total: values[0].data.total,
          totalPagination: totalPagination,
          cards: cards,
        });
      }
    );
  }

  GetCards(data) {
    const cards = [];
    for (const key in data) {
      cards.push(
        <Col
          key={key}
          xs={6}
          md={4}
          lg={3}
          xl={2}
          className="mb-3 zoom p-1 p-md-2"
        >
          <Card>
            <Card.Img
              className="card-list-image"
              variant="top"
              src={
                data[key].thumbnail.path + "." + data[key].thumbnail.extension
              }
              style={{ height: "210px", width: "100%", display: "block" }}
            />
            <Card.Body>
              <Card.Title>
                {data[key].name}
                <Link
                  className="text-danger stretched-link"
                  to={"/Detail/" + data[key].id + ""}
                ></Link>
              </Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Last Updated{" "}
                {data[key].modified.substring(
                  0,
                  data[key].modified.indexOf("T")
                )}
              </small>
            </Card.Footer>
          </Card>
        </Col>
      );
    }

    return cards;
  }

  //--EVENTS--

  onChangePagination(e) {
    const offset = "offset=" + (24 * e.page).toString();
    const orderBy = "orderBy=" + this.state.orderBy;
    const query =
      this.state.limit +
      "&" +
      offset +
      "&" +
      orderBy +
      (this.state.selectedEvents.length > 0
        ? "events=" + this.state.selectedEvents.toString() + "&"
        : "") +
      (this.state.nameStartsWith !== ""
        ? "nameStartsWith=" + this.state.nameStartsWith + "&"
        : "");
    GetHeroes(query).then((heroes) => {
      const cards = this.GetCards(heroes.data.results);
      this.setState({
        cards: cards,
        first: e.first,
        offset: offset,
      });
    });
  }

  //->ORDER
  onChangeOrderSelect(e) {
    let orderBy = "";
    switch (e.target.value) {
      case "2":
        orderBy = "-name&";
        break;
      case "3":
        orderBy = "modified&";
        break;
      case "4":
        orderBy = "-modified&";
        break;

      default:
        orderBy = "name&";
        break;
    }

    const queryString =
      this.state.limit +
      "&" +
      this.state.offset +
      "&orderBy=" +
      orderBy +
      (this.state.nameStartsWith !== ""
        ? "nameStartsWith=" + this.state.nameStartsWith + "&"
        : "") +
      (this.state.selectedEvents.length > 0
        ? "events=" + this.state.selectedEvents.toString()
        : "");

    GetHeroes(queryString).then((heroes) => {
      const cards = this.GetCards(heroes.data.results);
      this.setState({
        cards: cards,
        orderBy: orderBy,
      });
    });
  }

  //->FILTER EVENTS
  onChangeFilterEvents(e) {
    const queryString =
      this.state.limit +
      "&offset=0&orderBy=" +
      this.state.orderBy +
      (this.state.nameStartsWith !== ""
        ? this.state.nameStartsWith + "&"
        : "") +
      (e.value.length > 0 ? "events=" + e.value.toString() + "&" : "&");

    GetHeroes(queryString).then((heroes) => {
      const cards = this.GetCards(heroes.data.results);
      this.setState({
        cards: cards,
        selectedEvents: e.value,
        total: heroes.data.total,
        offset: "offset=0",
      });
    });
  }

  //->SEARCH
  onSelectSearch(e) {
    let name = e.value === undefined ? e.target.value : e.value;
    GetHeroes(
      this.state.limit +
        "&offset=0&orderBy=" +
        this.state.orderBy +
        "nameStartsWith=" +
        name +
        "&"
    ).then((heroes) => {
      const cards = this.GetCards(heroes.data.results);
      this.setState({
        cards: cards,
        nameStartsWith: name,
        offset: "offset=0",
        total: heroes.data.total,
        selectedEvents: [],
      });
    });
  }

  onClear() {
    GetHeroes(
      this.state.limit + "&offset=0&orderBy=" + this.state.orderBy
    ).then((heroes) => {
      const cards = this.GetCards(heroes.data.results);
      this.setState({
        cards: cards,
        nameStartsWith: "",
        offset: "offset=0",
        total: heroes.data.total,
      });
    });
  }

  suggestHeroes(e) {
    let results = this.heroes.filter((hero) => {
      return hero.toLowerCase().startsWith(e.query.toLowerCase());
    });

    this.setState({ heroesSuggestions: results });
  }

  onKeyPressAuto(e) {
    if (e.key === "Enter" && e.target.value !== "") {
      this.onSelectSearch(e);
    }
  }

  onGetHeroesClick() {
    GetHeroes();
  }

  render() {
    return (
      <>
        <Jumbotron fluid className="head miniBackground mb-0">
          <Container className="text-white text-center">
            <h1>MARVEL API</h1>
            <p>Example for Beezy Challenge</p>

            <a href="https://www.marvel.com/" className="btn btn-danger">
              MARVEL
            </a>
          </Container>
        </Jumbotron>
        <Container className="p-4 container-xxl">
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <AutoComplete
                  className="d-block"
                  inputClassName="w-100 autocomplete"
                  value={this.state.hero}
                  onChange={(e) => this.setState({ hero: e.value })}
                  onSelect={(e) => this.onSelectSearch(e)}
                  onClear={this.onClear}
                  onKeyUp={(e) => this.onKeyPressAuto(e)}
                  suggestions={this.state.heroesSuggestions}
                  completeMethod={(e) => this.suggestHeroes(e)}
                ></AutoComplete>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Order by</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => this.onChangeOrderSelect(e)}
                >
                  <option value={1}>Name A-Z</option>
                  <option value={2}>Name Z-A</option>
                  <option value={3}>Modified Ascendent</option>
                  <option value={4}>Modified Descendant</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Events</Form.Label>
                <MultiSelect
                  className="d-block multiselect"
                  optionLabel="title"
                  optionValue="id"
                  value={this.state.selectedEvents}
                  options={this.state.events}
                  onChange={(e) => this.onChangeFilterEvents(e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {this.state.cards}
            <Col xs={12}>
              <Paginator
                first={this.state.first}
                rows={24}
                totalRecords={this.state.total}
                onPageChange={(e) => this.onChangePagination(e)}
                className="mx-auto bg-transparent border-0"
              ></Paginator>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
