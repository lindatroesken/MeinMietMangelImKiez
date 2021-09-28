import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function Navbar({ user, ...props }) {
  return (
    <Wrapper {...props}>
      <NavLink exact to="/">
        Übersicht
      </NavLink>
      {user && (
        <>
          <NavLink to="/map/view"> Karte </NavLink>
          <NavLink to="/mangel/new"> Neu </NavLink>
          <NavLink to="/mangel/list"> Liste </NavLink>
        </>
      )}
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
