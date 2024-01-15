import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  Table,
  Nav,
  Navbar,
  ListGroup,
  Offcanvas,
} from "react-bootstrap";

function MyNav(props) {
  let {
    viewAll,
    getFavourites,
    orderByRating,
    getSeenLastMonth,
    unSeen,
    searchFilm,
  } = props;
  let [word, setWord] = useState("");

  function handleSearch(event) {
    setWord(event.target.value);
    searchFilm(event.target.value);
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Canvas
          viewAll={viewAll}
          getFavourites={getFavourites}
          orderByRating={orderByRating}
          getSeenLastMonth={getSeenLastMonth}
          unSeen={unSeen}
        />
        <Navbar.Brand href="#home">Film Library</Navbar.Brand>
        <Nav className="me-auto"></Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={word}
            onChange={handleSearch}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

function Canvas(props) {
  const [show, setShow] = useState(false);
  let { viewAll, getFavourites, orderByRating, getSeenLastMonth, unSeen } =
    props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [pressed, setPressed] = useState(1);

  function handleButton(number) {
    switch (number) {
      case 1:
        setPressed(1);
        viewAll();
        break;
      case 2:
        setPressed(2);
        getFavourites();
        break;
      case 3:
        setPressed(3);
        orderByRating();
        break;
      case 4:
        setPressed(4);
        getSeenLastMonth();
        break;
      case 5:
        setPressed(5);
        unSeen();
        break;
    }
  }

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-film"
          viewBox="0 0 16 16"
        >
          <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"></path>
        </svg>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body variant="dark">
          <ListGroup>
            <ListGroup.Item
              action
              onClick={() => handleButton(1)}
              variant={pressed == 1 ? "dark" : false}
            >
              All Films
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => handleButton(2)}
              variant={pressed == 2 ? "dark" : false}
            >
              Favourites
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => handleButton(3)}
              variant={pressed == 3 ? "dark" : false}
            >
              Best Rated
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => handleButton(4)}
              variant={pressed == 4 ? "dark" : false}
            >
              Seen Last Month
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => handleButton(5)}
              variant={pressed == 5 ? "dark" : false}
            >
              Unseen
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MyNav;
