import Button from './Button'
import TextField from './TextField'
import styled from 'styled-components/macro'
import edit from '../images/edit-2-32.png'
import add from '../images/add-file-32.png'

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
      {user && (
        <div>
          <p>Meine Adressen</p>
          <Button onClick={handleNewAddress}>
            {' '}
            <Icon src={add} alt="add" />{' '}
          </Button>
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
              readOnly={true}
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
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  max-width: var(--max-content-width);
  div {
    font-size: var(--size-l);
    font-weight: bold;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr min-content;
    white-space: nowrap;
  }
`

const Icon = styled.img`
  width: var(--size-l);
  height: var(--size-l);
`

const AddressListItem = styled.div`
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: end;
  justify-content: space-between;
  label {
    margin: 0;
    width: 100%;
  }
  button {
    margin-bottom: 0;
    height: min-content;
  }
`
