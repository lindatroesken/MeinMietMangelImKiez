import styled from 'styled-components/macro'
import Label from './Label'
export default function TextField({
  type,
  value,
  onChange,
  name,
  title,
  readOnly = false,
  disabled = false,
  ...props
}) {
  return (
    <Label {...props}>
      {title}
      <Input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
      />
    </Label>
  )
}

const Input = styled.input`
  width: 100%;
  font-size: 1em;
  padding: var(--size-s);
  margin-top: var(--size-s);
  border-radius: var(--size-s);
`
