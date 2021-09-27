import AddressForm from './AddressForm'
import Button from './Button'

export default function Addresses({
  user,
  mode,
  addressList,
  id,
  handleEditAddress,
  handleNewAddress,
}) {
  return (
    <div>
      <h3>Meine Adressen</h3>
      {user && (
        <div>
          <Button onClick={handleNewAddress}> neue Adresse </Button>
        </div>
      )}
      {user &&
        addressList.length > 0 &&
        addressList.map(address => (
          <AddressForm
            selectedId={id}
            readOnly={true}
            mode={mode}
            address={address}
            handleEditAddress={handleEditAddress}
          />
        ))}
    </div>
  )
}
