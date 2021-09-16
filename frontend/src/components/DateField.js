import Label from './Label'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function DateField({ value, onChange, name, title, ...props }) {
  return (
    <Label {...props}>
      {title}
      <DatePicker
        name={name}
        onChange={onChange}
        selected={value}
        dateFormat="dd/MMM/yyyy HH:mm"
        showTimeSelect
      />
    </Label>
  )
}
