import TextField from './TextField'
import Button from './Button'
import styled from 'styled-components/macro'

export default function AddressForm({
  mode,
  address,
  handleEditAddress,
  handleSaveNewAddress,
  handleSaveAddressChanges,
  handleAddressInputChange,
  handleCancel,
  handleDeleteAddress,
  readOnly,
}) {
  return (
    <Address>
      <StreetNumber>
        <TextField
          name="street"
          value={address.street}
          onChange={handleAddressInputChange}
          title="Straße"
          type="text"
          disabled={readOnly}
        />
        <TextField
          name="number"
          value={address.number}
          onChange={handleAddressInputChange}
          title="Nummer"
          type="text"
          disabled={readOnly}
        />
      </StreetNumber>
      <ZipCity>
        <TextField
          name="zip"
          value={address.zip}
          onChange={handleAddressInputChange}
          title="Postleitzahl"
          type="text"
          disabled={readOnly}
        />
        <TextField
          name="city"
          value={address.city}
          onChange={handleAddressInputChange}
          title="Stadt"
          type="text"
          disabled={readOnly}
        />
      </ZipCity>
      <TextField
        name="country"
        value={address.country}
        onChange={handleAddressInputChange}
        title="Land"
        type="text"
        disabled={readOnly}
      />
      {mode === 'new' && (
        <div>
          <Button onClick={handleSaveNewAddress}> speichern </Button>
        </div>
      )}
      {readOnly && (
        <div>
          <Button type="button" onClick={() => handleEditAddress(address.id)}>
            bearbeiten
          </Button>
        </div>
      )}
      {mode === 'edit' && (
        <div>
          <Button type="button" onClick={handleCancel}>
            abbrechen
          </Button>
          <Button
            type="button"
            onClick={() => handleSaveAddressChanges(address.id)}
          >
            Änderungen speichern
          </Button>
          <Button type="button" onClick={handleDeleteAddress}>
            löschen
          </Button>
        </div>
      )}
    </Address>
  )
}

const Address = styled.form`
  width: 100%;
  border-color: var(--dark-shades);
  border-radius: var(--size-s);
  border: solid 0.5px;
  //padding: var(--size-m);
  margin-bottom: var(--size-m);
  //max-width: var(--max-content-width);
`

const StreetNumber = styled.div`
  display: grid;
  grid-gap: var(--size-s);
  grid-template-columns: 1fr min-content;
`

const ZipCity = styled.div`
  display: grid;
  grid-gap: var(--size-s);
  grid-template-columns: min-content 1fr;
`
