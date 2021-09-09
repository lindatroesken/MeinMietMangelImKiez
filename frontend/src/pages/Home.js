import Page from '../components/Page'
import Button from '../components/Button'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'

export default function Home({ user, ...props }) {
  return (
    <Page>
      <Header title="Meine Mängelapp" user={user} />
      <Main>
        <h1>Willkommen {user ? user.username : ''}</h1>
        {user && (
          <Button>
            {/*<NavLink to={user + '/maengel/new'}>Neuer Mangel</NavLink>*/}
            <NavLink to="linda/maengel/new">Neuer Mangel</NavLink>
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
