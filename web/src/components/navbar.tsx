import NextLink from 'next/link'
import { useMeQuery } from '../generated/graphql'

export const NavBar = () => {
  const [{ data, fetching }] = useMeQuery()
  console.log(data)
  let body = null

  if (fetching) {
    body = null
  } else if (!data?.me) {
    body = (
      <ul className="ml-auto mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
        <li>
          <NextLink href="/login">
            <a
              href="#"
              className="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white "
            >
              login
            </a>
          </NextLink>
        </li>
        <li>
          <NextLink href="/register">
            <a
              href="#"
              className="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white "
            >
              Register
            </a>
          </NextLink>
        </li>
      </ul>
    )
  } else {
    body = (
      <>
        <div className="block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white ">
          {data.me.username}
        </div>
      </>
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
