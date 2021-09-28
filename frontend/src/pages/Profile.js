import Page from '../components/Page'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Main from '../components/Main'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { getUserAddressList } from '../services/api-service'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Addresses from '../components/Addresses'
import TextField from '../components/TextField'
import Navbar from '../components/Navbar'

export default function Profile() {
  const { mode, id } = useParams()
  const { user, token } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [addressList, setAddressList] = useState([])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  useEffect(() => {
    loadDataOnlyOnce()
  }, [loadDataOnlyOnce])

  const handleEditAddress = id => {
    history.push(`/address/edit/${id}`)
  }

  const handleNewAddress = () => {
    history.push(`/address/new`)
  }

  const handleChangeUsername = () => {
    console.log('username change tbd.')
  }

  return (
    <Page>
      <Header title="Mein Profil" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <div>
            <TextField
              name="username"
              value={user.username}
              onChange={handleChangeUsername}
              title="Username"
              type="text"
              disabled={true}
            />
            <Button type="button">Namen ändern</Button>
            <Button type="button">Passwort ändern</Button>
          </div>
          <Addresses
            user={user}
            mode={mode}
            addressList={addressList}
            id={id}
            handleEditAddress={handleEditAddress}
            handleNewAddress={handleNewAddress}
          />
        </Main>
      )}
      {error && <Error>{error.response.data.message}</Error>}
      <Navbar user={user} />
    </Page>
  )
}
