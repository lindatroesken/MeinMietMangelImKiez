import styled from 'styled-components/macro'
import Label from './Label'

export default function Select({
  name,
  selected,
  title,
  onChange,
  value,
  values,
  readOnly,
  ...props
}) {
  return (
    <Label {...props}>
      {title}
      <SelectStyled
        name={name}
        value={value}
        onChange={onChange}
        disabled={readOnly}
      >
        {values.map(value => (
          <option key={value} value={value} disabled={!value}>
            {value}
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
  margin-top: var(--size-xs);
  border-radius: var(--size-s);
  border: 0.1px solid var(--light-accent);
  color: var(--dark-shades);
`
