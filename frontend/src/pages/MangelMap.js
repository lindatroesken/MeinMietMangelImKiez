import Header from '../components/Header'
import Page from '../components/Page'
import Main from '../components/Main'
import { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import styled from 'styled-components/macro'
import { initialViewport } from '../services/map-service'
import { getMangelStatisticsAll } from '../services/api-service'
import { useAuth } from '../auth/AuthProvider'

const apiToken = process.env.REACT_APP_MAPBOX_TOKEN

export default function MangelMap() {
  const [viewport, setViewport] = useState(initialViewport)
  const [selectedMangel, setSelectedMangel] = useState(null)
  const [mangelLocations, setMangelLocations] = useState()
  const { token } = useAuth()

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

  useEffect(() => {
    getMangelStatisticsAll(token).then(setMangelLocations).catch(console.log)
  }, [])

  const handleSetSelectedMangel = (event, mangel) => {
    event.preventDefault()
    setSelectedMangel(mangel)
  }

  return (
    <Page>
      <Header title="Kiezübersicht" />
      <Main>
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
                  onClick={event => handleSetSelectedMangel(event, mangel)}
                />
                <div>{mangel.category}</div>
              </StyledMarker>
            ))}
          {selectedMangel && (
            <StyledPopup
              longitude={selectedMangel.longitude}
              latitude={selectedMangel.latitude}
              onClose={() => setSelectedMangel(null)}
            >
              <div>
                Mangel mit id {selectedMangel.id} und Status{' '}
                {selectedMangel.status}{' '}
              </div>
            </StyledPopup>
          )}
        </ReactMapGL>
      </Main>
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
  background-color: var(--accent);
  cursor: pointer;
  border: none;
`
