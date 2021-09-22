import Page from '../components/Page'
import Main from '../components/Main'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { useState } from 'react'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Redirect } from 'react-router-dom'
import Header from '../components/Header'
import { useAuth } from '../auth/AuthProvider'

const initialState = {
  username: '',
  password: '',
}

export default function Login() {
  const { login, user } = useAuth()
  const [credentials, setCredentials] = useState(initialState)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleCredentials = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(credentials)
    setLoading(true)
    setError()
    login(credentials).catch(error => {
      console.log({ error })
      setError(error)
      setLoading(false)
    })
  }

  if (user) {
    return <Redirect to="/" />
  }
  return (
    <Page>
      <Header title="Login" />
      {loading && <Loading />}
      {!loading && (
        <Main as="form" onSubmit={handleSubmit}>
          <TextField
            name="username"
            value={credentials.username}
            onChange={handleCredentials}
            title="Username"
          />
          <TextField
            name="password"
            value={credentials.password}
            onChange={handleCredentials}
            title="Password"
            type="password"
          />
          <Button> login </Button>
        </Main>
      )}
      {error && <Error>{error.response.data.message}</Error>}
    </Page>
  )
}
