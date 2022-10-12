import React from "react";
import ProductCard from '../Product/Card'
import './cards.css'

const json = require("../../utils/productos.json");

const Cards = () => {

    return (
        <div className="container">
            <div className="row">
                    {json.map(({ nombre, precio, id, imagen, calificación, }) => (
                        <div className="col-md-3 tamanio" key={id}>
                            <ProductCard 
                                nombre = {nombre}
                                precio = {precio}
                                imagen = {imagen}
                                calificación = {calificación}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Cards