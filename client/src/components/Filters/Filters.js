import React, { useEffect, useState } from "react";
import { filterByPrice, filterByRating, filterByName } from "../../redux/action.js"
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/action";
import './filters.css'

const Filters = ({ setMinPageNumber, setMaxPageNumber, setActualPage, setOrder}) => {
    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.products);
    const [filterState, setFilterState] = useState([])

    const handleFilter = (e) => {
        if (e.target.value === 'MayorPrecio' || e.target.value === 'MenorPrecio') {
            dispatch(filterByPrice(e.target.value));
            setActualPage(1);
            setMinPageNumber(0)
            setMaxPageNumber(5)  
            setOrder(`sort by ${e.target.value}`);    
        } else if (e.target.value === 'MayorRating' || e.target.value === 'MenorRating') {
            dispatch(filterByRating(e.target.value));
            setActualPage(1);
            setMinPageNumber(0)
            setMaxPageNumber(5)  
            setOrder(`sort by ${e.target.value}`);   
        } else if (e.target.value === 'Name (A-Z)' || e.target.value === 'Name (Z-A)') {
            dispatch(filterByName(e.target.value));
            setActualPage(1);
            setMinPageNumber(0)
            setMaxPageNumber(5)  
            setOrder(`sort by ${e.target.value}`);  
        }
        
        if (!filterState.includes(e.target.value)) setFilterState([ e.target.value])
        
    }


    useEffect(() => {
        new Promise((resolve) => {
          resolve(dispatch(getAllProducts()));
        });
        //cargo todos los cards de recetas
    }, [dispatch]);

    const handleRefresh = (e) => {
        dispatch(getAllProducts())
        setFilterState([])
    }
      
    return (
        <section className="filters_container mb-3 top_filters">
            <div>
                <strong>{allProducts.length}</strong> Productos encontrados
            </div>
            <div>
                <select defaultValue="DEFAULT" onChange={handleFilter} className="refresh-btn">
                    <option value="DEFAULT" disabled>Ordenar por</option>
                    <option value="MayorPrecio">Mayor precio</option>
                    <option value="MenorPrecio">Menor precio</option>
                    <option value="MayorRating">Mayor Rating</option>
                    <option value="MenorRating">Menor Rating</option>
                    <option value="Name (A-Z)">Name (A-Z)</option>
                    <option value="Name (Z-A)">Name (Z-A)</option>
                </select>
            </div>
                <ul className="size-selected">
                    {filterState.map((s, id) => (
                        <li key={id} className="selected-item">
                            {s}
                        </li>
                    ))}
                </ul>
                <button className="refresh-btn" onClick={handleRefresh} > Refresh </button>
        </section>
        )
}

export default Filters