import React from "react";
import { useDispatch } from "react-redux"
import { filterByPrice } from "../../redux/action.js"
import './filters.css'

const Filters = ({ setMinPageNumber, setMaxPageNumber, setActualPage, setOrder}) => {
    const dispatch = useDispatch()

    const handleFilter = (e) => {
        if (e.target.value === 'Mayor precio' || e.target.value === 'Menor precio') {
            dispatch(filterByPrice(e.target.value));
            setActualPage(1);
            setMinPageNumber(0)
            setMaxPageNumber(5)  
            setOrder(`sort by ${e.target.value}`);    
        } 
    }

    return (
        <div>
            <span>Filter by</span>
            <select defaultValue="DEFAULT" onChange={handleFilter}>
                <option value="DEFAULT" disabled>Select...</option>
                <option value="Mayor precio">Mayor precio</option>
                <option value="Menor precio">Menor precio</option>
            </select>
        </div>
    )
}


export default Filters