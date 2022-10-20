import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import {
  getAllProducts,
  filterBySize,
  filterByCategory,
} from "../../redux/action";

let allFilters = [];

const Sidebar = ({
  setMinPageNumber,
  setMaxPageNumber,
  setActualPage,
  setOrder,
}) => {
  const dispatch = useDispatch();

  const camisetas = [
    {
      size: "S",
    },
    {
      size: "M",
    },
    {
      size: "L",
    },
    {
      size: "XL",
    },
  ];
  const balones = [
    {
      size: 1,
    },
    {
      size: 4,
    },
    {
      size: 5,
    },
  ];
  const zapatos = [
    {
      size: 5.5,
    },
    {
      size: 6.5,
    },
    {
      size: 7,
    },
  ];
  const type = [
    {
      type: "LOCAL",
    },
    {
      type: "VISITANTE",
    },
  ];

  const handleFilterBySize = (e) => {
    const { value, checked } = e.target;
    setActualPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(5);
    if (checked) {
      console.log(allFilters);
      allFilters = [...allFilters, value];
    } else {
      allFilters = allFilters.filter((e) => e !== value);
    }
    console.log("setAllFilters", allFilters);
    dispatch(filterBySize(allFilters));
  };

  const handleFilterByCategory = (e) => {
    setActualPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(5);
    dispatch(filterByCategory(e.target.value));
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  let checks = document.querySelectorAll(".check");

  checks.forEach((e) => {
    if (e.checked === true) {
      console.log(e.value);
    }
  });

  return (
    <>
      <ListGroup variant="flush" className="filters_container">
        <h5>CATEGORIAS</h5>
        <button
          onClick={(e) => handleFilterByCategory(e)}
          value="JERSEY"
          label="Jersey"
        >
          Jersey
        </button>
        <button
          onClick={(e) => handleFilterByCategory(e)}
          value="CALZADO"
          label="Calzado"
        >
          Calzado
        </button>
        <button
          onClick={(e) => handleFilterByCategory(e)}
          value="BALÓN"
          label="Balones"
        >
          Balones
        </button>
      </ListGroup>

      <div className="filters_container mt-3">
        <h5>TALLA</h5>
        <br />
        <h6>Camisetas</h6>
        <Form name="f1" id="formElement">
          {camisetas.map((product) => (
            <div key={`default-${product.size}`} className="mb-2">
              <Form.Check
                id={product.size}
                className="check"
                onChange={(e) => handleFilterBySize(e)}
                label={product.size}
                value={product.size}
              />
            </div>
          ))}
        </Form>
        <h6>Balones</h6>
        <Form name="f1" id="formElement">
          {balones.map((product) => (
            <div key={`default-${product.size}`} className="mb-2">
              <Form.Check
                className="check"
                onChange={(e) => handleFilterBySize(e)}
                label={product.size}
                value={product.size}
              />
            </div>
          ))}
        </Form>
        <h6>Zapatos</h6>
        <Form name="f1" id="formElement">
          {zapatos.map((product) => (
            <div key={`default-${product.size}`} className="mb-1">
              <Form.Check
                className="check"
                onChange={(e) => handleFilterBySize(e)}
                label={product.size}
                value={product.size}
              />
            </div>
          ))}
        </Form>
      </div>
      <div className="filters_container mt-3">
        <h5>TIPO</h5>
        <Form name="f1" id="formElement">
          {type.map((t) => (
            <div key={`default-${t.type}`} className="mb-1">
              <Form.Check
                onChange={(e) => handleFilterBySize(e)}
                label={t.type}
                value={t.type}
              />
            </div>
          ))}
        </Form>
      </div>
    </>
  );
};

export default Sidebar;
