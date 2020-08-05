import React, { Component } from "react";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {
  Jumbotron,
  Container,
  Button,
  Row,
  Col,
  CardDeck,
  Card,
} from "react-bootstrap";
// import Pagination from "react-bootstrap/Pagination";
import "./home.css";
import { GetHeroes } from "./functions";
import { Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      limit: "limit=36",
      offset: "offset=36",  
      total: 0,
      pagination: [],
      cards: [],
    };

    this.onGetHeroesClick = this.onGetHeroesClick.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    //Comprobar filtro sessionstorage
    this.loadData();
  }

  componentDidUpdate() {}

  //DATA
  loadData() {
    GetHeroes(this.state.limit + "&").then((heroes) => {
      const totalPagination = Math.round(heroes.data.total / 36);      
      const cards = this.GetCards(heroes.data.results);

      this.setState({
        total: heroes.data.total,
        totalPagination: totalPagination,      
        cards: cards,
      });
    });
  }

  GetCards(data) {
    const cards = [];
    for (const key in data) {
      cards.push(
        <Col key={key} xs={6} md={4} lg={3} className="mb-3 zoom">
          <Card>
            <Card.Img
              variant="top"
              src={
                data[key].thumbnail.path + "." + data[key].thumbnail.extension
              }
              style={{ height: "250px", width: "100%", display: "block" }}
            />
            <Card.Body>
              <Card.Title>
                {data[key].name}
                <Link
                  className="text-danger d-none"
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

  //EVENTS
  onChangePagination(e) {      
    const offset = "offset=" + (36 * e.page).toString();
    GetHeroes(this.state.limit + "&" + offset).then((heroes)=> {
        const cards = this.GetCards(heroes.data.results);
        this.setState({
            cards: cards,
            first: e.first
        });
    });
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
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>

            <Button variant="danger" onClick={this.onGetHeroesClick}>
              Get heroes
            </Button>
          </Container>
        </Jumbotron>
        <Container className="p-4">
          <Row>
            {this.state.cards}

            <Col xs={12}>
              <Paginator
                first={this.state.first}
                rows={36}
                totalRecords={this.state.total}
                onPageChange={(e) => this.onChangePagination(e)}
                className="w-50 mx-auto"
              ></Paginator>
            </Col>

          </Row>
        </Container>
      </>
    );
  }
}

// <Pagination className="mx-auto" onClick={(e)=> this.onChangePagination(e)}>
//               <Pagination.First />
//               <Pagination.Prev />
//               {this.state.pagination}
//               <Pagination.Next />
//               <Pagination.Last />
//             </Pagination>
