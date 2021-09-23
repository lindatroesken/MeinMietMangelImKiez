import Header from '../components/Header'
import Page from '../components/Page'
import Main from '../components/Main'
import { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
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
              <MarkerButton />
              <div>{mangel.category}</div>
            </StyledMarker>
          ))}
        </ReactMapGL>
      </Main>
    </Page>
  )
}

const StyledMarker = styled(Marker)`
  color: black;
`

const MarkerButton = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: blue;
  cursor: pointer;
  border: none;
`
