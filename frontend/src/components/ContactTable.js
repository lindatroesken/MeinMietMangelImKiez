import React, { useMemo } from 'react'
import TimeAgo from 'react-timeago'
import Table from './Table'

export default function ContactTable({ data, handleContactDetailsEdit }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Mein Kontaktprotokoll',
        columns: [
          {
            Header: 'Datum',
            accessor: 'dateContacted',
            Cell: ({ cell: { value } }) => <TimeAgo date={value} />,
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
