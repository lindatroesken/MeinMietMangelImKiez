import styled, { css } from 'styled-components/macro'

export default styled.button`
  background-color: var(--light-shades);
  color: var(--dark-shades);
  font-size: var(--size-m);
  font-weight: normal;
  border-radius: var(--size-m);
  border: 0.2px solid var(--light-accent);
  padding: var(--size-s);
  margin: var(--size-s);
  a {
    color: var(--dark-shades);
    font-size: var(--size-m);
    text-decoration: none;
  }
  ${props =>
    props.primary &&
    css`
      background-color: var(--dark-shades);
      color: var(--light-shades);
    `}
`
