import TextField from './TextField'
import { contactTypeOptions } from '../services/mangel-service'
import Button from './Button'
import styled from 'styled-components/macro'
import DateField from './DateField'
import Select from './Select'

export default function AddContact({
  contactLogger,
  handleContactChange,
  handleContactDateChange,
  handleAddAndSave,
  handleDeleteContact,
  handleEditContact,
}) {
  return (
    <ContactForm>
      <Select
        name="contactType"
        value={contactLogger.contactType}
        values={contactTypeOptions}
        onChange={handleContactChange}
        title="Kontaktart"
        readOnly={false}
      />
      <DateField
        type="date"
        name="dateContacted"
        value={contactLogger.dateContacted}
        onChange={handleContactDateChange}
        title="Kontaktiert am"
        readOnly={false}
      />
      <TextField
        name="contactNote"
        value={contactLogger.contactNote}
        onChange={handleContactChange}
        title="Notiz"
        readOnly={false}
      />
      {contactLogger.id === null && (
        <Button type="button" onClick={handleAddAndSave}>
          zufügen
        </Button>
      )}
      {contactLogger.id !== null && (
        <div>
          <Button type="button" onClick={handleEditContact}>
            speichern
          </Button>
          <Button type="button" onClick={handleDeleteContact}>
            löschen
          </Button>
        </div>
      )}
    </ContactForm>
  )
}

const ContactForm = styled.div`
  width: 100%;
  background-color: var(--light-shades);
  border: solid var(--dark-shades) 0.5px;
  border-radius: var(--size-s);
  padding: var(--size-s);
`
