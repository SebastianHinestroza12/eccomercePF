import { useState } from "react";
import { useDispatch } from "react-redux";

import { InputGroup, Form, Button } from "react-bootstrap";
import { SearchByName } from "../../redux/action";

const Searchbar = ({ setLoading }) => {
  const dispatch = useDispatch();

  //estado local para coger el nombre que se quiere buscar
  const [name, setName] = useState("");
  const [errors, seterrors] = useState({ name: "" });

  //se dispara cuando se presiona el btn de busqueda

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.length) {
      seterrors({ name: "Colocar un producto !!" });
    }
    dispatch(SearchByName(name));
  };

  //control del input de busqueda
  const keyDown = (e) => {
    console.log("e.keyCode", e.keyCode);
    setName(e.target.value);
    seterrors(validateInput({ name: e.target.value }));
    if (e.keyCode === 13) {
      console.log("enter");
      if (name) {
        new Promise((resolve, reject) => {
          // setLoading(true);
          resolve(dispatch(SearchByName(name)));
        }).then(() => {
          //setLoading(false);
        });
      }
    }
  };

  function validateInput(value) {
    let errors = {};
    if (value.name.length > 0 && value.name.length < 2) {
      errors.name = "Enter minimum 2 characters";
    }
    if (value.name.length === 0) {
      errors.name = "";
    }
    return errors;
  }

  return (
    <InputGroup>
      <Form.Control
        placeholder="Estoy buscando..."
        aria-label="Estoy buscando..."
        aria-describedby="basic-addon2"
        value={name}
        onChange={(e) => keyDown(e)}
        onKeyDown={(e) => keyDown(e)}
      />
      <Button
        variant="outline-success"
        className="but"
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
