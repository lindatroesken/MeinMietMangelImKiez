import React, { useMemo } from 'react'

import Table from './Table'
import TimeAgo from 'react-timeago'

export default function MangelTable({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Meine Mängelübersicht',
        columns: [
          {
            Header: 'Seit',
            accessor: 'dateNoticed',
            Cell: ({ cell: { value } }) => <TimeAgo date={value} />,
          },
          {
            Header: 'Beschreibung',
            accessor: 'description',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
        ],
      },
    ],
    []
  )

  return <Table columns={columns} data={data} />
}
