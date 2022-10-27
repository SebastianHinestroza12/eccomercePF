import React from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import {
  //getAllProducts,
  filterBySize,
  filterByCategory,
  filterByType,
} from "../../redux/action";
import "./sidebar.css";

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
  const balonesCalzados = [
    {
      size: 1,
    },
    {
      size: 3,
    },
    {
      size: 4,
    },
    {
      size: 5,
    },
    {
      size: 6,
    },
    {
      size: 7,
    },
    {
      size: 8,
    },
    {
      size: 9,
    },
    {
      size: 10,
    },
  ];
  const type = [
    {
      type: "JERSEY LOCAL",
    },
    {
      type: "JERSEY VISITANTE",
    },
  ];

  const handleFilterBySize = (e) => {
    const { value, checked } = e.target;
    setActualPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(5);
    if (checked) {
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

  const handleFilterByType = (e) => {
    setActualPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(5);
    dispatch(filterByType(e.target.value));
  };

  /*useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);*/

  let checks = document.querySelectorAll(".check");

  checks.forEach((e) => {
    if (e.checked === true) {
      console.log(e.value);
    }
  });

  return (
    <>
      <div className="filters_container mt-3">
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
      </div>

      <div className="filters_container mt-3">
        <h5>TALLA</h5>
        <br />
        <h6 className="mb-3">Camisetas</h6>
        <Form name="f1" id="formElement">
          {camisetas.map((product) => (
            <div key={`default-${product.size}`} className="mb-3">
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
        <h6 className="mb-3 mt-5">Balones y Calzado</h6>
        <Form name="f1" id="formElement">
          {balonesCalzados.map((product) => (
            <div key={`default-${product.size}`} className="mb-3">
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
        <h5 className="mb-3">TIPO</h5>
        <Form name="f1" id="formElement">
          {type.map((t) => (
            <div key={`default-${t.type}`} className="mb-3">
              <Form.Check
                onChange={(e) => handleFilterByType(e)}
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
