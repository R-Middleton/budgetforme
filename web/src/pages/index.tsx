import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useMeQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'
import NextLink from 'next/link'
import { isServer } from '../utils/isServer'

const Index = () => {
  const [{ data }] = useMeQuery({ pause: isServer() })

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
        {data?.me ? (
          <ul>
            {data.me.accounts.map((account) => (
              <li key={account.id}>Hello {account.name}</li>
            ))}
          </ul>
        ) : (
          <div>You must be logged in to view accounts</div>
        )}
      </div>
      <div>
        <h2 className="text-4xl">Transactions</h2>
      </div>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Index)
