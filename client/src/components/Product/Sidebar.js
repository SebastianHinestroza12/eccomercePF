import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { getAllProducts, filterBySize } from "../../redux/action";

const Sidebar = ({setMinPageNumber, setMaxPageNumber, setActualPage, setOrder}) => {
  const dispatch = useDispatch();
  const [filterSize, setFilterSize] = useState([])
  console.log('a', filterSize)

  const camisetas = [{
   size: "S",   
  }, {
    size: "M",   
   },{
    size: "L",   
   },{
    size: "XL",   
   },]

   const balones = [{
    size: 1,   
   }, {
     size: 4,   
    },{
     size: 5,   
    },]

  const zapatos = [{
    size: 5.5
  },{
    size: 6.5
  },{
    size:7
  }]
  
  const handleFilterBySize = (e) => {
    setActualPage(1)
    setMinPageNumber(0)
    setMaxPageNumber(5)
    dispatch(filterBySize(e.target.value))

    if(!filterSize.includes(e.target.value)) setFilterSize([...filterSize, e.target.value])
    if(filterSize.includes(e.target.value)) setFilterSize(filterSize.filter((s) => s !== e.target.value))
  }
/*
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
*/
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
        <br/>
        <h6>Camisetas</h6>
        <Form name="f1" id="formElement">
          {camisetas.map((product) => (
                <div key={`default-${product.size}`}  className="mb-2" >
                  <input
                    type="checkbox"
                    name="ch1"
                    onChange={(e) => handleFilterBySize(e)}
                    value={product.size}
                  /> {product.size}
                </div>
              ))
            }
        </Form>
        <h6>Balones</h6>
        <Form name="f1" id="formElement">
          {balones.map((product) => (
                <div key={`default-${product.size}`}  className="mb-2" >
                  <input
                    type="checkbox"
                    name="ch1"
                    onChange={(e) => handleFilterBySize(e)}
                    value={product.size}
                  /> {product.size}
                </div>
              ))
            }
        </Form>
        <h6>Zapatos</h6>
        <Form name="f1" id="formElement">
          {zapatos.map((product) => (
                <div key={`default-${product.size}`}  className="mb-2" >
                  <input
                    type="checkbox"
                    name="ch1"
                    onChange={(e) => handleFilterBySize(e)}
                    value={product.size}
                  /> {product.size}
                </div>
              ))
            }
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