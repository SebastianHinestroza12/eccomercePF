import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

const topStoreFilters = () => {
  return (
    <section className="filters_container mb-3 top_filters">
      <div>
        <strong>xx</strong> Productos encontrados
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
export default topStoreFilters;
