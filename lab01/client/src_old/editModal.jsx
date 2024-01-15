import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import dayjs from 'dayjs';
import Film from './Film'

export function EditModal(props) {
    let {showEdit,handleClose,tempFilm,handleTitle,handleFavourite,handleWatchDate,handleRating,handleSubmit,errorMessage} = props;
  return (
    <>
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
        <Form.Group>
            <Form.Label>Title : </Form.Label>
            <Form.Control type="text" name="date" value={tempFilm.title} onChange={handleTitle}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Favourite : </Form.Label>
            <Form.Check value={tempFilm.favorites == false ? "false" : "true"} checked={tempFilm.favorites} onChange={handleFavourite}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Watch Date : </Form.Label>
            <Form.Control type="date" name="watchDate" value={tempFilm.date != null ? dayjs(tempFilm.date).format("YYYY-MM-DD") : ''} onChange={handleWatchDate}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>score : </Form.Label>
            <Form.Control type="number" name="score" value={tempFilm.rating} onChange={handleRating} />
        </Form.Group>
        
        </Form>
        {errorMessage != '' ? <Alert key={danger} variant={danger}> {errorMessage} </Alert> : false}
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
