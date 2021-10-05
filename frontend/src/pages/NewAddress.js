import Header from '../components/Header'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Page from '../components/Page'
import Main from '../components/Main'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { initialAddressState } from '../services/profile-service'
import AddressForm from '../components/AddressForm'
import { addNewAddress } from '../services/api-service'
import Navbar from '../components/Navbar'
import MainTop from '../components/MainTop'
import MainCenter from '../components/MainCenter'
import MainBottom from '../components/MainBottom'

export default function NewAddress() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [address, setAddress] = useState(initialAddressState)
  const { user, token } = useAuth()
  const history = useHistory()

  const handleAddressInputChange = event => {
    setAddress({ ...address, [event.target.name]: event.target.value })
  }

  const handleSaveNewAddress = event => {
    event.preventDefault()
    setLoading(true)
    setError()
    addNewAddress(token, user.username, address)
      .catch(setError)
      .finally(() => {
        setLoading(false)
        history.push(`/profile/view/`)
      })
  }
  const handleCancel = () => {
    history.goBack()
  }

  return (
    <Page>
      <Header title="Neue Adresse" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <MainTop />
          <MainCenter>
            <AddressForm
              address={address}
              handleAddressInputChange={handleAddressInputChange}
              handleSaveNewAddress={handleSaveNewAddress}
              handleCancel={handleCancel}
              readOnly={false}
              mode="new"
            />
          </MainCenter>
          <MainBottom />
        </Main>
      )}
      {error && <Error>{error.response.data.message}</Error>}
      <Navbar user={user} />
    </Page>
  )
}
