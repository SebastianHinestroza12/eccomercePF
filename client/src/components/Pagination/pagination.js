import React from "react";
import './pagination.css'

const Pages = ({ actualPage, minPageNumber, maxPageNumber, products, productsPerPage, pages }) => {  
  const pageNumbers = [];
  const indexPageNumbers = Math.ceil(products / productsPerPage);
  for (let i = 1; i <= indexPageNumbers; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => (actualPage-1) && pages(actualPage - 1)
  const handleNext = () => (actualPage!==pageNumbers.length) && pages(actualPage + 1)

  return (
    <nav>
      <ul className="pages">
        <li className={actualPage === 1 ? 'pageNumber disabled' : "pageNumber"} onClick={handlePrev}>Prev</li>
        {pageNumbers && pageNumbers.slice(minPageNumber, maxPageNumber).map((num) => (
          <li className={actualPage === num ? 'pageNumber activePage' : "pageNumber"} key={num} onClick={() => pages(num)}>
            {num}
          </li>
        ))}
        <li className={actualPage === pageNumbers.length ? 'pageNumber disabled' : "pageNumber"} onClick={handleNext}>Next</li>
      </ul>
    </nav>
  );
};

export default Pages;