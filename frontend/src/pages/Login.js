import Page from '../components/Page'
import Main from '../components/Main'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { useState } from 'react'

const initialState = {
  username: '',
  password: '',
}

export default function Login() {
  const [credentials, setCredentials] = useState(initialState)

  const handleCredentials = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: [event.target.value],
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log('Submit clicked --> Post request has to be included here...')
  }

  return (
    <Page>
      <h1>Login</h1>
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
    </Page>
  )
}
