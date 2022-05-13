import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import router, { useRouter } from 'next/router'
import { InputField } from '../../components/InputeField'
import { useChangePasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { toErrorMap } from '../../utils/toErrorMap'

const ChangePassword: NextPage<{ token: string }> = (token) => {
  const [, changePassword] = useChangePasswordMutation()
  const router = useRouter()

  return (
    <div className="mx-auto mt-8 w-full max-w-sm">
      <Formik
        initialValues={{
          newPassword: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token: token.token,
          })
          if (response.data?.changePassword.errors) {
            setErrors(toErrorMap(response.data.changePassword.errors))
          } else if (response.data?.changePassword.user) {
            // worked
            router.push('/')
          }
        }}
      >
        <Form className=" grid grid-cols-1 gap-6">
          <InputField
            name="newPassword"
            label="New Password"
            placeholder="Password"
            type="password"
          />
          <button
            className="w-48 rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            type="submit"
          >
            Change Password
          </button>
        </Form>
      </Formik>
    </div>
  )
}

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  }
}

export default withUrqlClient(createUrqlClient)(ChangePassword)
