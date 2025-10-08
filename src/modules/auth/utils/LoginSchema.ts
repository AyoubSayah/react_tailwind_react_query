import * as Yup from 'yup'

const LoginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
  remember: Yup.boolean().optional(),
})

export { LoginSchema }