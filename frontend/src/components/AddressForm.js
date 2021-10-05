import TextField from './TextField'
import Button from './Button'
import styled from 'styled-components/macro'
import Icon from './Icon'
import trash from '../images/trash-9-32.png'

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
        <ButtonGroup>
          <Button type="button" onClick={handleCancel}>
            abbrechen
          </Button>
          <Button onClick={handleSaveNewAddress}> speichern </Button>
        </ButtonGroup>
      )}
      {readOnly && (
        <ButtonGroup>
          <Button type="button" onClick={() => handleEditAddress(address.id)}>
            bearbeiten
          </Button>
        </ButtonGroup>
      )}
      {mode === 'edit' && (
        <ButtonGroup>
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
            <Icon src={trash} />
          </Button>
        </ButtonGroup>
      )}
    </Address>
  )
}

const Address = styled.form`
  width: 100%;
  border-color: var(--dark-shades);
  border-radius: var(--size-s);
  margin-bottom: var(--size-m);
`

const ButtonGroup = styled.div`
  text-align: center;
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
