import styled from 'styled-components/macro'

export default styled.main`
  display: grid;
  grid-template-rows: 40px 1fr min-content;
  grid-gap: var(--size-xs);
  padding: 0 var(--size-l) 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
