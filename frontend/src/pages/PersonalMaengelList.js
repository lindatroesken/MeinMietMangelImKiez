import Page from '../components/Page'
import Header from '../components/Header'
import Main from '../components/Main'
import { useEffect, useState } from 'react'
import { getMangelList } from '../services/api-service'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useAuth } from '../auth/AuthProvider'
import MangelTable from '../components/MangelTable'
import { useHistory } from 'react-router-dom'
import { initialMangelStates } from '../services/mangel-service'
import Navbar from '../components/Navbar'

export default function PersonalMaengelList() {
  const { user, token } = useAuth()
  const history = useHistory()
  const [mangelList, setMangelList] = useState(initialMangelStates)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    setError()
    getMangelList(token, user.username)
      .then(mangelList => setMangelList(mangelList))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [user, token])

  const handleGoToDetails = listItem => {
    const path = `/mangel/details/${listItem.original.id}`
    history.push(path)
  }

  return (
    <Page>
      <Header title="Meine Mängelübersicht" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          {mangelList.length > 0 && (
            <MangelTable
              data={mangelList}
              handleGoToDetails={handleGoToDetails}
              title="Meine Mängel"
            />
          )}
        </Main>
      )}
      {error && <Error>{error.response.data.message}</Error>}
      <Navbar user={user} />
    </Page>
  )
}
