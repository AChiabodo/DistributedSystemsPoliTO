import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table , Spinner 
} from "react-bootstrap";
import { useContext ,useEffect} from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar ,faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import filterContext from "../Context/filterContext";
import MyNav from "./MyNav.jsx";
import API from '../API.jsx'
import { EditModal } from "./editModal.jsx";
import authContext from "../Context/authContext";

const StarRating = (props) => {
    let {rating} = props;
    let id = 0;
    return (
      <div className="star-rating">
        {[...Array(rating)].map(() => {
          id = id +1;        
          return (         
            <FontAwesomeIcon icon={faStar} key={id}/>        
          );
        })}
      </div>
    );
  };

export function MyRow(props) {
    const { filmData } = props;
    let color , spinner;
    if(filmData.dirty){spinner = <Spinner animation="grow" variant="warning" />}
    if(filmData.deleted){spinner = <Spinner animation="grow" variant="danger" />}
    if(filmData.created){spinner = <Spinner animation="grow" variant="success" />}
    return (
      <tr>
              <td>{filmData.id}</td>
              <td>{filmData.title}</td>
              <td>{filmData.date ? filmData.date.format("YYYY-MM-DD") : "not watched"}</td>
              <td><StarRating rating={filmData.rating ? filmData.rating : 0}/></td>
              <td>{filmData.favorites ? <FontAwesomeIcon icon={faCheckSquare}/>  : false}</td>
              <td>{spinner? spinner :<EditModal newMode={false} film={filmData}/>}</td>
            </tr>
    );
  }

function MainPage(props){
    let {films , setFilms , dirty , setDirty} = props;
    let {FilterLabel} = useParams();
    const filters = useContext(filterContext);
    const {user , loggedIn} = useContext(authContext);
    const route = filters.filter( e => e.label === FilterLabel).map(e => e.route)[0] 

    useEffect(() => {
      if(loggedIn){
        API.getFilms(route).then( (e) => {
          setFilms(e);
          setDirty(false);
        } );
      }
    }, [FilterLabel,dirty,loggedIn?user.name:false]);    
    
    return (
      <>
      <MyNav name={props.name} doLogOut={props.doLogOut}/>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th scope="col">#</th>
            <th >Title</th>
            <th >Last watched</th>
            <th >Rating</th>
            <th >Favourites</th>
            <th >Edit</th>
          </tr>
        </thead>
        <tbody>
          {
          films.map((e) =><MyRow filmData={e} key={e.id}/>)
            }
        </tbody>
      </Table>
      </>
    )
  }

  export default MainPage