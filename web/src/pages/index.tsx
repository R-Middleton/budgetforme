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
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Index)
