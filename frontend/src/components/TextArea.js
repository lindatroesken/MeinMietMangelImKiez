import styled from 'styled-components/macro'
import Label from './Label'

export default function TextArea({
  type,
  value,
  onChange,
  name,
  title,
  ...props
}) {
  return (
    <Label {...props}>
      {title}
      <TextAreaStyled
        rows="5"
        cols="1"
        value={value}
        onChange={onChange}
        name={name}
      />
    </Label>
  )
}

const TextAreaStyled = styled.textarea`
  width: 100%;
  font-size: 1em;
  padding: var(--size-s);
  margin-top: var(--size-s);
  border-radius: var(--size-s);
`
