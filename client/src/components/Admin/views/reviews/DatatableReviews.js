import React, { useMemo } from "react";
import * as Unicons from "@iconscout/react-unicons";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "../../FilterComponent";
import "../dataTable.css";

const Table = (props) => {
  const columns = [
    {
      name: "Autor",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Puntuacion",
      selector: (row) => Array(row.stars).fill("★"),
      sortable: true,
    },
    {
      name: "Producto",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Comentarios",
      selector: (row) => row.comment,
      grow: 3,
      sortable: true,
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <Link to={`#`} onClick={() => props.click(row.name)}>
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
