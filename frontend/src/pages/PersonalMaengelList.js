import Page from '../components/Page'
import Header from '../components/Header'
import Main from '../components/Main'
import { useEffect, useState } from 'react'
import { exportMangelAsCSV, getMangelList } from '../services/api-service'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useAuth } from '../auth/AuthProvider'
import MangelTable from '../components/MangelTable'
import { useHistory } from 'react-router-dom'
import { initialMangelStates } from '../services/mangel-service'
import Navbar from '../components/Navbar'
import styled from 'styled-components/macro'
import Button from '../components/Button'
import MainTop from '../components/MainTop'
import MainCenter from '../components/MainCenter'
import MainBottom from '../components/MainBottom'

export default function PersonalMaengelList() {
  const { user, token } = useAuth()
  const history = useHistory()
  const [mangelList, setMangelList] = useState(initialMangelStates)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    setError()
    getMangelList(token, user.username)
      .then(mangelList => setMangelList(mangelList))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [user, token])

  const handleGoToDetails = listItem => {
    const path = `/mangel/details/${listItem.original.id}`
    history.push(path)
  }

  const handleExportCSV = () => {
    setLoading(true)
    setError()
    exportMangelAsCSV(token)
      .then(response => {
        const fileName =
          response.headers['content-disposition'].split('filename=')[1]
        console.log(fileName)
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        link.remove()
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }

  const handleNewMangel = () => {
    history.push('/mangel/new')
  }

  return (
    <Page>
      <Header title="Meine Mängelübersicht" />
      {loading && <Loading />}
      {!loading && (
        <Main>
          <MainTop>
            {' '}
            {error && <Error>{error.response.data.message}</Error>}
          </MainTop>
          <MainCenter>
            {mangelList.length === 0 && <div>noch keine Mängel</div>}
            {mangelList.length > 0 && (
              <Wrapper>
                <MangelTable
                  data={mangelList}
                  handleGoToDetails={handleGoToDetails}
                  title="Meine Mängel"
                />
              </Wrapper>
            )}
          </MainCenter>
          <MainBottom>
            {!error && (
              <div>
                <Button type="button" onClick={handleNewMangel}>
                  Neuen Mangel anlegen
                </Button>
                <Button type="button" onClick={handleExportCSV}>
                  export to CSV
                </Button>
              </div>
            )}
          </MainBottom>
        </Main>
      )}

      <Navbar user={user} />
    </Page>
  )
}

const Wrapper = styled.div`
  max-width: var(--max-content-width);
  display: grid;
  justify-content: center;
  button {
    width: 100px;
  }
`
