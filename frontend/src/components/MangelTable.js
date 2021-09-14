import React, { useMemo } from 'react'

import Table from './Table'
import TimeAgo from 'react-timeago'

export default function MangelTable({ data }) {
  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: 'Meine Mängelübersicht',
        // First group columns
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
        ],
      },
    ],
    []
  )

  return <Table columns={columns} data={data} />
}
