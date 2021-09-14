import React, { useMemo } from 'react'

import Table from './Table'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

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
            Cell: ({ cell: { value } }) => (
              <DetailsLink to={`/mangel/details/${value}`}>{value}</DetailsLink>
            ),
          },
        ],
      },
    ],
    []
  )

  return <Table columns={columns} data={data} />
}

const DetailsLink = styled(Link)`
  text-decoration: none;
  color: var(--neutral-dark);
`
