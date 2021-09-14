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
// import { Redirect } from 'react-router-dom'
// import moment from 'moment'

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

export default function MaengelForm() {
  const { user, token } = useAuth()
  const [mangel, setMangel] = useState(initialState)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleMangelChange = event => {
    setMangel({ ...mangel, [event.target.name]: event.target.value })
  }

  const handleMangelDateChange = value => {
    console.log(Date.parse(value))
    console.log(value)
    // const formattedDate = value && Date.parse(value)
    // this.setState({value: formattedDate})
    // this.props.onChange(formattedDate)
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
      )}
      {error && <Error>{error.message}</Error>}
    </Page>
  )
}
