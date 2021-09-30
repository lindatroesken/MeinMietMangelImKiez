import React, { useMemo } from 'react'
import Table from './Table'

export default function ContactTable({ data, handleContactDetailsEdit }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Datum',
        accessor: 'dateContacted',
        Cell: props => {
          return <span>{new Date(props.value).toLocaleDateString()}</span>
        },
      },
      {
        Header: 'Kontakt',
        accessor: 'contactType',
      },
      {
        Header: 'Notiz',
        accessor: 'contactNote',
      },
    ],
    []
  )

  return (
    <Table
      columns={columns}
      data={data}
      handleOnListItemClick={handleContactDetailsEdit}
    />
  )
}
