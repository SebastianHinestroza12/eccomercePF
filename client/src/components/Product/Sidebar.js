/**
 * BOOTSTRAP IMPORTS
 */
import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.products);

  const getSizeProducts = (products) => {
    const setObj = new Set(); // creamos pares de clave y array

    const uniques = products.reduce((acc, product) => {
      if (!setObj.has(product.size)) {
        setObj.add(product.size, product);
        acc.push(product);
      }
      return acc;
    }, []);

    return uniques;
  };

  const alertClicked = () => {
    alert("You clicked the ListGroupItem");
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <ListGroup variant="flush" className="filters_container">
        <h5>CATEGORIAS</h5>
        <ListGroup.Item action onClick={alertClicked}>
          Camiseta
        </ListGroup.Item>
        <ListGroup.Item>Shorts</ListGroup.Item>
        <ListGroup.Item>Zapatos</ListGroup.Item>
        <ListGroup.Item>Balones</ListGroup.Item>
      </ListGroup>

      <div className="filters_container mt-3">
        <h5>TALLA</h5>

        <Form>
          {getSizeProducts(getProducts)
            ? getSizeProducts(getProducts).map((product) => (
                // console.log(product)
                <div key={`default-${product.size}`} className="mb-2">
                  <Form.Check
                    product="checkbox"
                    id={`default-${product.size}`}
                    label={`${product.size}`}
                  />
                </div>
              ))
            : "empty"}
        </Form>
      </div>

      <div className="filters_container mt-3">
        <h5>TIPO</h5>

        <Form>
          {["checkbox"].map((type) => (
            <div key={`rating-${type}`} className="mb-3">
              <Form.Check type={type} id={`rating-${type}`} label="Local" />
              <Form.Check type={type} id={`rating-${type}`} label="Visitante" />
            </div>
          ))}
        </Form>
      </div>
    </>
  );
};
export default Sidebar;
