import styled from 'styled-components/macro'

export default styled.p`
  color: var(--error);

  :before {
    content: '🙈 ';
  }

  :after {
    content: ' 🙈';
  }
`
