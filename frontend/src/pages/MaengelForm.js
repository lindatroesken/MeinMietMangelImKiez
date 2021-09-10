import Page from '../components/Page'
import Main from '../components/Main'
import { useState } from 'react'
import TextField from '../components/TextField'
import Header from '../components/Header'
import DateField from '../components/DateField'
import Button from '../components/Button'

// const milliseconds = Date.now()
// const dateObject = new Date(milliseconds)
// const options = {
//   year: 'numeric',
//   month: 'numeric',
//   day: 'numeric',
// }
// // const humanDateFormat = dateObject.toLocaleString('en-en', options) //2019-12-9 10:30:15
// const humanDateFormat = '2021-09-01' //2019-12-9 10:30:15

const initialState = {
  description: '',
  dateNoticed: new Date(),
}

export default function MaengelForm({ user, ...props }) {
  const [mangel, setMangel] = useState(initialState)

  const handleMangelChange = event => {
    setMangel({ ...mangel, [event.target.name]: event.target.value })
  }

  // console.log(mangel.dateNoticed)

  const handleMangelDateChange = value => {
    console.log(value)
    setMangel({ ...mangel, dateNoticed: value })
  }
  const handleSubmit = event => {
    event.preventDefault()
  }

  return (
    <Page>
      <Header title="Neuen Mangel erfassen" user={user} />
      <Main as="form">
        <TextField
          name="description"
          value={mangel.description}
          onChange={handleMangelChange}
          title="Beschreibung"
        />
        <DateField
          type="date"
          name="dateNoticed"
          value={mangel.dateNoticed}
          onChange={handleMangelDateChange}
          title="Festegestellt am"
        />
        <Button>speichern</Button>
      </Main>
    </Page>
  )
}
