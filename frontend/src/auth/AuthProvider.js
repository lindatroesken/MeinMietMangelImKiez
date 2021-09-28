import AuthContext from './AuthContext'
import { useContext, useState } from 'react'
import jwt from 'jsonwebtoken'
import { getToken } from '../services/api-service'
import { useHistory } from 'react-router-dom'

export default function AuthProvider({ children }) {
  const [token, setToken] = useState()
  const claims = jwt.decode(token)
  const history = useHistory()

  const user = claims && {
    username: claims.sub,
    role: claims.role,
  }
  const login = credentials => getToken(credentials).then(setToken)

  const logout = () => {
    setToken()
    history.push('/login')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
