import Page from '../components/Page'
import Button from '../components/Button'
import { NavLink, useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import { useAuth } from '../auth/AuthProvider'
import MangelTable from '../components/MangelTable'
import { useEffect, useState } from 'react'
import { getMangelListDue } from '../services/api-service'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { initialMangelStates } from '../services/mangel-service'
import MangelReminder from '../components/MangelReminder'

export default function Home() {
  const { user, token } = useAuth()
  const history = useHistory()
  const [mangelList, setMangelList] = useState(initialMangelStates)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    if (user) {
      setLoading(true)
      setError()

      getMangelListDue(token, user.username)
        .then(mangelList => setMangelList(mangelList))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }
  }, [user, token])

  const handleGoToDetails = listItem => {
    const path = `/mangel/details/${listItem.original.id}`
    history.push(path)
  }

  return (
    <Page>
      <Header title="Meine Mängelapp" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <h1>Willkommen {user ? user.username : ''}</h1>
          {user && <MangelReminder mangelList={mangelList} />}
          {mangelList.length > 0 && (
            <MangelTable
              data={mangelList}
              handleGoToDetails={handleGoToDetails}
              title="Meine fälligen Mängel"
            />
          )}
          {user && (
            <Button>
              <NavLink to="/mangel/new">
                Neuer Mangel für {user.username}
              </NavLink>
            </Button>
          )}
          {!user && (
            <Button>
              <NavLink to="/login">Login</NavLink>
            </Button>
          )}
        </Main>
      )}
      {error && <Error>{error.message}</Error>}
    </Page>
  )
}
