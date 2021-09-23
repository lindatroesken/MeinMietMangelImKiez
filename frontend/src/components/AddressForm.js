import TextField from './TextField'
import Button from './Button'
import styled from 'styled-components/macro'

export default function AddressForm({
  mode,
  address,
  handleEnableEdit,
  handleAddressNew,
  handleAddressEdit,
  handleAddressInputChange,
}) {
  return (
    <Address>
      <TextField
        name="street"
        value={address.street}
        onChange={handleAddressInputChange}
        title="Straße"
        type="text"
        disabled={mode === 'view'}
      />
      <TextField
        name="number"
        value={address.number}
        onChange={handleAddressInputChange}
        title="Hausnummer"
        type="text"
        disabled={mode === 'view'}
      />
      <TextField
        name="zip"
        value={address.zip}
        onChange={handleAddressInputChange}
        title="Postleitzahl"
        type="text"
        disabled={mode === 'view'}
      />
      <TextField
        name="city"
        value={address.city}
        onChange={handleAddressInputChange}
        title="Stadt"
        type="text"
        disabled={mode === 'view'}
      />
      <TextField
        name="country"
        value={address.country}
        onChange={handleAddressInputChange}
        title="Land"
        type="text"
        disabled={mode === 'view'}
      />
      {mode === 'new' && (
        <div>
          <Button onClick={handleAddressNew}> speichern </Button>
        </div>
      )}
      {mode === 'view' && (
        <div>
          <Button type="button" onClick={() => handleEnableEdit(address.id)}>
            bearbeiten
          </Button>
        </div>
      )}
      {mode === 'edit' && (
        <Button type="button" onClick={() => handleAddressEdit(address.id)}>
          {' '}
          Änderungen speichern
        </Button>
      )}
    </Address>
  )
}

const Address = styled.form``
