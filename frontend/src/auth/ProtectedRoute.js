import { Redirect, Route } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function ProtectedRoute({ ...props }) {
  const { user } = useAuth()
  if (!user) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}
