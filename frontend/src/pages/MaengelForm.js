import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Page from '../components/Page'
import Main from '../components/Main'
import TextField from '../components/TextField'
import Header from '../components/Header'
import DateField from '../components/DateField'
import Button from '../components/Button'
import Loading from '../components/Loading'
import Error from '../components/Error'
import {
  deleteContactLog,
  deleteMangel,
  getMangelById,
  postContactLog,
  postMangel,
  putContactLog,
  putMangel,
} from '../services/api-service'
import { useAuth } from '../auth/AuthProvider'
import Select from '../components/Select'
import TextArea from '../components/TextArea'
import {
  mangelCategoryOptions,
  mangelStatusOptions,
  initialMangelStates,
  initialContactState,
  mangelReminderOptions,
} from '../services/mangel-service'
import ContactTable from '../components/ContactTable'
import AddContact from '../components/AddContact'

export default function MaengelForm({ initialMode, title }) {
  const { user, token } = useAuth()
  const history = useHistory()
  const { id } = useParams()
  const [mode, setMode] = useState(initialMode)
  const [mangel, setMangel] = useState(initialMangelStates)
  const [contactLogger, setContactLogger] = useState({})
  const [mangelSaved, setMangelSaved] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState()
  const [viewAddContact, setViewAddContact] = useState(false)

  const resetContactLogger = () => {
    setContactLogger({
      ...initialContactState,
      dateContacted: new Date().getTime(),
    })
  }

  useEffect(() => {
    console.log(mode)
    if (mode === 'new') {
      setReadOnly(false)
      setMangel({
        ...initialMangelStates,
        dateNoticed: new Date().getTime(),
        contactLoggerList: [],
      })
      resetContactLogger()
    } else if (mode === 'view') {
      setReadOnly(true)
      getMangelById(token, id)
        .then(dto => {
          setMangel(dto)
          resetContactLogger()
        })
        .catch(setError)
        .finally(() => {
          setLoading(false)
        })
    } else {
      setReadOnly(false)
    }
  }, [mode, token, id])

  const handleMangelChange = event => {
    setMangel({ ...mangel, [event.target.name]: event.target.value })
  }

  const handleMangelDateChange = value => {
    setMangel({ ...mangel, dateNoticed: value.getTime() })
  }

  const handleContactChange = event => {
    setContactLogger({
      ...contactLogger,
      [event.target.name]: event.target.value,
    })
  }

  const handleContactDateChange = value => {
    setContactLogger({
      ...contactLogger,
      dateContacted: value.getTime(),
    })
  }

  const handleAddAndSave = () => {
    const contactLoggerList = [...mangel.contactLoggerList, contactLogger]
    setMangel({ ...mangel, contactLoggerList: contactLoggerList })

    if (mode === 'new') {
      console.log('add contactLog to Mangel...')
      setViewAddContact(false)
    } else if (mode === 'view') {
      console.log('save contactLog to existing mangel...')
      // save contactLog and update mangel
      setLoading(true)
      setError()
      postContactLog(token, id, contactLogger)
        .then(setMangel)
        .catch(setError)
        .finally(() => {
          setViewAddContact(false)
          setLoading(false)
        })
    } else if (mode === 'edit') {
      console.log('add contactLog to Mangel...')
      setViewAddContact(false)
    } else {
      console.log('unknown mode')
    }
    resetContactLogger()
  }

  const handleDeleteContact = () => {
    setLoading(true)
    setError()
    deleteContactLog(token, id, contactLogger.id)
      .then(r => {
        console.log(r, ' deleted. Do something with deleted mangel?')
        getMangelById(token, id).then(dto => {
          setMangel(dto)
        })
      })
      .catch(setError)
      .finally(() => {
        setViewAddContact(false)
        setLoading(false)
        resetContactLogger()
      })
  }

  const handleEditContact = () => {
    // save contactLog and update mangel
    setLoading(true)
    setError()
    const tempContactLogger = { ...contactLogger }
    console.log(mangel.contactLoggerList)
    putContactLog(token, id, tempContactLogger)
      .then(() => getMangelById(token, id).then(setMangel))
      .catch(setError)
      .finally(() => {
        console.log(mangel.contactLoggerList)
        setViewAddContact(false)
        setLoading(false)
        resetContactLogger()
      })

    console.log('List should be rendered again, still not working. How?')
  }

  const handleSubmitNew = event => {
    event.preventDefault()
    setLoading(true)
    setError()
    postMangel(token, user.username, mangel)
      .catch(setError)
      .finally(() => {
        setLoading(false)
        history.push('/mangel/list')
      })
  }

  const handleSwitchToEdit = () => {
    setMode('edit')
    setMangelSaved(mangel)
  }

  const handleSubmitChanges = event => {
    event.preventDefault()
    console.log('save clicked')
    setLoading(true)
    setError()
    putMangel(token, id, mangel)
      .then(setMangelSaved)
      .catch(setError)
      .finally(() => {
        setLoading(false)
        setMode('view')
      })
  }

  const handleDeleteMangel = () => {
    setLoading(true)
    setError()
    deleteMangel(token, id)
      .then(response => console.log('deleted: ', response))
      .catch(setError)
      .finally(() => {
        setLoading(false)
        history.push('/mangel/list')
      })
  }

  const handleContactDetailsEdit = listItem => {
    setContactLogger({ ...listItem.original })
    setViewAddContact(true)
  }

  const handleCancelChanges = () => {
    setMangel(mangelSaved)
  }

  const toggleViewAddContact = () => {
    setViewAddContact(!viewAddContact)
  }

  return (
    <Page>
      <Header title={title ? title : mode} />
      {loading && <Loading />}
      {!loading && (
        <Main as="form">
          <Select
            name="status"
            value={mangel.status}
            values={mangelStatusOptions}
            onChange={handleMangelChange}
            title="Status"
            readOnly={readOnly}
          />
          <Select
            name="category"
            value={mangel.category}
            values={mangelCategoryOptions}
            onChange={handleMangelChange}
            title="Kategorie"
            readOnly={readOnly}
          />

          <DateField
            type="date"
            name="dateNoticed"
            value={mangel.dateNoticed}
            onChange={handleMangelDateChange}
            title="Festgestellt am"
            readOnly={readOnly}
          />

          <Select
            name="remindMeInDays"
            value={mangel.remindMeInDays}
            values={mangelReminderOptions}
            onChange={handleMangelChange}
            title="Erinnerung in ... Tagen"
            readOnly={readOnly}
          />

          <TextField
            name="description"
            value={mangel.description}
            onChange={handleMangelChange}
            title="Beschreibung"
            readOnly={readOnly}
          />
          <TextArea
            name="details"
            value={mangel.details}
            onChange={handleMangelChange}
            title="Details"
            readOnly={readOnly}
          />
          {mangel.contactLoggerList.length > 0 && (
            <ContactTable
              data={mangel.contactLoggerList}
              handleContactDetailsEdit={handleContactDetailsEdit}
            />
          )}

          <Button type="button" onClick={toggleViewAddContact}>
            Protokolliere Kontakt zum Vermieter (show/hide)
          </Button>

          {viewAddContact && (
            <AddContact
              contactLogger={contactLogger}
              mode={mode}
              handleContactChange={handleContactChange}
              handleContactDateChange={handleContactDateChange}
              handleAddAndSave={handleAddAndSave}
              handleDeleteContact={handleDeleteContact}
              handleEditContact={handleEditContact}
            />
          )}

          {mode === 'new' && (
            <Button type="button" onClick={handleSubmitNew}>
              speichern
            </Button>
          )}
          {mode === 'view' && (
            <Button type="button" onClick={handleSwitchToEdit}>
              bearbeiten
            </Button>
          )}
          {mode === 'edit' && (
            <div>
              <Button type="button" onClick={handleSubmitChanges}>
                Änderungen speichern
              </Button>
              <Button type="button" onClick={handleCancelChanges}>
                Änderungen verwerfen
              </Button>
              <Button type="button" onClick={handleDeleteMangel}>
                Mangel löschen
              </Button>
            </div>
          )}
        </Main>
      )}
      {error && <Error>{error.message}</Error>}
    </Page>
  )
}
