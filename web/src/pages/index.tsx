import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useAccountsQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'
import NextLink from 'next/link'

const Index = () => {
  const [{ data: accountData }] = useAccountsQuery()
  // const [{ data: transactionData }] = useTransactionsQuery()
  return (
    <Layout>
      <h1 className="text-5xl">Budget For Me</h1>
      <div className="py-6">
        <h2 className="text-4xl">Accounts</h2>
        <NextLink href="/create-account" passHref>
          <button className="w-40 rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700">
            Create Account
          </button>
        </NextLink>
        {!accountData
          ? null
          : accountData.accounts.map((account) => (
              <div key={account.id}>
                Account: {account.name} Balance: {account.balance}
              </div>
            ))}
      </div>
      <div>
        <h2 className="text-4xl">Transactions</h2>
      </div>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Index)
