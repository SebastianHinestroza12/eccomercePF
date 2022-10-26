import React, { useMemo } from "react";
import * as Unicons from "@iconscout/react-unicons";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "../FilterComponent";
import "./dataTable.css";

const Table = (props) => {
  const columns = [
    {
      name: "Nombre",
      grow: 3,
      cell: (row) => (
        <Link target="_blank" to={`/store/${row.id}`}>
          {row.name}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Valoraciones",
      selector: (row) => Array(row.stars).fill("★"),
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
        <Link
          to={`/panel-control/nuevo-producto/${row.id}`}
          onClick={() => props.click(row.name)}
        >
          <Unicons.UilEdit />
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
      title="Productos"
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
