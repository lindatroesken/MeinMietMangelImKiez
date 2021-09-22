import Page from '../components/Page'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Main from '../components/Main'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import AddressForm from '../components/AddressForm'
import { initialAddressState } from '../services/profile-service'
import {
  addNewAddress,
  getUserAddress,
  updateUserAddress,
} from '../services/api-service'
import { useHistory, useParams } from 'react-router-dom'
import useProfile from '../hooks/useProfile'
import Button from '../components/Button'

export default function Profile() {
  const { mode, id } = useParams()
  const { user, token } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [address, setAddress] = useState(initialAddressState)
  const [addressList, setAddressList] = useState({})
  const { profile, loadProfile } = useProfile(user, token)

  useEffect(() => {
    setLoading(true)
    setError()
    getUserAddress(token, user.username)
      .then(response => {
        console.log('GET request response')
        setAddressList(response)
        console.log(response)
        if (mode === 'new') {
          setAddress(initialAddressState)
        } else {
          setAddress(response[0])
        }
      })
      .catch(setError)
      .finally(() => {
        // setAddress(addressList[0])
        setLoading(false)
        console.log(addressList)
        console.log(address)
      })
  }, [user, token, mode])

  const handleAddressNew = event => {
    event.preventDefault()
    console.log('save new address: ', address)
    setLoading(true)
    setError()
    addNewAddress(token, user.username, address)
      .then(setAddress)
      .catch(setError)
      .finally(() => {
        setLoading(false)
        history.push(`/profile/view/${address.id}`)
      })
  }
  console.log('Mode: ', mode)
  console.log('id: ', id)

  const handleAddressInputChange = event => {
    setAddress({ ...address, [event.target.name]: event.target.value })
    // setAddressList({
    //   ...addressList[0],
    //   [event.target.name]: event.target.value,
    // })
  }
  const handleEnableEdit = id => {
    console.log('hier vielleicht setAddress noch mal setzen?')
    history.push(`/profile/edit/${id}`)
  }
  const handleSetModeNew = () => {
    history.push(`/profile/new`)
  }
  const handleAddressEdit = () => {
    setLoading(true)
    setError()
    updateUserAddress(token, address.id, address)
      .then(setAddress)
      .catch(setError)
      .finally(() => {
        setLoading(false)
        history.push(`/profile/view/${address.id}`)
      })
    console.log('updated')
  }

  // console.log(mode)

  return (
    <Page>
      <Header title="Mein Profil" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          {/*{user && addressList && addressList.length > 0 && (*/}
          {user && address && (
            <AddressForm
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
