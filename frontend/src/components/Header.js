import styled from 'styled-components/macro'

export default function Header({ title, ...props }) {
  return (
    <Wrapper {...props}>
      <h3>{title}</h3>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-rows: min-content min-content;
  background: var(--background-dark);
  color: var(--accent);
  border-bottom: 1px solid var(--neutral-dark);
  h3 {
    align-items: center;
    color: var(--neutral-dark);
    margin-bottom: var(--size-m);
  }
`
