import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout'
import { useAccountQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Account = () => {
  const router = useRouter()
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1
  const [{ data, fetching }] = useAccountQuery({
    pause: intId === -1,
    variables: { id: intId },
  })

  return (
    <Layout>
      <div>
        <h1>{data?.account?.name}</h1>
        <p>Balance: £{data?.account?.balance}</p>
      </div>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Account)
