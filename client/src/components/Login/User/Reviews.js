import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { newComentForm } from '../../../redux/action'
import './review.css'

const Reviews = () => {
    const dispatch = useDispatch();
    const [review, setReviews] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
          <Button variant="primary" onClick={handleShow}>
            Reviews
          </Button>
        
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Dejanos tu opinion!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Puntaje</Form.Label>
                    <form className="form-stars">
                        <p class="clasificacion">
                            <input id="radio1" type="radio" name="estrellas" value="5"/>
                                <label className="stars" for="radio1">★</label>
                            <input id="radio2" type="radio" name="estrellas" value="4"/>
                                <label className="stars" for="radio2">★</label>
                            <input id="radio3" type="radio" name="estrellas" value="3"/>
                                <label className="stars" for="radio3">★</label>
                            <input id="radio4" type="radio" name="estrellas" value="2"/>
                                <label className="stars" for="radio4">★</label>
                            <input id="radio5" type="radio" name="estrellas" value="1"/>
                                <label className="stars" for="radio5">★</label>
                        </p>
                    </form>
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Enviar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    )
}

export default Reviews