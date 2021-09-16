import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Page from '../components/Page'
import Main from '../components/Main'
import TextField from '../components/TextField'
import Header from '../components/Header'
import DateField from '../components/DateField'
import Button from '../components/Button'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { getMangelById, postMangel, putMangel } from '../services/api-service'
import { useAuth } from '../auth/AuthProvider'
import Select from '../components/Select'
import TextArea from '../components/TextArea'
import {
  mangelCategoryOptions,
  mangelStatusOptions,
  initialMangelStates,
} from '../services/mangel-service'

export default function MaengelForm({ initialMode, title }) {
  const { user, token } = useAuth()
  const { id } = useParams()
  const [mode, setMode] = useState(initialMode)
  const [mangel, setMangel] = useState(initialMangelStates)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState()

  useEffect(() => {
    console.log(mode)
    if (mode === 'new') {
      setReadOnly(false)
      setMangel(initialMangelStates)
    } else if (mode === 'view') {
      setReadOnly(true)
      getMangelById(token, id)
        .then(dto => {
          setMangel(dto)
        })
        .catch(setError)
        .finally(() => {
          setLoading(false)
        })
    } else {
      setReadOnly(false)
    }
  }, [mode, initialMode, token])

  const handleMangelChange = event => {
    setMangel({ ...mangel, [event.target.name]: event.target.value })
  }

  const handleMangelDateChange = value => {
    setMangel({ ...mangel, dateNoticed: value.getTime() })
  }

  const submitNew = event => {
    event.preventDefault()
    setLoading(true)
    setError()
    console.log(mangel.dateNoticed)
    postMangel(token, user.username, mangel)
      .then(response => console.log(response))
      .catch(setError)
      .finally(() => {
        setLoading(false)
        setMangel(initialMangelStates)
      })
  }

  const switchToEdit = () => {
    console.log('should switch to edit')
    setMode('edit')
  }

  const submitChanges = event => {
    event.preventDefault()
    setLoading(true)
    setError()
    putMangel(token, id, mangel)
      .then(response => console.log('Response: ', response))
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })

    console.log('submit changes, tbd.')
  }
  const cancelChanges = () => {
    console.log('reset changes, tbd')
  }

  return (
    <Page>
      <Header title={mode} />
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
            title="Festegestellt am"
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
          {mode === 'new' && (
            <Button type="button" onClick={submitNew}>
              speichern
            </Button>
          )}
          {mode === 'view' && (
            <Button type="button" onClick={switchToEdit}>
              edit
            </Button>
          )}
          {mode === 'edit' && (
            <Button type="button" onClick={submitChanges}>
              Änderungen speichern
            </Button>
          )}
          {mode === 'edit' && (
            <Button type="button" onClick={cancelChanges}>
              Änderungen verwerfen
            </Button>
          )}
        </Main>
      )}
      {error && <Error>{error.message}</Error>}
    </Page>
  )
}
