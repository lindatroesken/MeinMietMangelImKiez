import Button from './Button'
import TextField from './TextField'
import styled from 'styled-components/macro'
import edit from '../images/edit-2-32.png'

export default function Addresses({
  user,
  addressList,
  id,
  handleEditAddress,
  handleNewAddress,
}) {
  const addressToString = address => {
    return (
      address.street +
      ' ' +
      address.number +
      ', ' +
      address.zip +
      ' ' +
      address.city
    )
  }
  return (
    <Wrapper>
      <h3>Meine Adressen</h3>
      {user && (
        <div>
          <Button onClick={handleNewAddress}> neue Adresse </Button>
        </div>
      )}
      {user &&
        addressList.length > 0 &&
        addressList.map(address => (
          <AddressListItem key={address.id}>
            <TextField
              disabled={true}
              key={address.id}
              name={`address${id}`}
              value={addressToString(address)}
            />
            <Button type="button" onClick={() => handleEditAddress(address.id)}>
              <Icon src={edit} />
            </Button>
          </AddressListItem>
        ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100%;
  max-width: var(--max-content-width);
`

const Icon = styled.img`
  width: var(--size-l);
  height: var(--size-l);
`

const AddressListItem = styled.div`
  padding: 0;
  display: grid;
  grid-template-columns: 1fr min-content;
  align-self: center;
  justify-self: center;
  input {
    margin: 0;
    width: 100%;
  }
`
