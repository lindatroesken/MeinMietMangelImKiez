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

  return (
    <Page>
      <Header title="Neue Adresse" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <AddressForm
            address={address}
            handleAddressInputChange={handleAddressInputChange}
            handleSaveNewAddress={handleSaveNewAddress}
            readOnly={false}
            mode="new"
          />
        </Main>
      )}
      {error && <Error>{error.response.data.message}</Error>}
    </Page>
  )
}
