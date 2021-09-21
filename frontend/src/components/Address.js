import TextField from './TextField'
import Button from './Button'
import { useState } from 'react'
import { initialAddressState } from '../services/address-service'

export default function Address() {
  const [address, setAddress] = useState(initialAddressState)

  const handleAddressSubmit = event => {
    event.preventDefault()
    console.log(address)
    console.log('should submit profile data')
  }

  const handleAddressInputChange = event => {
    setAddress({ ...address, [event.target.name]: event.target.value })
  }

  return (
    <div as="form">
      <TextField
        name="street"
        value={address.street}
        onChange={handleAddressInputChange}
        title="Straße"
        type="text"
      />
      <TextField
        name="number"
        value={address.number}
        onChange={handleAddressInputChange}
        title="Hausnummer"
        type="text"
      />
      <TextField
        name="zip"
        value={address.zip}
        onChange={handleAddressInputChange}
        title="Postleitzahl"
        type="text"
      />
      <TextField
        name="city"
        value={address.city}
        onChange={handleAddressInputChange}
        title="Stadt"
        type="text"
      />
      <TextField
        name="country"
        value={address.country}
        onChange={handleAddressInputChange}
        title="Land"
        type="text"
      />
      <Button type="button" onClick={handleAddressSubmit}>
        {' '}
        speichern{' '}
      </Button>
    </div>
  )
}
