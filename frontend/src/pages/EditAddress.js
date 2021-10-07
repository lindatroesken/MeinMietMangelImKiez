import Header from '../components/Header'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Page from '../components/Page'
import Main from '../components/Main'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import AddressForm from '../components/AddressForm'
import {
  deleteUserAddress,
  getUserAddressById,
  updateUserAddress,
} from '../services/api-service'
import Navbar from '../components/Navbar'
import MainTop from '../components/MainTop'
import MainCenter from '../components/MainCenter'
import MainBottom from '../components/MainBottom'

export default function EditAddress() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [address, setAddress] = useState()
  const { user, token } = useAuth()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    setError()
    getUserAddressById(token, user.username, id)
      .then(setAddress)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }, [token, user, id])

  const handleAddressInputChange = event => {
    setAddress({ ...address, [event.target.name]: event.target.value })
  }

  const handleSaveAddressChanges = id => {
    setLoading(true)
    setError()
    updateUserAddress(token, id, address)
      .then(updatedAddress => {
        setAddress(updatedAddress)
        history.push(`/profile/view/`)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  const handleCancel = () => {
    history.goBack()
  }

  const handleDeleteAddress = () => {
    setLoading(true)
    setError()
    deleteUserAddress(token, id)
      .then(deletedAddress => {
        console.log('deleted: ', deletedAddress)
        history.push(`/profile/view/`)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  return (
    <Page>
      <Header title="Adresse bearbeiten" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <MainTop>
            {error && <Error>{error.response.data.message}</Error>}
          </MainTop>
          <MainCenter>
            {user && address && (
              <AddressForm
                address={address}
                handleSaveAddressChanges={handleSaveAddressChanges}
                handleAddressInputChange={handleAddressInputChange}
                handleCancel={handleCancel}
                handleDeleteAddress={handleDeleteAddress}
                readOnly={false}
                mode="edit"
              />
            )}
          </MainCenter>
          <MainBottom />
        </Main>
      )}

      <Navbar user={user} />
    </Page>
  )
}
