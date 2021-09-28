import styled from 'styled-components/macro'
import Button from './Button'
import logoutIcon from '../images/logout-20-16.png'
import loginIcon from '../images/login-16-16.png'
import profilesIcon from '../images/profile-24-16.png'

import { useAuth } from '../auth/AuthProvider'
import { useHistory } from 'react-router-dom'

export default function Header({ title, ...props }) {
  const { user, logout } = useAuth()
  const history = useHistory()

  return (
    <Wrapper {...props}>
      <Logo>🏚</Logo>
      <h3>{title}</h3>
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
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  background: var(--background-dark);
  color: var(--neutral-dark);
  border-bottom: 1px solid var(--neutral-dark);
  align-items: center;

  Button {
    margin: 0;
    color: var(--neutral-dark);
    padding: var(--size-xs);
  }

  img {
    height: 20px;
    width: 20px;
  }
  h3 {
    align-items: center;
    color: var(--neutral-dark);
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
