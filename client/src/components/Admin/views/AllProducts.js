import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProductDetail } from "../../../redux/action";
import * as Unicons from "@iconscout/react-unicons";
import DataTable from "react-data-table-component";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";

function getNumberOfPages(rowCount, rowsPerPage) {
  return Math.ceil(rowCount / rowsPerPage);
}

function toPages(pages) {
  const results = [];

  for (let i = 1; i < pages; i++) {
    results.push(i);
  }

  return results;
}

const columns = [
  {
    name: "Nombre",
    selector: (row) => row.name,
    sortable: true,
    grow: 3,
  },
  {
    name: "Precio",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Estado",
    selector: (row) => (row.visible === true ? "Publicado" : "Borrador"),
    sortable: true,
  },
  {
    name: "Editar",
    cell: (row) => (
      <Link to={`/panel-control/nuevo-producto/${row.id}`}>
        <Unicons.UilEdit />
      </Link>
    ),
  },
];

// RDT exposes the following internal pagination properties
const BootyPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage, // available but not used here
  currentPage,
}) => {
  const handleBackButtonClick = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(currentPage + 1);
  };

  const handlePageNumber = (e) => {
    onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(rowCount, rowsPerPage);
  const pageItems = toPages(pages);
  const nextDisabled = currentPage === pageItems.length;
  const previosDisabled = currentPage === 1;

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleBackButtonClick}
            disabled={previosDisabled}
            aria-disabled={previosDisabled}
            aria-label="previous page"
          >
            Previous
          </button>
        </li>
        {pageItems.map((page) => {
          const className =
            page === currentPage ? "page-item active" : "page-item";

          return (
            <li key={page} className={className}>
              <button
                className="page-link"
                onClick={handlePageNumber}
                value={page}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleNextButtonClick}
            disabled={nextDisabled}
            aria-disabled={nextDisabled}
            aria-label="next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check">
    <input
      htmlFor="booty-check"
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="form-check-label" id="booty-check" />
  </div>
));

function AllProducts() {
  const { productId } = useParams();

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  //carga de detalle
  useEffect(() => {
    new Promise((resolve) => {
      resolve(dispatch(getProductDetail(productId)));
    });
  }, [dispatch, productId]);

  return (
    <div className="App">
      <div>
        <DataTable
          title="Productos"
          columns={columns}
          data={products}
          defaultSortFieldID={1}
          pagination
          paginationComponent={BootyPagination}
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
export default AllProducts;
