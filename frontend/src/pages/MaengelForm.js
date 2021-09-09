import Page from '../components/Page'
import Main from '../components/Main'
import { useState } from 'react'
import TextField from '../components/TextField'

const initialState = {
  description: '',
}

export default function MaengelForm({ user, ...props }) {
  const [mangel, setMangel] = useState(initialState)

  const handleMangelChange = event => {
    console.log(event.target.name)
    setMangel({ ...mangel, [event.target.name]: event.target.value() })
  }

  return (
    <Page>
      <h1>Neuen Mangel erfassen</h1>
      <Main as="form">
        <TextField
          name="description"
          value={mangel.description}
          onChange={handleMangelChange}
          title="Beschreibung"
        />
      </Main>
    </Page>
  )
}
