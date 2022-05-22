import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import NextLink from 'next/link'

export const Sidebar = () => {
  const [{ data, fetching }] = useMeQuery({ pause: isServer() })
  let body = null

  // sidebar component if user is logged in
  if (isServer() || fetching) {
  } else if (!data?.me) {
  } else {
    body = (
      <div className="h-screen w-64 bg-gray-700">
        <div className="pt-8">
          <div className="relative text-gray-300">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-5 w-5 fill-gray-300 "
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 6c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm0 28.4c-5.01 0-9.41-2.56-12-6.44.05-3.97 8.01-6.16 12-6.16s11.94 2.19 12 6.16c-2.59 3.88-6.99 6.44-12 6.44z" />
                <path d="M0 0h48v48H0z" fill="none" />
              </svg>
            </div>
            <a
              href="#"
              className="inline-block w-full rounded py-4 pl-10 pr-4 hover:bg-gray-800"
            >
              Budget
            </a>
          </div>
          <div className="px-6 pt-4">
            <hr className="border-gray-600" />
          </div>
          <span className="pt-4 pl-6 text-gray-400">Accounts</span>
          <ul className="pt-2 text-gray-300">
            {data?.me ? (
              <ul>
                {data.me.accounts.map((account) => (
                  <li
                    key={account.id}
                    className="inline-block w-full rounded py-4 pl-10 pr-4 hover:bg-gray-800"
                  >
                    <NextLink
                      href="/accounts/[id]"
                      as={`/accounts/${account.id}`}
                    >
                      {account.name}
                    </NextLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </ul>
        </div>
      </div>
    )
  }

  return body
}
