import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute({ user, ...props }) {
  if (!user) {
    return <Redirect to="/" />
  }

  return <Route {...props} />
}
