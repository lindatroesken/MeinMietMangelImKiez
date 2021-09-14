import Page from '../components/Page'
import Main from '../components/Main'
import { useState } from 'react'
import TextField from '../components/TextField'
import Header from '../components/Header'
import DateField from '../components/DateField'
import Button from '../components/Button'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { postMangel } from '../services/api-service'
import { useAuth } from '../auth/AuthProvider'
import Select from '../components/Select'
import {
  mangelCategoryOptions,
  mangelStatusOptions,
} from '../services/mangel-service'

const initialState = {
  category: '',
  description: '',
  dateNoticed: new Date(),
  dateFixed: null,
  status: 'OPEN',
}

export default function MaengelForm() {
  const { user, token } = useAuth()
  const [mangel, setMangel] = useState(initialState)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleMangelChange = event => {
    setMangel({ ...mangel, [event.target.name]: event.target.value })
  }

  const handleMangelDateChange = value => {
    setMangel({ ...mangel, dateNoticed: value })
  }
  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setError()
    postMangel(token, user.username, mangel)
      .then(response => console.log(response))
      .catch(setError)
      .finally(() => {
        setLoading(false)
        setMangel(initialState)
      })
  }

  return (
    <Page>
      <Header title="Neuen Mangel erfassen" />
      {loading && <Loading />}
      {!loading && (
        <Main as="form" onSubmit={handleSubmit}>
          <Select
            name="status"
            value={mangel.status}
            values={mangelStatusOptions}
            onChange={handleMangelChange}
            title="Status"
          />
          <Select
            name="category"
            value={mangel.category}
            values={mangelCategoryOptions}
            onChange={handleMangelChange}
            title="Kategorie"
          />
          <DateField
            type="date"
            name="dateNoticed"
            value={mangel.dateNoticed}
            onChange={handleMangelDateChange}
            title="Festegestellt am"
          />
          <TextField
            name="description"
            value={mangel.description}
            onChange={handleMangelChange}
            title="Beschreibung"
          />
          <Button>speichern</Button>
        </Main>
      )}
      {error && <Error>{error.message}</Error>}
    </Page>
  )
}
