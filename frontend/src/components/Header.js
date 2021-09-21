import styled from 'styled-components/macro'
import Navbar from './Navbar'
import { useAuth } from '../auth/AuthProvider'

export default function Header({ title, ...props }) {
  const { user } = useAuth()
  return (
    <Wrapper {...props}>
      <h3>{title}</h3>
      <Navbar user={user} />
    </Wrapper>
  )
}

const Wrapper = styled.header`
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-rows: min-content min-content;
  background: var(--background-dark);
  color: var(--accent);
  h3 {
    align-items: center;
    color: var(--neutral-dark);
    padding-top: var(--size-m);
    margin: 0 var(--size-m);
  }
`
