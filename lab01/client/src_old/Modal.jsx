import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import dayjs from 'dayjs';
import Film from './Film'

export function MyModal(props) {
    let {addFilm , previousId} = props;
    const [id,setId] = useState(13);
    const [show, setShow] = useState(false);
    const [watchDate,setwatchDate] = useState(false);
    const [title,setTitle] = useState('');
    const [score,setScore] = useState('');
    const [favourite,setFavourite] = useState("false");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function resetState(){
        setTitle('');
        setwatchDate('');
        setScore('');
        setFavourite(false);
    }
    function handleWatchDate(event){
        setwatchDate(event.target.value);
    }
    function handleTitle(event){
        setTitle(event.target.value);
    }
    function handleFavourite(event){
        console.log(event)
        setFavourite(event.target.value == "true" ? "false" : "true");
        
    }
    function handleScore(event){
            setScore(event.target.value % 6);
    }
    function handleSubmit(){
        if(title!=''){
            addFilm(new Film(id,title,favourite == "true" ? true : false,watchDate != '' ? dayjs(watchDate) : null,score))
            setId((id) => id+1);
        }
        setShow(false);
        resetState();
    }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new Film
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
        <Form.Group>
            <Form.Label>Title : </Form.Label>
            <Form.Control type="text" name="date" value={title} onChange={handleTitle}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Favourite : </Form.Label>
            <Form.Check value={favourite} onChange={handleFavourite}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Watch Date : </Form.Label>
            <Form.Control type="date" name="watchDate" value={watchDate} onChange={handleWatchDate}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>score : </Form.Label>
            <Form.Control type="number" name="score" value={score} onChange={handleScore} />
        </Form.Group>
        
        </Form>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
