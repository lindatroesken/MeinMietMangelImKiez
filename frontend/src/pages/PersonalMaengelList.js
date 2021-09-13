import Page from '../components/Page'
import Header from '../components/Header'
import Main from '../components/Main'
import { useEffect, useState } from 'react'
import { getMangelList } from '../services/api-service'
import Loading from '../components/Loading'
import ListItem from '../components/ListItem'
import Error from '../components/Error'

const initialState = {
  description: '',
}

export default function PersonalMaengelList({ user, token, ...props }) {
  const [mangelList, setMangelList] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    setError()
    getMangelList(token, user.username)
      .then(mangelList => setMangelList(mangelList))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page>
      <Header title="Meine Mängelübersicht" user={user} />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <h3>Meine Mängelübersicht</h3>
          {mangelList.length > 0 && (
            <ul>
              {mangelList.map((mangel, index) => {
                return <ListItem key={index} mangel={mangel} />
              })}
            </ul>
          )}
        </Main>
      )}
      {error && <Error>{error.message}</Error>}
    </Page>
  )
}
