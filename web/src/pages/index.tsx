import type { NextPage } from 'next'
import { NavBar } from '../components/navbar'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <div>Hello world</div>
    </>
  )
}

export default withUrqlClient(createUrqlClient)(Home)
