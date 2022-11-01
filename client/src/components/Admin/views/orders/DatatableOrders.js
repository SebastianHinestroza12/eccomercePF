import React, { useMemo } from "react";
import * as Unicons from "@iconscout/react-unicons";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "../../FilterComponent";
import "../dataTable.css";

const Table = (props) => {

  const columns = [
    {
      name: "#Orden",
      selector: (row) => row.numberOrder,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.client,
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row.products,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total_purchase,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <Link to={`#`} onClick={() => props.click(row.name)}>
          <Unicons.UilTrash />
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
      title="Pedidos"
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
