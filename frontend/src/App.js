import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import { getToken } from './services/api-service'
import { useState } from 'react'
import jwt from 'jsonwebtoken'
import Home from './pages/Home'
import ProtectedRoute from './auth/ProtectedRoute'
import MaengelForm from './pages/MaengelForm'
import PersonalMaengelList from './pages/PersonalMaengelList'

export default function App() {
  const [token, setToken] = useState()
  const claims = jwt.decode(token)

  const user = claims && {
    username: claims.sub,
  }
  const login = credentials => getToken(credentials).then(setToken)

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login onLogin={login} token={token} user={user} />
        </Route>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        {user && (
          <ProtectedRoute user={user} path={`/${user.username}/maengel/new`}>
            <MaengelForm user={user} />
          </ProtectedRoute>
        )}
        {user && (
          <ProtectedRoute user={user} path={`/${user.username}/maengel/list`}>
            <PersonalMaengelList user={user} token={token} />
          </ProtectedRoute>
        )}
      </Switch>
    </Router>
  )
}
