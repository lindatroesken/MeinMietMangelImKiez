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

export const initialMangelStates = {
  category: '',
  description: '',
  details: '',
  dateNoticed: new Date(),
  dateFixed: null,
  status: 'OPEN',
  id: null,
}
