import MainTop from './MainTop'
import MainBottom from './MainBottom'
import MainCenter from './MainCenter'
import Main from './Main'
import Loader from 'react-loader-spinner'
import styled from 'styled-components/macro'

export default function Loading() {
  return (
    <Main>
      <MainTop />
      <MainCenter>
        <CenteredLoader
          type="ThreeDots"
          color="#8E8C8C"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </MainCenter>
      <MainBottom />
    </Main>
  )
}

const CenteredLoader = styled(Loader)`
  width: 100%;
  text-align: center;
`
