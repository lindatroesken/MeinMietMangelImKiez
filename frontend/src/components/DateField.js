import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components/macro'

export default function DateField({
  value,
  onChange,
  name,
  title,
  readOnly,
  ...props
}) {
  return (
    <DateLabel {...props}>
      {title}
      <StyledDatePicker
        name={name}
        onChange={date => onChange(date, name)}
        selected={value}
        dateFormat="dd/MMM/yyyy HH:mm"
        showTimeSelect
        disabled={readOnly}
      />
    </DateLabel>
  )
}

const DateLabel = styled.label`
  align-self: center;
`

const StyledDatePicker = styled(DatePicker)`
  padding: var(--size-s);
  margin-top: var(--size-xs);
  border-radius: var(--size-s);
  border: 0.1px solid var(--light-accent);
  color: var(--dark-shades);
`
