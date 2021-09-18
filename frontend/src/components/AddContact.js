import TextField from './TextField'
import { contactTypeOptions } from '../services/mangel-service'
import Button from './Button'
import styled from 'styled-components/macro'
import DateField from './DateField'
import Select from './Select'

export default function AddContact({
  contactLogger,
  mode,
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
        name="dateNoticed"
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
      {mode === 'new' && (
        <Button type="button" onClick={handleAddAndSave}>
          zufügen
        </Button>
      )}
      {mode !== 'new' && (
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
  background-color: var(--background-dark);
  border: solid var(--neutral-dark);
  border-radius: var(--size-s);
  padding: var(--size-s);
`
