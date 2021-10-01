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
      <DatePicker
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
  align-items: center;
`
