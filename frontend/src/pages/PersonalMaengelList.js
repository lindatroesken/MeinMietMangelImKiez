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
          {mangelList.length === 0 && <div>noch keine Mängel</div>}
          <Button type="button" onClick={handleNewMangel}>
            Neuen Mangel anlegn
          </Button>
          {mangelList.length > 0 && (
            <Wrapper>
              <Button type="button" onClick={handleExportCSV}>
                export to CSV
              </Button>
              <MangelTable
                data={mangelList}
                handleGoToDetails={handleGoToDetails}
                title="Meine Mängel"
              />
            </Wrapper>
          )}
        </Main>
      )}
      {error && <Error>{error.response.data.message}</Error>}
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
