// import styled from 'styled-components/macro'
import Label from './Label'
// import DatePicker from 'react-date-picker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import { registerLocale, setDefaultLocale } from 'react-datepicker'
// import de from 'date-fns/locale/es'
// registerLocale('de', de)

export default function DateField({ value, onChange, name, title, ...props }) {
  return (
    <Label {...props}>
      {title}
      {/*<DatePicker name={name} onChange={onChange} value={value} />*/}
      <DatePicker name={name} onChange={onChange} selected={value} />
      {/*<Input type="date" value={value} onChange={onChange} name={name} />*/}
    </Label>
  )
}

// const Input = styled.input`
//   width: 100%;
//   font-size: 1em;
//   padding: var(--size-s);
//   margin-top: var(--size-s);
//   border-radius: var(--size-s);
// `
