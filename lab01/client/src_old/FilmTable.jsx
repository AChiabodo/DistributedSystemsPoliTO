import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table ,Nav , Navbar } from 'react-bootstrap';
import dayjs, { Dayjs } from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalf, faStar ,faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import Film from './Film.jsx';
import {MyModal} from './Modal.jsx'
import { useState } from 'react';
import { EditModal } from './editModal.jsx';
const StarRating = (props) => {
  let {rating} = props;
  return (
    <div className="star-rating">
      {[...Array(rating)].map(() => {        
        return (         
          <FontAwesomeIcon icon={faStar} />        
        );
      })}
    </div>
  );
};

function MyRow(props) {
  const { e , handleEdit} = props;
  return (
    <tr>
            <td>{e.id}</td>
            <td>{e.title}</td>
            <td>{e.date ? e.date.format("YYYY-MM-DD") : "not watched"}</td>
            <td><StarRating rating={e.rating ? e.rating : 0}/></td>
            <td>{e.favorites ? <FontAwesomeIcon icon={faCheckSquare}/>  : false}</td>
            <td><Button variant="white" onClick={()=>handleEdit(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className={"bi bi-pencil-fill"} viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>
      </Button></td>
          </tr>
  );
}

function FilmTable(props) {

    let {films , addFilm , modifyFilm} = props;
    const [editmode,setEditmode] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const [id,setId] = useState(13);
    const [showEdit, setShowEdit] = useState(false);
    const [tempFilm,setTempFilm] = useState(new Film('',''));
  
    const handleClose = () => setShowEdit(false);
      const handleShow = () => setShowEdit(true);
      function resetState(){
          setTitle('');
          setwatchDate('');
          setScore('');
          setFavourite(false);
      }
      function handleWatchDate(event){
          setTempFilm((tempfilm) => tempfilm = Object.assign({},tempfilm,{"date" : dayjs(event.target.value)}));
      }
      function handleTitle(event){
        setTempFilm((tempfilm) => tempfilm = Object.assign({},tempfilm,{"title" : (event.target.value)}));
      }
      function handleFavourite(event){
        setTempFilm((tempfilm) => tempfilm = Object.assign({},tempfilm,{"favorites" : event.target.value == "true" ? false : true}));
     }
      function handleRating(event){
        setTempFilm((tempfilm) => tempfilm = Object.assign({},tempfilm,{"rating" : event.target.value % 6}));
      }
      function handleEdit(film){
        setEditmode(true);
        setTempFilm( (tempfilm) => Object.assign(tempfilm,film) )
        handleShow();
      }
      function handleCreation(){
        setEditmode(false);
        setTempFilm(Object.assign({},{id:id}))
        handleShow();
      }
      function handleSubmit(){
        if(tempFilm.title == ''){
          setErrorMessage("Titolo non valido !");
          return
        }
        else{
          setErrorMessage('');
        }
        if(editmode){
          modifyFilm(tempFilm);
          handleClose();
        }
        else{
          addFilm(tempFilm);
          setId((id) => id+1)
          setTempFilm(Object.assign({},{id:id}))
          handleClose();
        }
        
      }

    return (
      <>
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
          {films.map((e) =>
          <MyRow e={e} key={e.id} handleEdit={handleEdit}/>)
          }
        </tbody>
      </Table>
      <EditModal showEdit={showEdit} handleClose={handleClose} tempFilm={tempFilm} handleTitle={handleTitle} handleFavourite={handleFavourite} handleWatchDate={handleWatchDate} handleRating={handleRating} handleSubmit={handleSubmit} errorMessage={errorMessage}/>
      <Button variant="primary" onClick={()=>handleCreation()}>Add new Film</Button>
      </>
    )
  }

export default FilmTable