import styled from 'styled-components/macro'

export default styled.p`
  color: var(--message);
  background-color: var(--light-shades);
  border-radius: var(--size-s);
  padding: var(--size-s);

  :before {
    content: '❕ ';
  }

  :after {
    content: ' ❕';
  }
`
