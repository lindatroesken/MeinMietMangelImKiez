export const mangelStatusOptions = ['OPEN', 'IN_PROGRESS', 'DONE']

export const mangelReminderOptions = [null, 1, 2, 3, 4, 5, 6, 7, 14, 21, 30]

export const mangelCategoryOptions = [
  null,
  'Aufzug',
  'Heizung',
  'Warmwasser',
  'Kaltwasser',
  'Wasser',
  'Schließanlage',
  'Schimmel',
  'Fenster',
  'Müll',
  'Sonstiges',
]
export const contactTypeOptions = [
  null,
  'PHONE',
  'EMAIL',
  'LETTER',
  'FAX',
  'FORM',
]

export const initialContactState = {
  id: null,
  dateContacted: null,
  contactType: '',
  contactNote: '',
}
export const initialMangelStates = {
  category: '',
  description: '',
  details: '',
  dateNoticed: new Date().getTime(),
  dateReminder: new Date(),
  remindMeInDays: 7,
  dateFixed: null,
  status: 'OPEN',
  id: null,
  isDue: null,
  contactLoggerList: [],
  address: null,
}
