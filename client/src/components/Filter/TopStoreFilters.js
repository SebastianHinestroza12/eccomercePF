import { Dropdown } from "react-bootstrap";
import React, { useEffect } from "react";

import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/action";

const TopStoreFilters = () => {
  const dispatch = useDispatch();
  //estado global de todas las recetas
  const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    new Promise((resolve) => {
      resolve(dispatch(getAllProducts()));
    });

    //cargo todos los cards de recetas
  }, [dispatch]);

  return (
    <section className="filters_container mb-3 top_filters">
      <div>
        <strong>{allProducts.length}</strong> Productos encontrados
      </div>
      <div className="justify-content-end">
        <DropdownButton id="dropdown-basic-button" title="Ordenar por">
          <Dropdown.Item href="#/action-1">Precio</Dropdown.Item>
          <Dropdown.Item href="#/action-2">A-Z</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Z-A</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Rating</Dropdown.Item>
        </DropdownButton>
      </div>
    </section>
  );
};
export default TopStoreFilters;
