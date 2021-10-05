import Header from '../components/Header'
import Page from '../components/Page'
import Main from '../components/Main'
import { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import styled from 'styled-components/macro'
import { initialViewport, mangelCategoryColors } from '../services/map-service'
import { getMangelStatisticsAll } from '../services/api-service'
import { useAuth } from '../auth/AuthProvider'
import Navbar from '../components/Navbar'
import MainTop from '../components/MainTop'
import MainBottom from '../components/MainBottom'

const apiToken = process.env.REACT_APP_MAPBOX_TOKEN

export default function MangelMap() {
  const [viewport, setViewport] = useState(initialViewport)
  const [selectedMangel, setSelectedMangel] = useState(null)
  const [mangelLocations, setMangelLocations] = useState()
  const { token, user } = useAuth()

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedMangel(null)
      }
    }
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])

  const mangelWithColor = mangelLocations =>
    mangelLocations.map(mangelLocation => {
      return {
        ...mangelLocation,
        color: mangelCategoryColors[mangelLocation.category],
      }
    })

  useEffect(() => {
    getMangelStatisticsAll(token)
      .then(mangelLocations => {
        setMangelLocations(mangelWithColor(mangelLocations))
      })
      .catch(console.log)
  }, [token])

  const handleSetSelectedMangel = (event, mangel) => {
    event.preventDefault()
    setSelectedMangel(mangel)
  }

  return (
    <Page>
      <Header title="Kiezübersicht" />
      <Main>
        <MainTop>Alle offenen Mängel</MainTop>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={apiToken}
          onViewportChange={setViewport}
          mapStyle="mapbox://styles/lindat/cktx7t65v0woz17lfqp0esw27"
        >
          {mangelLocations &&
            mangelLocations.map(mangel => (
              <StyledMarker
                key={mangel.id}
                longitude={mangel.longitude}
                latitude={mangel.latitude}
              >
                <MarkerButton
                  inputColor={mangel.color}
                  onClick={event => handleSetSelectedMangel(event, mangel)}
                />
              </StyledMarker>
            ))}
          {selectedMangel && (
            <StyledPopup
              longitude={selectedMangel.longitude}
              latitude={selectedMangel.latitude}
              onClose={() => setSelectedMangel(null)}
            >
              <div>
                {selectedMangel.category} und Status {selectedMangel.status}{' '}
              </div>
            </StyledPopup>
          )}
        </ReactMapGL>

        <MainBottom>
          {mangelCategoryColors &&
            Object.entries(mangelCategoryColors).map(
              ([key, value]) =>
                key !== 'null' && (
                  <LegendEntry key={key}>
                    <MarkerButton inputColor={value} disabled={true} />
                    <div>{key}</div>
                  </LegendEntry>
                )
            )}
          <LegendEntry key="unknown">
            <MarkerButton inputColor={'grey'} />
            <div>unbekannt</div>
          </LegendEntry>
        </MainBottom>
      </Main>
      <Navbar user={user} />
    </Page>
  )
}

const StyledMarker = styled(Marker)`
  color: black;
`

const StyledPopup = styled(Popup)`
  color: black;
`

const MarkerButton = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.inputColor || 'grey'};
  cursor: pointer;
  border: none;
`

const LegendEntry = styled.legend`
  display: grid;
  grid-gap: var(--size-xs);
  grid-template-columns: min-content 1fr;
  font-size: var(--size-m);
  margin: var(--size-xs) 0 var(--size-xs) 0;
`
