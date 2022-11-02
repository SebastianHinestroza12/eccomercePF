import React, { useMemo } from "react";
import * as Unicons from "@iconscout/react-unicons";

import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "../../FilterComponent";
import "../dataTable.css";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUsers, removeUser } from "../../../../redux/action";

const Table = (props) => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.newUsers)

  console.log('USERSS', users)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])


  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      grow: 0,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      grow: 1,
    },
    {
      name: "N° de Reviews",
      selector: (row) => row.reviews?.length,
      sortable: true,
      grow: 1,
      center: true

    },
    {
      name: "N° de Pedidos",
      selector: (row) => row.orders?.length,
      sortable: true,
      grow: 1,
      center: true
    },
    {
      name: "Estado",
      selector: (row) => row.visible ? "Activo" : "Baneado",
      grow: 1,
      sortable: true,
    },
    {
      name: "Banear",
      center: true,
      cell: (row) => (
        <Link to={`#`} onClick={() => {
          props.click(row.name)
          dispatch(removeUser(row.id)).then(() => dispatch(getUsers()))
          
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
      title="Clientes"
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