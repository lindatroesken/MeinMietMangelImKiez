import Main from '../components/Main'
import MainCenter from '../components/MainCenter'
import MainTop from '../components/MainTop'
import MainBottom from '../components/MainBottom'
import TextField from '../components/TextField'
import Button from '../components/Button'
import styled from 'styled-components/macro'
import { updatePassword } from '../services/api-service'
import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { useHistory } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Page from '../components/Page'
import save from '../images/save-32.png'
import Error from '../components/Error'

const initialPW = {
  oldPassword: '',
  newPassword: '',
  retypePassword: '',
}

export default function PasswordChange() {
  const { user, token, login } = useAuth()
  const [passwords, setPasswords] = useState(initialPW)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleChange = event => {
    setPasswords({ ...passwords, [event.target.name]: event.target.value })
  }

  const goBack = () => {
    history.back()
  }

  const submitNewPassword = () => {
    setLoading(true)
    setError()
    updatePassword(token, passwords)
      .then(() => {
        login({ username: user.username, password: passwords.newPassword })
        setPasswords(initialPW)
        history.push('/')
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  const passwordMatch =
    passwords.newPassword.length &&
    passwords.newPassword === passwords.retypePassword

  return (
    <Page>
      <Header title="Passwort ändern" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <MainTop>
            {error && <Error>{error.response.data.message}</Error>}
          </MainTop>
          <MainCenter>
            <Password autocomplete="off">
              <TextField
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handleChange}
                title="Altes Passwort"
                type="password"
                autocomplete="off"
              />
              <TextField
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                title="Neues Passwort (wiederholen)"
                type="password"
                autocomplete="off"
              />
              <TextField
                name="retypePassword"
                value={passwords.retypePassword}
                onChange={handleChange}
                title="Neues Passwort"
                type="password"
                autocomplete="off"
              />
              <Button disabled={!passwordMatch} onClick={submitNewPassword}>
                <Icon src={save} />
              </Button>
              <Button type="button" onClick={goBack}>
                abbrechen
              </Button>
            </Password>
          </MainCenter>
          <MainBottom />
        </Main>
      )}
      <Navbar user={user} />
    </Page>
  )
}

const Icon = styled.img`
  width: var(--size-l);
  height: var(--size-l);
  padding: 0;
`

const Password = styled.form``
