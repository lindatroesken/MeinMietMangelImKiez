import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function Navbar({ user, ...props }) {
  return (
    <Wrapper {...props}>
      <NavLink exact to="/">
        {' '}
        Home{' '}
      </NavLink>
      {!user && <NavLink to="/login"> Login </NavLink>}
      {user && <NavLink to="/logout"> Logout </NavLink>}
      {user && <NavLink to="/map/view"> Karte </NavLink>}
      {user && <NavLink to="/profile/view"> Profil </NavLink>}
      {user && <NavLink to="/mangel/new"> Neu </NavLink>}
      {user && <NavLink to="/mangel/list"> Liste </NavLink>}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  border-top: 1px solid var(--neutral-dark);
  width: 100%;
  padding: var(--size-m);
  display: flex;
  overflow-y: scroll;
  background-color: var(--background-dark);

  a {
    flex-grow: 1;
    margin: 0 var(--size-l);
    text-align: center;
    text-decoration: none;
    color: var(--neutral-dark);
  }

  a.active {
    color: var(--accent);
  }
`
