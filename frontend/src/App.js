import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import { getToken } from './services/api-service'
import { useState } from 'react'
import jwt from 'jsonwebtoken'

export default function App() {
  const [token, setToken] = useState()
  const claims = jwt.decode(token)

  const user = claims && {
    username: claims.sub,
    avatar: claims.avatar,
    role: claims.role,
  }
  const login = credentials => getToken(credentials).then(setToken)

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login onLogin={login} token={token} user={user} />
        </Route>
      </Switch>
    </Router>
  )
}
