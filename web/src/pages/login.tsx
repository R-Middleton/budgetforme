import type { NextPage } from 'next'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { InputField } from '../components/InputeField'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'

const Login: NextPage = () => {
  const [, login] = useLoginMutation()
  const router = useRouter()

  return (
    <div className="mx-auto mt-8 w-full max-w-sm">
      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values)
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            // worked
            router.push('/')
          }
        }}
      >
        <Form className=" grid grid-cols-1 gap-6">
          <InputField
            name="usernameOrEmail"
            label="Username or email"
            placeholder="username or email"
            type="text"
          />
          <InputField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <button
            className="w-20 rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
