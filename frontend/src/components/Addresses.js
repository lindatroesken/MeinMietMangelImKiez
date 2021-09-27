import Button from './Button'
import TextField from './TextField'
import styled from 'styled-components/macro'

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
          <AddressListItem>
            <TextField
              disabled={true}
              key={address.id}
              name={`address${id}`}
              value={addressToString(address)}
            />
            <Button type="button" onClick={() => handleEditAddress(address.id)}>
              🔧
            </Button>
          </AddressListItem>
        ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100%;
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
