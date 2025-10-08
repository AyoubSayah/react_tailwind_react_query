import  { type FC, type ReactNode } from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router'

interface AuthProtectedProps {
    children: ReactNode
}
const AuthProtected:FC<AuthProtectedProps> = ({children}) => {
const {isAuthenticated}=useAuth()
const navigate=useNavigate()
if(!isAuthenticated){
  navigate('/login')
}

  return (<>{children}</>
  )
}

export default AuthProtected