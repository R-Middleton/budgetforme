import type { NextPage } from 'next'
import { NavBar } from '../components/navbar'

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <div>Hello world</div>
    </>
  )
}

export default Home
