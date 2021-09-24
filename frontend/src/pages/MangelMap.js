import Header from '../components/Header'
import Page from '../components/Page'
import Main from '../components/Main'
import { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { mangelLocations } from '../services/locations-services'
import styled from 'styled-components/macro'

export default function MangelMap() {
  const [viewport, setViewport] = useState({
    latitude: 52.497678727124054,
    longitude: 13.41515292321081,
    zoom: 14,
    width: '100%',
    height: '100%',
  })

  const [selectedMangel, setSelectedMangel] = useState(null)

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

  return (
    <Page>
      <Header title="Kiezübersicht" />
      <Main>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={viewport => {
            setViewport(viewport)
          }}
          mapStyle="mapbox://styles/lindat/cktx7t65v0woz17lfqp0esw27"
        >
          {mangelLocations.map(mangel => (
            <StyledMarker
              key={mangel.id}
              longitude={mangel.longitude}
              latitude={mangel.latitude}
            >
              <MarkerButton
                onClick={e => {
                  e.preventDefault()
                  setSelectedMangel(mangel)
                }}
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
              <div>Mangel....</div>
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
