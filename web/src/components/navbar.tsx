import NextLink from 'next/link'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer'

export const NavBar = () => {
  const [{}, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({ pause: isServer() })
  let body = null

  if (isServer() || fetching) {
  } else if (!data?.me) {
    body = (
      <nav className=" ml-auto mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
        <NextLink href="/" passHref>
          <a className=" text-yellow-400 hover:text-yellow-300">Home</a>
        </NextLink>
        <NextLink href="/login" passHref>
          <a
            href="#"
            className="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white "
          >
            Login
          </a>
        </NextLink>
        <NextLink href="/register" passHref>
          <a
            href="#"
            className="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white "
          >
            Register
          </a>
        </NextLink>
      </nav>
    )
  } else {
    body = (
      <nav className="ml-auto mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
        <div className="block  py-2 pr-4 pl-3 text-white  dark:border-gray-700 dark:text-white   md:p-0  ">
          {data.me.username}
        </div>
        <NextLink href="/" passHref>
          <button
            onClick={() => {
              logout()
            }}
            className="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
          >
            Logout
          </button>
        </NextLink>
      </nav>
    )
  }

  return (
    <nav className=" border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-800 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-end">
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          {body}
        </div>
      </div>
    </nav>
  )
}
