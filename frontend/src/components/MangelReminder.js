import styled from 'styled-components/macro'

export default function MangelReminder({ mangelList }) {
  const listSize = mangelList.length

  return (
    <Wrapper>
      {listSize === 1
        ? `${mangelList.length} fälliger Mangel`
        : listSize > 1
        ? `${mangelList.length} fällige Mängel️`
        : 'keine fälligen Mängel'}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  color: var(--message);
  width: 100%;
  text-align: center;
`
