import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import dayjs from 'dayjs';
import {useState} from 'react';

function FilmForm(props) {
    const {addAnswer}=props;
    function handleSubmit(event){
        event.preventDefault();
        console.log(event);
        if (date===''){
            console.log("data non valida");
            setErrorMessage("data non valida");
        }
        else if(isNaN(parseInt(score))){
            setErrorMessage("score non valido");
        }
        else{
            setErrorMessage('');
            const e = {
                text : text,
                respondent : respondent,
                score:parseInt(score),
                date : dayjs(date)
            }
            console.log(e);
            addAnswer(e);
        }
        }
    const [text,setText] = useState('');
    const [respondent,setRespondent] = useState('');
    const [score,setScore] = useState(0);
    const [date,setDate] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    function clearErrorMessage(event){
        setErrorMessage('');
    }
    
    function handleText(event){
        setText(event.target.value);
    }
    function handleScore(event){
        const v = event.target.value;
        setScore(v);
        {/*if(!isNaN(parseInt(v))){
            
            setScore(parseInt(event.target.value));
        }
        if(v===''){
            
        }*/}   
    }
    function handleRespondent(event){
        if(event.target.value==="pippo"){
            setRespondent("pluto");
        }
        else{
            setRespondent(event.target.value);
        }
        
    }
    function handleDate(event){
        console.log(event.target.value);
        setDate(event.target.value);
    }
    return(
        <>
        {errorMessage? <Alert variant='danger' onClose={clearErrorMessage} dismissible>Attenzione : {errorMessage}</Alert> : false}
        
    <Form onSubmit={handleSubmit}>
        
        <Form.Group>
            <Form.Label>Date : </Form.Label>
            <Form.Control required={false} type="date" name="date" value={date} onChange={handleDate}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>text : </Form.Label>
            <Form.Control type="text" name="text" value={text} onChange={handleText}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>respondent : </Form.Label>
            <Form.Control type="text" name="respondent" value={respondent} onChange={handleRespondent}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>score : </Form.Label>
            <Form.Control className="w-25" required={false} type="number" name="score" value={score} onChange={handleScore} />
        </Form.Group>
        
    
    <Button variant="primary" type='submit'>+</Button>
    </Form>
    </>
    )
    }
export default FilmForm