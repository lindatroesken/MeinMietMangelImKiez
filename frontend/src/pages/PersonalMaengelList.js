import styled from 'styled-components/macro'
import Page from '../components/Page'
import Header from '../components/Header'
import Main from '../components/Main'
import { Redirect } from 'react-router-dom'

export default function PersonalMaengelList({ user, ...props }) {
  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <Page>
      <Header title="Meine Mängelübersicht" user={user} />
      <Main></Main>
    </Page>
  )
}
