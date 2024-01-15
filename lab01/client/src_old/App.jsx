import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  Table,
  Nav,
  Navbar,
} from "react-bootstrap";
import dayjs from "dayjs";
import { useState } from "react";
import Film from "./Film.jsx";
import MyNav from "./Canvas.jsx";
import FilmTable from "./FilmTable.jsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const all_films = [
  new Film(1, "Pulp Fiction", true, dayjs("2023-03-10"), 5),
  new Film(2, "21 Grams", true, dayjs("2023-03-17")),
  new Film(3, "Star Wars", false),
  new Film(4, "Matrix", false),
  new Film(5, "Shrek", false, dayjs("2023-03-21"), 3),
  new Film(6, "The Lord of the Rings", true, dayjs("2023-04-2"), 5),
  new Film(7, "Hangover 3", false),
  new Film(8, "Star Trek", false, dayjs("2023-04-11"), 4),
  new Film(9, "Shrek 2", false),
  new Film(10, "Shrek 3", false, dayjs("2023-04-20"), 3),
  new Film(11, "Dune", false),
  new Film(12, "Hugo Cabret", false)
];

function MyFooter(props) {
  return (
    <footer>
      <p>&copy; 2023, Applicazioni Web I</p>
      <div id="time"></div>
    </footer>
  );
}

function Main(props) {
  const [title, setTitle] = useState("All Films");

  const [films, setFilms] = useState([...all_films]);

  function viewAll() {
    setFilms([...all_films]);
    setTitle("All Films");
  }

  function getFavourites() {
    setFilms([...all_films].filter((film) => film.favorites == true));
    setTitle("Favourites Film");
  }

  function orderByRating() {
    setFilms([...all_films].sort((f1, f2) => f1.rating < f2.rating));
    setTitle("Best Rated Films");
  }

  function getSeenLastMonth() {
    setFilms(
      [...all_films].filter(
        (film) => film.date && film.date > dayjs().month(dayjs().month() - 1)
      )
    );
    setTitle("Seen Last Month");
  }

  function unSeen() {
    setFilms([...all_films].filter((film) => !film.date));
    setTitle("Unseen");
  }

  function searchFilm(keyword) {
    setFilms(
      [...all_films].filter((film) =>
        film.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }

  function addFilm(film) {
    setFilms((films) => films.concat(film));
  }

  const modifyFilm = function (film) {
    setFilms((films) => {
      const list = films.map((item) => {
        if (item.id === film.id) {
          //return new Answer(item.id, item.text,item.respondent,item.score+1,item.date);
          return Object.assign({}, item, film);
        } else {
          return item;
        }
      });
      return list;
    });
  };

  return (
    <>
      
      <Row>
        <h2>{title}</h2>
      </Row>
      <Row>
        <Outlet></Outlet>
      </Row>
    </>
  );
}

function App() {


  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Container fluid>
              <MyNav
        viewAll={viewAll}
        getFavourites={getFavourites}
        orderByRating={orderByRating}
        getSeenLastMonth={getSeenLastMonth}
        unSeen={unSeen}
        searchFilm={searchFilm}
      />
              <Main />
              <MyFooter />
            </Container>
          }
        >
          <Route path="/*" element={<FilmTable 
        films={films}
          addFilm={addFilm}
          modifyFilm={modifyFilm}
          previousId={13}
          />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
