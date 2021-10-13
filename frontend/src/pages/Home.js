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
import Navbar from '../components/Navbar'
import MainCenter from '../components/MainCenter'
import MainTop from '../components/MainTop'
import MainBottom from '../components/MainBottom'

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
          <MainTop>
            {error && <Error>{error.response.data.message}</Error>}
          </MainTop>
          <MainCenter>
            {user && !error && <MangelReminder mangelList={mangelList} />}
            {mangelList.length > 0 && !error && (
              <MangelTable
                data={mangelList}
                handleGoToDetails={handleGoToDetails}
                title="Meine fälligen Mängel"
              />
            )}

            {!user && (
                <div>
              <Button>
                <NavLink to="/login">Login</NavLink>
              </Button>
              <Button>
              <NavLink to="/register">Register</NavLink>
              </Button></div>
            )}
          </MainCenter>
          <MainBottom>
            {user && (
              <Button>
                <NavLink to="/mangel/new">Neuer Mangel</NavLink>
              </Button>
            )}
          </MainBottom>
        </Main>
      )}

      <Navbar user={user} />
    </Page>
  )
}
