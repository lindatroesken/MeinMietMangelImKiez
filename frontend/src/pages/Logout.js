import Page from '../components/Page'
import Header from '../components/Header'
import Main from '../components/Main'
import Button from '../components/Button'
import { useAuth } from '../auth/AuthProvider'
import Navbar from '../components/Navbar'

export default function Logout() {
  const { user, logout } = useAuth()
  return (
    <Page>
      <Header title="Logout" />
      <Main>
        <p>You are logged in as {user.username}</p>
        <Button onClick={logout}>Log out</Button>
      </Main>
      <Navbar user={user} />
    </Page>
  )
}
