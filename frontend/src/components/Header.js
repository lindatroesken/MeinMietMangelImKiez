import styled from 'styled-components/macro'
import Navbar from './Navbar'
import { useAuth } from '../auth/AuthProvider'

export default function Header({ title, ...props }) {
  const { user } = useAuth()
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
