import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './pages/auth/auth.context'

interface IPrivateRoutes {
  redirectPath?: string
  children: JSX.Element
}

const PrivateRoutes = ({
  redirectPath = '/login',
  children,
}: IPrivateRoutes) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default PrivateRoutes
