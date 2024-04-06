import { useState } from "react";
import { useDispatch } from "react-redux";

import { InputGroup, Form, Button } from "react-bootstrap";
import { SearchByName } from "../../redux/action";

import { useHistory } from "react-router-dom";

const Searchbar = ({ setLoading }) => {
  const dispatch = useDispatch();

  //estado local para coger el nombre que se quiere buscar
  const [name, setName] = useState("");
  const [errors, seterrors] = useState({ name: "" });

  //se dispara cuando se presiona el btn de busqueda
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.location.href === "http://localhost:3000/") {
      history.push("/store");
    }
    if (!name.length) {
      seterrors({ name: "Colocar un producto !!" });
    }
    dispatch(SearchByName(name));
  };

  //control del input de busqueda
  const keyDown = (e) => {
    setName(e.target.value);
    if (e.keyCode === 13) {
      console.log("enter");
      history.push("/store");
      if (name) {
        dispatch(SearchByName(name));
      }
    }
  };

  return (
    <InputGroup>
      <Form.Control
        placeholder="Buscar Producto..."
        aria-label="Buscando Producto..."
        value={name}
        onChange={(e) => keyDown(e)}
        onKeyDown={(e) => keyDown(e)}
      />
      <Button
        variant="outline-success"
        className="but search-nav"
        onClick={(e) => handleSubmit(e)}
      >
        BUSCAR
      </Button>
      {errors.name && (
        <div className="alert alert-danger" role="alert">
          <p>{errors.name}</p>
        </div>
      )}
    </InputGroup>
  );
};
export default Searchbar;
