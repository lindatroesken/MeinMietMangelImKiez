import styled from 'styled-components/macro'

export default styled.div`
  max-width: var(--max-content-width);
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  grid-gap: var(--size-s);
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr;
  overflow-x: scroll;
`
