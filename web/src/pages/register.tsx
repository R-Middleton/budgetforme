import type { NextPage } from 'next'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { InputField } from '../components/InputField'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Layout } from '../components/Layout'

const Register: NextPage = () => {
  const [, register] = useRegisterMutation()
  const router = useRouter()

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values })
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            // worked
            router.push('/')
          }
        }}
      >
        <Form className=" grid grid-cols-1 gap-6">
          <InputField
            name="username"
            label="Username"
            placeholder="Username"
            type="text"
          />
          <InputField
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
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
            Submit
          </button>
        </Form>
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Register)
