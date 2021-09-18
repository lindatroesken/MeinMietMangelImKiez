export const mangelStatusOptions = ['OPEN', 'IN_PROGRESS', 'DONE']
export const mangelCategoryOptions = [
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
export const contactTypeOptions = ['PHONE', 'EMAIL', 'LETTER', 'FAX', 'FORM']

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
  dateFixed: null,
  status: 'OPEN',
  id: null,
  contactLoggerList: [],
}
