import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/useAuth'
import { Button } from '../../components/button'
import { HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2'
import { LoginSchema } from './utils/LoginSchema'



export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-secondary-100 to-white p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">A</div>
          <h2 className="text-2xl font-semibold mt-3">Sign in to your account</h2>
          <p className="text-sm text-slate-500 mt-1">Enter your credentials to continue</p>
        </div>

        <Formik
          initialValues={{ email: '', password: '', remember: false }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await login(values.email, values.password)
              navigate('/private/dashboard')
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm text-slate-600">Email</label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <HiOutlineEnvelope className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="mt-1 text-xs text-red-600" />
              </div>

              <div>
                <label htmlFor="password" className="text-sm text-slate-600">Password</label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <HiOutlineLockClosed className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <ErrorMessage name="password" component="div" className="mt-1 text-xs text-red-600" />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="remember" className="text-sm inline-flex items-center">
                  <Field id="remember" name="remember" type="checkbox" className="mr-2" />Remember me
                </label>
                <a href="#" className="text-sm text-primary-600">Forgot?</a>
              </div>

              <div>
                <Button type="submit" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>Sign in</Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center text-sm text-slate-500 mt-4">Don’t have an account? <a href="#" className="text-primary-600">Contact admin</a></div>
      </div>
    </div>
  )
}
