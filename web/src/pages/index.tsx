import type { NextPage } from 'next'
import { NavBar } from '../components/navbar'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useAccountsQuery } from '../generated/graphql'

const Home: NextPage = () => {
  const [{ data }] = useAccountsQuery()
  return (
    <>
      <NavBar />
      <div>Hello world</div>
      <br />
      {!data
        ? null
        : data.accounts.map((account) => (
            <div key={account.id}>
              Account: {account.name} Balance: {account.balance}
            </div>
          ))}
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
