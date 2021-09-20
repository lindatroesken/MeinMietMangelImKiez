import React, { useMemo } from 'react'
import Table from './Table'

export default function MangelTable({ data, handleGoToDetails, title }) {
  const columns = useMemo(
    () => [
      {
        Header: title,
        columns: [
          {
            Header: 'Seit',
            accessor: 'dateNoticed',
            Cell: props => {
              return <span>{new Date(props.value).toLocaleDateString()}</span>
            },
          },
          {
            Header: 'Kategorie',
            accessor: 'category',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
        ],
      },
    ],
    [title]
  )

  return (
    <Table
      columns={columns}
      data={data}
      handleOnListItemClick={handleGoToDetails}
    />
  )
}
