import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export const Sidebar = () => {
  const [{ data, fetching }] = useMeQuery({ pause: isServer() })
  const router = useRouter()
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
                className="h-5 w-5 fill-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M256 0v128h128L256 0zM288 256H96v64h192V256zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM64 72C64 67.63 67.63 64 72 64h80C156.4 64 160 67.63 160 72v16C160 92.38 156.4 96 152 96h-80C67.63 96 64 92.38 64 88V72zM64 136C64 131.6 67.63 128 72 128h80C156.4 128 160 131.6 160 136v16C160 156.4 156.4 160 152 160h-80C67.63 160 64 156.4 64 152V136zM320 440c0 4.375-3.625 8-8 8h-80C227.6 448 224 444.4 224 440v-16c0-4.375 3.625-8 8-8h80c4.375 0 8 3.625 8 8V440zM320 240v96c0 8.875-7.125 16-16 16h-224C71.13 352 64 344.9 64 336v-96C64 231.1 71.13 224 80 224h224C312.9 224 320 231.1 320 240z" />
              </svg>
            </div>
            <NextLink href="/" passHref>
              <a
                href="#"
                className="inline-block w-full rounded py-4 pl-10 pr-4 hover:bg-gray-800"
              >
                Budget
              </a>
            </NextLink>
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
                    className={`inline-block w-full py-4 pl-10 pr-4  ${
                      router.asPath === `/account/${account.id}`
                        ? 'rounded-lg bg-gray-500'
                        : ' hover:bg-gray-800'
                    }`}
                  >
                    <NextLink
                      href="/account/[id]"
                      as={`/account/${account.id}`}
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
