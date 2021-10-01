import MainTop from './MainTop'
import MainBottom from './MainBottom'
import MainCenter from './MainCenter'
import Main from './Main'
import Loader from 'react-loader-spinner'

export default function Loading() {
  return (
    <Main>
      <MainTop />
      <MainCenter>
        <Loader
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
