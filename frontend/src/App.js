import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './auth/ProtectedRoute'
import MaengelForm from './pages/MaengelForm'
import PersonalMaengelList from './pages/PersonalMaengelList'
import AuthProvider from './auth/AuthProvider'
import Logout from './pages/Logout'
import MangelDetails from './pages/MangelDetails'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/logout" component={Logout} />
          <ProtectedRoute path="/maengel/new" component={MaengelForm} />
          <ProtectedRoute
            path="/maengel/details/:id"
            component={MangelDetails}
          />
          <ProtectedRoute
            path="/maengel/list"
            component={PersonalMaengelList}
          />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
