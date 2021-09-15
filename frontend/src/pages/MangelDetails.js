import Page from '../components/Page'
import Header from '../components/Header'
import Main from '../components/Main'
import { useAuth } from '../auth/AuthProvider'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMangelById } from '../services/api-service'
import { initialMangelStates } from '../services/mangel-service'
import Error from '../components/Error'
import Loading from '../components/Loading'

export default function MangelDetails() {
  const { user, token } = useAuth()
  const { id } = useParams()
  const [mangel, setMangel] = useState(initialMangelStates)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError()
    getMangelById(token, id)
      .then(dto => setMangel(dto))
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }, [token, id])

  return (
    <Page>
      <Header
        title={`Mangel Details of user ${user.username} for Mangel of category ${mangel.category}`}
      />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <h4>Details </h4>
        </Main>
      )}
      {error && <Error>{error.message}</Error>}
    </Page>
  )
}
