import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useAccountsQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'

const Index = () => {
  const [{ data }] = useAccountsQuery()
  return (
    <Layout>
      <div>Hello world</div>
      <br />
      {!data
        ? null
        : data.accounts.map((account) => (
            <div key={account.id}>
              Account: {account.name} Balance: {account.balance}
            </div>
          ))}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Index)
