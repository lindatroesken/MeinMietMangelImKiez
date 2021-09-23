import styled from 'styled-components/macro'
import Label from './Label'

export default function SelectAddress({
  name,
  id,
  selected,
  title,
  handleAddressChange,
  value,
  values,
  readOnly,
  ...props
}) {
  const addressString = address => {
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
    <Label {...props}>
      {title}
      <SelectStyled
        name={name}
        value={value}
        onChange={handleAddressChange}
        disabled={readOnly}
      >
        {values.map(answer => (
          <option key={answer.id} value={answer.id}>
            {addressString(answer)}
          </option>
        ))}
      </SelectStyled>
    </Label>
  )
}

const SelectStyled = styled.select`
  width: 100%;
  font-size: 1em;
  padding: var(--size-s);
  margin-top: var(--size-s);
  border: none;
  border-radius: var(--size-s);
`
