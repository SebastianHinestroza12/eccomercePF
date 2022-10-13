import React, { useRef } from "react";
import ProductCard from '../Product/Card'
import './cards.css'
import { useState } from "react";
import Pages from '../Pagination/pagination';
const json = require("../../utils/productos.json");

const Cards = () => {
  return (
    <div className="container">
      <div className="row">
        {json.map(({ name, price, image, rating, id }) => (
          <div className="col-md-3 tamanio" key={id}>
            <ProductCard
              name={name}
              price={price}
              image={image}
              rating={rating}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

  const appTopRef = useRef()
  const [actualPage, setActualPage] = useState(1); //arrancamos desde la page 1
  const [productsPerPage, setproductsPerPage] = useState(12); //cuantos products por page
  const indexOfLastproduct = actualPage * productsPerPage;
  const indexOfFirstproduct = indexOfLastproduct - productsPerPage;
  const actualproducts = json.slice(indexOfFirstproduct, indexOfLastproduct); //recortamos el arreglo con todos los products
  const [minPageNumber, setMinPageNumber] = useState(0)
  const [maxPageNumber, setMaxPageNumber] = useState(5)

  const pages = (pageNumber) => {
    setActualPage(pageNumber); 
    appTopRef.current?.scrollIntoView({ behavior: 'smooth' })                                                              
    if(pageNumber >= maxPageNumber) {
      setMinPageNumber(minPageNumber+4)
      setMaxPageNumber(maxPageNumber+4)
    } else if(pageNumber <= minPageNumber+1 && pageNumber !== 1) {
      setMinPageNumber(minPageNumber-4)
      setMaxPageNumber(maxPageNumber-4)
    }
  };
    return (
        <div className="container">
            <div className="row">
                    {actualproducts.map((products) => (
                        <div className="col-md-3 tamanio">
                            <ProductCard 
                                name = {products.nombre}
                                price = {products.precio}
                                image = {products.imagen}
                                rating = {products.calificación}
                            />
                        </div>
                    ))}
            </div>
            <Pages 
                actualPage={actualPage}
                minPageNumber={minPageNumber}
                maxPageNumber={maxPageNumber}
                productsPerPage={productsPerPage}
                products={Array.isArray(json) ? json.length : 1}
                pages={pages}
            />
        </div>
    )
}

export default Cards
