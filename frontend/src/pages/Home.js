import Page from '../components/Page'
import Button from '../components/Button'
import { NavLink } from 'react-router-dom'

export default function Home({ user, ...props }) {
  return (
    <Page>
      <h1>Willkommen {user ? user.username : ''}</h1>
      {user && (
        <Button>
          <NavLink to="/maengel/new">Neuer Mangel</NavLink>
        </Button>
      )}
      {!user && (
        <Button>
          <NavLink to="/login">Login</NavLink>
        </Button>
      )}
    </Page>
  )
}
