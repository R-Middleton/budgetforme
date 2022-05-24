import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from '../../components/Layout'
import { useAccountQuery, useTransactionsQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useTable } from 'react-table'

const Account = () => {
  const router = useRouter()
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1
  const [account] = useAccountQuery({
    pause: intId === -1,
    variables: { id: intId },
  })

  const [transactions] = useTransactionsQuery({
    pause: intId === -1,
    variables: { accountId: intId },
  })

  const data = React.useMemo(
    () =>
      transactions.data?.transactions.map((t) => ({ ...t, accountId: intId })),
    [transactions.data, intId]
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ cell: { value } }: { cell: any }) =>
          new Date(value).toLocaleDateString(),
      },
      {
        Header: 'Note',
        accessor: 'note',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ cell: { value } }: { cell: any }) => `£${value}`,
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
    ],
    []
  ) as any

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data || [] })

  return (
    <Layout>
      <div className="flex">
        <h1>{account.data?.account?.name}</h1>
        <h2 className="pl-6">Balance: £{account.data?.account?.balance}</h2>
      </div>
      <div className="pt-4">
        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              className="divide-y divide-gray-200 bg-white"
              {...getTableBodyProps()}
            >
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="whitespace-nowrap px-6 py-4"
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Account)
