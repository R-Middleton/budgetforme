import { Form, Formik } from 'formik'
import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useState } from 'react'
import { InputField } from '../components/InputeField'
import { useForgotPasswordMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

export const ForgotPassword: NextPage<{}> = ({}) => {
  const [complete, setComplete] = useState(false)
  const [, forgotPassword] = useForgotPasswordMutation()

  return (
    <div className="mx-auto mt-8 w-full max-w-sm">
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          await forgotPassword(values)
          setComplete(true)
        }}
      >
        {complete ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold">
              Check your email for a reset link
            </h2>
            <p className="text-gray-600">
              If the email address you entered is associated with an account,
              you will receive an email with instructions for resetting your
              password.
            </p>
          </div>
        ) : (
          <Form className=" grid grid-cols-1 gap-6">
            <InputField
              name="email"
              label="Email"
              placeholder="Email"
              type="text"
            />
            <button
              className="w-40 rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
              type="submit"
            >
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
