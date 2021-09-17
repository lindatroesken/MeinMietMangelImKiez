import styled from 'styled-components/macro'

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--background-light);
  color: var(--neutral-light);
  width: 100%;
  height: 100%;
  text-align: center;

  display: grid;
  place-items: center;
  grid-template-rows: min-content 1fr;
`
