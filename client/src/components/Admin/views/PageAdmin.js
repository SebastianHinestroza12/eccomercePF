import React from "react";

const Pages = ({
  actualAdminPage,
  minPage,
  maxPage,
  adminProducts,
  adminProductsPage,
  adminPages,
}) => {
  const pageNumbers = [];
  const indexPageNumbers = Math.ceil(adminProducts / adminProductsPage);
  for (let i = 1; i <= indexPageNumbers; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () =>
    actualAdminPage - 1 && adminPages(actualAdminPage - 1);
  const handleNext = () =>
    actualAdminPage !== pageNumbers.length && adminPages(actualAdminPage + 1);

  return (
    <nav>
      <ul className="pages">
        <li
          className={
            actualAdminPage === 1 ? "pageNumber disabled" : "pageNumber"
          }
          onClick={handlePrev}
        >
          Prev
        </li>
        {pageNumbers &&
          pageNumbers.slice(minPage, maxPage).map((num) => (
            <li
              className={
                actualAdminPage === num ? "pageNumber activePage" : "pageNumber"
              }
              key={num}
              onClick={() => adminPages(num)}
            >
              {num}
            </li>
          ))}
        <li
          className={
            actualAdminPage === pageNumbers.length
              ? "pageNumber disabled"
              : "pageNumber"
          }
          onClick={handleNext}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

export default Pages;
