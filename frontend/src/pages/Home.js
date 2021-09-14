import Page from '../components/Page'
import Button from '../components/Button'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import { useAuth } from '../auth/AuthProvider'

export default function Home() {
  const { user } = useAuth()

  return (
    <Page>
      <Header title="Meine Mängelapp" />
      <Main>
        <h1>Willkommen {user ? user.username : ''}</h1>
        {user && (
          <Button>
            {/*<NavLink to={user + '/maengel/new'}>Neuer Mangel</NavLink>*/}
            <NavLink to="/maengel/new">
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
    </Page>
  )
}
