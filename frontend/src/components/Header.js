import styled from 'styled-components/macro'
import Button from './Button'
import logoutIcon from '../images/logout-32.png'
import loginIcon from '../images/login-32.png'
import profilesIcon from '../images/user-32.png'

import { useAuth } from '../auth/AuthProvider'
import { useHistory } from 'react-router-dom'

export default function Header({ title, ...props }) {
  const { user, logout } = useAuth()
  const history = useHistory()

  return (
    <Wrapper {...props}>
      <Logo />
      <p>{title}</p>
      <div>
        {user && (
          <ButtonGroup>
            <Button type="button" onClick={() => history.push('/profile/view')}>
              <img src={profilesIcon} alt="profile" />
            </Button>
            <Button type="button" onClick={logout}>
              <img src={logoutIcon} alt="logout" />
            </Button>
          </ButtonGroup>
        )}

        {!user && (
          <Button type="button" onClick={() => history.push('/login')}>
            <img src={loginIcon} alt="login" />
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  height: 50px;
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  background: var(--dark-shades);
  color: var(--dark-accent);
  border-bottom: 1px solid var(--dark-accent);
  align-items: center;

  Button {
    margin: 0 var(--size-xs) 0 0;
    border-radius: var(--size-s);
    background-color: var(--dark-shades);
    border: none;
    padding: var(--size-xs);
  }

  img {
    height: 20px;
    width: 20px;
  }
  h3 {
    font-size: var(--size-l);
    align-items: center;
    color: var(--dark-accent);
    margin-top: var(--size-m);
    margin-bottom: var(--size-m);
  }
  div {
    min-width: 50px;
    font-size: var(--size-l);
  }
`
const Logo = styled.div``

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  text-align: left;
`
