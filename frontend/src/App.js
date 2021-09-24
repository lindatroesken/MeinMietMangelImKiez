import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './auth/ProtectedRoute'
import MaengelForm from './pages/MaengelForm'
import PersonalMaengelList from './pages/PersonalMaengelList'
import AuthProvider from './auth/AuthProvider'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import MangelMap from './pages/MangelMap'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/profile/:mode" component={Profile} />
          <ProtectedRoute path="/profile/:mode/:id" component={Profile} />
          <Route path="/map/view" component={MangelMap} />
          <ProtectedRoute path="/logout" component={Logout} />
          <ProtectedRoute path="/mangel/new">
            <MaengelForm
              initialMode="new"
              readOnly={false}
              title="Neuen Mangel erfassen"
            />
          </ProtectedRoute>
          <ProtectedRoute path="/mangel/details/:id">
            <MaengelForm
              initialMode="view"
              readOnly={true}
              title="Mangel Details"
            />
          </ProtectedRoute>
          <ProtectedRoute path="/mangel/list" component={PersonalMaengelList} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
