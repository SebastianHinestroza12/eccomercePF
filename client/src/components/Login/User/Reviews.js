import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { newComentForm } from '../../../redux/action'
import './review.css'

const validate = (input) => {
  const err = {};

  if (input.review === '') err.review = 'Falta seleccionar puntaje'
  if (input.comment === '') err.comment = 'Falta agregar comentario'
  if (input.comment.length > 200) err.comment = '200 caracteres maximos'
  if (input.comment.length < 10) err.comment = 'Minimo 20 caracteres'

  return err
}

const Reviews = ({name}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
      review: '',
      comment: '',
    });
    console.log('a',input)
    
    const handleSubmit = e => {
      e.preventDefault()
      console.log('b',input)
      if (!errors.name && !errors.comment) {
        const newReview = {
          ...input,
          review: input.review,
          comment: input.comment.trim(),
        };
        dispatch(newComentForm(newReview));
        setInput({
          review: '',
          comment: '',
        });
        handleClose()
      };
    };
    
    const handleChangeReview = (e) => {
      e.preventDefault()
      setInput({...input, review:e.target.value})
      setErrors(validate({...input, [e.target.value]: e.target.value}))
      console.log('c',input)
    }

    const handleChangeComment = (e) => {
      e.preventDefault()
      setInput({...input, comment:e.target.value})
      setErrors(validate({...input, [e.target.value]: e.target.value}))
      console.log('d',input)
    }
    

    return (
        <>
          <Button variant="primary" onClick={handleShow}>
            Reviews
          </Button>
        
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Dejanos tu opinion de {name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Puntaje</Form.Label>
                    <div className="form-stars">
                        <p class="clasificacion">
                            <input id="radio1" type="radio" name="estrellas" value="5" onChange={handleChangeReview}/>
                                <label className="stars" for="radio1">★</label>
                            <input id="radio2" type="radio" name="estrellas" value="4" onChange={handleChangeReview}/>
                                <label className="stars" for="radio2">★</label>
                            <input id="radio3" type="radio" name="estrellas" value="3" onChange={handleChangeReview}/>
                                <label className="stars" for="radio3">★</label>
                            <input id="radio4" type="radio" name="estrellas" value="2" onChange={handleChangeReview}/>
                                <label className="stars" for="radio4">★</label>
                            <input id="radio5" type="radio" name="estrellas" value="1" onChange={handleChangeReview}/>
                                <label className="stars" for="radio5">★</label>
                        </p>
                        <div className="reviews-errors">
                          {errors.review && (<p>{errors.review}</p>)}
                        </div>
                    </div>
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control as="textarea" rows={3} id="comment" type="text" onChange={handleChangeComment}
                  />
                  <div className="reviews-errors">{errors.comment && (<p>{errors.comment}</p>)}</div>
                </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal>
        </>
    )
}

export default Reviews
