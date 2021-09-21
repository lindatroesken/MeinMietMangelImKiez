import Page from '../components/Page'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Main from '../components/Main'
import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import Address from '../components/Address'

export default function Profile() {
  const { user, token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  return (
    <Page>
      <Header title="Mein Profil" />
      {loading && <Loading />}
      {!loading && <Main>{user && <Address />}</Main>}
      {error && <Error>{error.message}</Error>}
    </Page>
  )
}
