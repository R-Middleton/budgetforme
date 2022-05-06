import type { NextPage } from 'next'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { InputField } from '../components/InputeField'

const Register: NextPage = () => {
  //const [, register] = useRegisterMutation();
  const router = useRouter()

  return (
    <div className="mx-auto mt-8 w-full max-w-sm">
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          // const response = await regsiter({ options: values });
          // if (response.data?.Register.errors) {
          //   setErrors(toErrorMap(response.data.Register.errors));
          // } else if (response.data?.Register.user) {
          //   // worked
          //   router.push('/');
          // }
          console.log(values)
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
    </div>
  )
}

export default Register
