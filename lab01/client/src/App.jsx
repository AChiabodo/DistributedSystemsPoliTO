import "bootstrap/dist/css/bootstrap.min.css";

import dayjs from "dayjs";
import { useState , useEffect} from "react";
import API from './API.jsx'
import MainPage from "./Components/MainPage.jsx";
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import filterContext from './Context/filterContext.jsx'
import modalContext from "./Context/modalContext.jsx";
import { Container } from "react-bootstrap";
import { LoginForm } from "./Components/AuthComponents.jsx";
import authContext from './Context/authContext.jsx'

function App() {
  let [films, setFilms] = useState([]);
  let [nextID, setNextId] = useState(0);
  let [dirty, setDirty] = useState(false);
  const [user, setUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

  const SeenLastMonth = (film) =>
    film.date && film.date > dayjs().month(dayjs().month() - 1);
  const Unseen = (film) => !film.date;
  const Favorites = (film) => film.favorites;
  const BestRated = (film) => film.rating == 5;
  const filters = [
    { label: "favorites",   fn: Favorites ,   route: 'favorites'},
    { label: "unseen",      fn: Unseen,       route: 'unseen'},
    { label: "bestRated",   fn: BestRated,    route: 'bestrated'},
    { label: "lastMonth",   fn: SeenLastMonth,route: 'lastmonth'},
    { label: "all",         fn: () => true ,  route : 'all'}
  ];

  function addFilm(film) {
    film = Object.assign({},film , {user : user?user.id:1});
    setFilms((films) => films.concat(Object.assign({}, film , {created : true})));
    API.addFilm(film).then(id =>{
      setNextId(id+1);
      setDirty(true);
    }).catch(err => {console.log("POST err : " + err)})
  }

  function modifyFilm(film) {
    film = Object.assign({},film , {user : user?user.id:1});
    setFilms((films) => {
      const list = films.map((item) => {
        if (item.id === film.id) {
          //return new Answer(item.id, item.text,item.respondent,item.score+1,item.date);
          return Object.assign({}, item, film , {dirty : true});
        } else {
          return item;
        }
      });
      return list;
    });
    API.updateFilm(film).then(
      setDirty(true)
    ).catch(err => {console.log("PUT err : " + err)})
  }

  function deleteFilm(film) {
    setFilms((films) => {
      const list = films.map((item) => {
        if (item.id === film.id) {
          //return new Answer(item.id, item.text,item.respondent,item.score+1,item.date);
          return Object.assign({}, item, film , {deleted : true});
        } else {
          return item;
        }
      });
      return list;
    });
    API.deleteFilm(film).then(
      setDirty(true)
    ).catch(err => {console.log("PUT err : " + err)})
  }

  const doLogOut = async () => {
    await API.logOut();
    setFilms([]);
    setLoggedIn(false);
    setUser(undefined);
    /* set state to empty if appropriate */
  }
  

  const loginSuccessful = (user) => {
    setUser(user);
    console.log(user)
    setLoggedIn(true);
    setDirty(true);  // load latest version of data, if appropriate
  }
  console.log(user)
  return (
    <BrowserRouter>
    <Container fluid>
      <filterContext.Provider value={filters}>
        <modalContext.Provider
          value={{ addFilm: addFilm, modifyFilm: modifyFilm, deleteFilm : deleteFilm ,nextID :  nextID , setNextId : setNextId}}
        >
          <authContext.Provider value={{user:user?user:null , loginSuccessful:loginSuccessful , doLogOut : doLogOut , loggedIn:loggedIn}}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MainPage films={films} setFilms={setFilms} filtered={false} dirty={dirty} setDirty={setDirty}  name={user?user.name:null} doLogOut={doLogOut}/>
                </>
              }
            ></Route>
            <Route path='/login' element={loggedIn? <Navigate replace to='/' />:  <LoginForm loginSuccessful={loginSuccessful} />} />
            <Route
              path="/filter/:FilterLabel"
              element={<MainPage films={films} setFilms={setFilms} filtered={true} dirty={dirty} setDirty={setDirty} name={user?user.name:null} doLogOut={doLogOut}/>}
            ></Route>
          </Routes>
          </authContext.Provider>
        </modalContext.Provider>
      </filterContext.Provider>
      </Container>
    </BrowserRouter>
  );
}

export default App