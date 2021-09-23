import Page from '../components/Page'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Main from '../components/Main'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import AddressForm from '../components/AddressForm'
import { initialAddressState } from '../services/profile-service'
import {
  addNewAddress,
  getUserAddress,
  updateUserAddress,
} from '../services/api-service'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../components/Button'

export default function Profile() {
  const { mode, id } = useParams()
  const { user, token } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [address, setAddress] = useState(initialAddressState)
  const [addressList, setAddressList] = useState([])

  const loadDataOnlyOnce = useCallback(() => {
    setLoading(true)
    setError()
    getUserAddress(token, user.username)
      .then(response => {
        setAddressList(response)
        if (mode === 'new') {
          setAddress(initialAddressState)
        } else if (mode === 'edit') {
          setEditAddress(response, id)
        }
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
        console.log(addressList)
        console.log(address)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  useEffect(() => {
    loadDataOnlyOnce()
  }, [loadDataOnlyOnce])

  const setEditAddress = (addressList, id) => {
    const selectedAddress = addressList.filter(address => address.id === id)
    setAddress(selectedAddress)
    console.log(addressList.findIndex(address => address.id === id))
  }

  const handleAddressNew = event => {
    event.preventDefault()
    console.log('save new address: ', address)
    setLoading(true)
    setError()
    addNewAddress(token, user.username, address)
      .then(response => {
        setAddress(response)
        console.log([...addressList, response])
        setAddressList([...addressList, response])
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
        history.push(`/profile/view/${address.id}`)
      })
  }

  const handleAddressInputChange = event => {
    setAddress({ ...address, [event.target.name]: event.target.value })
  }

  const handleEnableEdit = id => {
    setEditAddress(addressList, id)
    history.push(`/profile/edit/${id}`)
  }

  const handleSetModeNew = () => {
    history.push(`/profile/new`)
  }

  const handleAddressEdit = id => {
    setLoading(true)
    setError()
    updateUserAddress(token, id, address)
      .then(setAddress)
      .catch(setError)
      .finally(() => {
        setLoading(false)
        history.push(`/profile/view/${address.id}`)
      })
    console.log('updated')
  }

  return (
    <Page>
      <Header title="Mein Profil" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          {user &&
            mode !== 'edit' &&
            addressList.length > 0 &&
            addressList.map(address => (
              <AddressForm
                id={id}
                mode={mode}
                address={address}
                handleEnableEdit={handleEnableEdit}
                handleAddressNew={handleAddressNew}
                handleAddressEdit={handleAddressEdit}
                handleAddressInputChange={handleAddressInputChange}
              />
            ))}
          {user && mode === 'edit' && address && (
            <AddressForm
              id={id}
              mode={mode}
              address={address}
              handleEnableEdit={handleEnableEdit}
              handleAddressNew={handleAddressNew}
              handleAddressEdit={handleAddressEdit}
              handleAddressInputChange={handleAddressInputChange}
            />
          )}

          {user && addressList.length === 0 && (
            <div>
              <Button onClick={handleSetModeNew}> neue Adresse </Button>
            </div>
          )}
        </Main>
      )}
      {error && <Error>{error.response.data.message}</Error>}
    </Page>
  )
}
