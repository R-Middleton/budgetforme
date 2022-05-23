import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout'
import { useAccountQuery, useTransactionsQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Account = () => {
  const router = useRouter()
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1
  const [{ data }] = useAccountQuery({
    pause: intId === -1,
    variables: { id: intId },
  })

  const [transactions] = useTransactionsQuery({
    pause: intId === -1,
    variables: { accountId: intId },
  })

  return (
    <Layout>
      <div>
        <h1>{data?.account?.name}</h1>
        <p>Balance: £{data?.account?.balance}</p>
        <h2>Transactions:</h2>
        <ul>
          {transactions.data?.transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.note} - £{transaction.amount}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Account)
