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
  const [sizeContactList, setSizeContactList] = useState(0)

  const resetContactLogger = () => {
    setContactLogger({
      ...initialContactState,
      dateContacted: new Date().getTime(),
    })
  }

  const reloadContactList = () => {
    console.log('list should be reloaded...')
    setSizeContactList(mangel.contactLoggerList.length)
    console.log(sizeContactList)
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
    console.log(mangel)
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
    console.log(mode)
    if (mode === 'new') {
      console.log('add contactLog to Mangel...')
      // const contactLoggerList = []
      const contactLoggerList = mangel.contactLoggerList
      contactLoggerList.push(contactLogger)
      setMangel({ ...mangel, contactLoggerList: contactLoggerList })
      setViewAddContact(false)
      resetContactLogger()
      reloadContactList()
    } else if (mode === 'view') {
      console.log('save contactLog to existing mangel...')
      // save contactLog and update mangel
      const contactLoggerList = mangel.contactLoggerList
      contactLoggerList.push(contactLogger)
      setMangel({ ...mangel, contactLoggerList: contactLoggerList })
      setLoading(true)
      setError()
      postContactLog(token, id, contactLogger)
        .then(setMangel)
        .catch(setError)
        .finally(() => {
          setViewAddContact(false)
          setLoading(false)
          resetContactLogger()
          reloadContactList()
        })
    } else if (mode === 'edit') {
      console.log('add contactLog to Mangel...')
      const contactLoggerList = mangel.contactLoggerList
      contactLoggerList.push(contactLogger)
      setMangel({ ...mangel, contactLoggerList: contactLoggerList })
      setViewAddContact(false)
      resetContactLogger()
      reloadContactList()
    } else {
      console.log('unknown mode')
    }
  }

  const handleDeleteContact = () => {
    console.log('delete contctLog clicked...')
    setLoading(true)
    setError()
    deleteContactLog(token, id, contactLogger.id)
      .then(r => {
        console.log(r, ' deleted')
        getMangelById(token, id).then(() => reloadContactList())
      })
      .catch(setError)
      .finally(() => {
        setViewAddContact(false)
        setLoading(false)
        resetContactLogger()
      })
  }

  const handleEditContact = () => {
    console.log('save edited contactLog...')
    // save contactLog and update mangel
    setLoading(true)
    setError()
    putContactLog(token, id, contactLogger)
      .then(setMangel)
      .catch(setError)
      .finally(() => {
        setViewAddContact(false)
        setLoading(false)
        resetContactLogger()
      })

    console.log('edit')
    console.log('List should be rendered again, still not working. How?')
  }

  const handleSubmitNew = event => {
    event.preventDefault()
    console.log(mangel)
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
    setLoading(true)
    setError()
    putMangel(token, id, mangel)
      .then(setMangelSaved)
      .catch(setError)
      .finally(() => {
        setLoading(false)
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
    console.log('clicked: ', listItem.original.id, 'should be edited')
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
          {sizeContactList > 0 && (
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
