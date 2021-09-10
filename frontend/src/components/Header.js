import styled from 'styled-components/macro'
import Navbar from './Navbar'

export default function Header({ user, title, ...props }) {
  return (
    <Wrapper {...props}>
      <h3>
        {title} ({user ? user.username : 'unknown'})
      </h3>
      <Navbar user={user} />
    </Wrapper>
  )
}

const Wrapper = styled.header`
  width: 100%;
  text-align: center;
  background: var(--background-dark);
  color: var(--accent);
`
