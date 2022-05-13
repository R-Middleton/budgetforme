import { Field, useField } from 'formik'
import { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  placeholder?: string
  type: string
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props)
  return (
    <div>
      <label className="text-gray-700" htmlFor="username">
        {props.label}
      </label>
      <Field
        id={field.name}
        name={field.name}
        placeholder={props.placeholder}
        type={props.type}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      ></Field>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}
