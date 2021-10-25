import Page from '../components/Page'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Main from '../components/Main'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { getUserAddressList, putEditUsername } from '../services/api-service'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Addresses from '../components/Addresses'
import TextField from '../components/TextField'
import Navbar from '../components/Navbar'
import MainTop from '../components/MainTop'
import MainCenter from '../components/MainCenter'
import MainBottom from '../components/MainBottom'
import styled from 'styled-components/macro'
import save from '../images/save-32.png'

export default function Profile() {
  const { mode, id } = useParams()
  const { user, token, logout } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [addressList, setAddressList] = useState([])
  const [username, setUsername] = useState(user.username)

  const loadDataOnlyOnce = useCallback(() => {
    setLoading(true)
    setError()
    getUserAddressList(token, user.username)
      .then(response => {
        setAddressList(response)
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }, [token, user.username])

  useEffect(() => {
    loadDataOnlyOnce()
  }, [loadDataOnlyOnce])

  const handleEditAddress = id => {
    history.push(`/address/edit/${id}`)
  }

  const handleNewAddress = () => {
    history.push(`/address/new`)
  }

  const handleChangeUsername = event => {
    setUsername(event.target.value)
  }

  const handleSubmitUserName = () => {
    setLoading(true)
    setError()
    putEditUsername(token, username)
      .then(() => logout())
      .catch(setError)
      .finally(() => setLoading(false))
  }

  const handleChangePassword = () => {
    history.push(`/password/change`)
  }

  return (
    <Page>
      <Header title="Mein Profil" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <MainTop>
            {error && <Error>{error.response.data.message}</Error>}
          </MainTop>
          <MainCenter>
            <User>
              <TextField
                name="username"
                value={username}
                onChange={handleChangeUsername}
                title="Username"
                type="text"
              />
              <Button
                type="button"
                onClick={handleSubmitUserName}
                disabled={username === user.username}
              >
                <Icon src={save} />
              </Button>
            </User>
            <div>
              <Button type="button" onClick={handleChangePassword}>
                Passwort ändern
              </Button>
            </div>

            <Addresses
              user={user}
              mode={mode}
              addressList={addressList}
              id={id}
              handleEditAddress={handleEditAddress}
              handleNewAddress={handleNewAddress}
            />
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

const User = styled.form`
  display: grid;
  width: 100%;
  padding: 0;
  grid-template-columns: 1fr min-content;
  justify-content: space-between;
  align-items: end;
  margin-bottom: var(--size-l);
  label {
    margin: 0;
    width: 100%;
  }
  button {
    margin-bottom: 0;
    height: min-content;
  }
`
