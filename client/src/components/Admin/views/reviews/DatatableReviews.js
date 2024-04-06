import React, { useMemo } from "react";
import * as Unicons from "@iconscout/react-unicons";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "../../FilterComponent";
import "../dataTable.css";
import { getAllReviews, removeReview } from "../../../../redux/action";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Table = (props) => {

const dispatch = useDispatch()
const newReviews = useSelector(state => state.newReviews)
console.log('RESEÑAS', newReviews)


useEffect(() => {
  dispatch(getAllReviews())
},[dispatch])


  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Autor",
      selector: (row) => row.user?.name,
      sortable: true,
    },
    {
      name: "Puntuacion",
      selector: (row) => Array(row.stars).fill("★"),
      sortable: true,
    },
    {
      name: "Producto",
      selector: (row) => row.product?.name,
      sortable: true,
    },
    {
      name: "Comentarios",
      selector: (row) => row.comment,
      grow: 2,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.visible ? "Publicado" : "Oculto",
      grow: 1,
      sortable: true,
    },
    {
      name: "Ocultar",
      cell: (row) => (
        <Link to={`#`} onClick={() => {
          props.click(row.name)
          dispatch(removeReview(row.id)).then(() => dispatch(getAllReviews()));
          
        }}>
          <Unicons.UilTrash />
        </Link>
      ),
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      title="Valoraciones"
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      highlightOnHover
      pointerOnHover
    />
  );
};

export default Table;
