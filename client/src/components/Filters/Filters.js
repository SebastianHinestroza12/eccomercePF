import React, { useEffect } from "react";
import { filterByPrice } from "../../redux/action.js"
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/action";
import './filters.css'

const Filters = ({ setMinPageNumber, setMaxPageNumber, setActualPage, setOrder}) => {
    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.products);

    const handleFilter = (e) => {
        if (e.target.value === 'MayorPrecio' || e.target.value === 'MenorPrecio') {
            dispatch(filterByPrice(e.target.value));
            setActualPage(1);
            setMinPageNumber(0)
            setMaxPageNumber(5)  
            setOrder(`sort by ${e.target.value}`);    
        }
    }

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
            <div>
                <select defaultValue="DEFAULT" onChange={handleFilter} className="justify-content-end">
                    <option value="DEFAULT" disabled>Ordenar por</option>
                    <option value="MayorPrecio">Mayor precio</option>
                    <option value="MenorPrecio">Menor precio</option>
                </select>
            </div>
        </section>
    )
}

export default Filters