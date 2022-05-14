import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'
import { useCreateAccountMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useIsAuth } from '../utils/useIsAuth'

const CreateAccount: React.FC<{}> = ({}) => {
  const [, createAccount] = useCreateAccountMutation()
  const router = useRouter()
  useIsAuth()

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={async (values) => {
          await createAccount({ input: values })
          router.push('/')
        }}
      >
        <Form className=" grid grid-cols-1 gap-6">
          <InputField name="name" label="Name" placeholder="Name" type="text" />
          <div className="flex justify-between ">
            <button
              className="w-40 rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </Form>
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreateAccount)
