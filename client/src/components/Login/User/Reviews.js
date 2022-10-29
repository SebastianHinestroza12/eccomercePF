import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { newComentForm, getReviews } from '../../../redux/action'
import './review.css'

const validate = (input) => {
  const err = {};

  if (input.review === '') err.review = 'Falta seleccionar puntaje'
  if (input.comment === '') err.comment = 'Falta agregar comentario'
  if (input.comment.length > 200) err.comment = '200 caracteres maximos'
  if (input.comment.length < 15) err.comment = 'Minimo 15 caracteres'

  return err
}

const Reviews = ({productId, name, id}) => {
    const userId = useSelector((state) => state.user.id)

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
      stars: '',
      comment: '',
      productId: id,
      userId: productId
    });
    
    const handleSubmit = e => {
      e.preventDefault()
      if (input.stars !== '' && input.comment !== '' && input.comment.length > 15 && input.comment.length < 250) {
        const newReview = {
          ...input,
          stars: input.stars,
          comment: input.comment.trim(),
          productId: id,
          userId: productId
        };
        console.log(newReview)
        dispatch(newComentForm(newReview));
        setInput({
          stars: '',
          comment: '',
          productId: id,
          userId: productId
        });
        handleClose()
      };
    };
    
    const handleChangeReview = (e) => {
      setInput({...input, stars:e.target.value})
      setErrors(validate({...input, [e.target.value]: e.target.value}))
    }

    const handleChangeComment = (e) => {
      setInput({...input, comment:e.target.value})
      setErrors(validate({...input, [e.target.value]: e.target.value}))
    }

    useEffect(() => {
      dispatch(getReviews(productId));
    }, [dispatch, productId])

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
                  <Form.Control as="textarea" rows={3} type="text" onChange={handleChangeComment}
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
